import React, { useState } from 'react';
import useSWR from 'swr';

import GenericModal from '../../../../../../../components/generic-modal';
import GenericTable from '../../../../../../../components/generic-table';
import { MachineType } from '../../../../../../../constants/sub-entites';
import { SWR } from '../../../../../../../constants/swr';
import {
  createManyHumanResourceType,
  deleteHumanResourceType,
  getAllHumanResourcesType,
} from '../../../../../../../services/human-resource-type';
import CreateHumanResourceTypeScreen from './create';
import { cells, dataModifier } from './infraestrutura.types';
import UpdateHumanResourceType from './update';

const HumanResourceTypeScreen = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { mutate } = useSWR(SWR.INFRAESTRUTURA_TYPE, getAllHumanResourcesType);

  const deleteHumanResource = async (id: string | number) => {
    deleteHumanResourceType(id);
    await mutate();
  };
  return (
    <>
      <GenericModal
        title="Cadastrar Tipo de recurso humano"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <CreateHumanResourceTypeScreen
          onClose={() => {
            setOpen(false);
            mutate();
          }}
        />
      </GenericModal>

      <GenericModal
        title="Actualizar Tipo de recurso humano"
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
        }}
      >
        <UpdateHumanResourceType />
      </GenericModal>
      <GenericTable
        tableId={SWR.INFRAESTRUTURA_TYPE}
        fetcher={getAllHumanResourcesType}
        entityName="tipo de recurso humano"
        primaryKey={MachineType.Id}
        dataModifier={dataModifier}
        cells={cells}
        onCreate={() => setOpen(true)}
        setOpenEdit={setOpenEdit}
        onDelete={deleteHumanResource}
        title="tipos de recurso humano"
        importData={createManyHumanResourceType}
      />
    </>
  );
};

export default HumanResourceTypeScreen;
