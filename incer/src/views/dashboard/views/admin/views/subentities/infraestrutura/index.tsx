import React, { useState } from 'react';
import useSWR from 'swr';

import GenericModal from '../../../../../../../components/generic-modal';
import GenericTable from '../../../../../../../components/generic-table';
import { MachineType } from '../../../../../../../constants/sub-entites';
import { SWR } from '../../../../../../../constants/swr';
import {
  createManyInfraestruturaType,
  deleteInfraestruturaType,
  getAllInfraestruturaType,
} from '../../../../../../../services/infraestruturas-type';
import CreateInfraestruturaTypeScreen from './create';
import { cells, dataModifier } from './infraestrutura.types';
import UpdateInfraestruturaType from './update';

const InfraestruturaTypeScreen = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { mutate } = useSWR(SWR.INFRAESTRUTURA_TYPE, getAllInfraestruturaType);

  const deleteInfraestrutura = async (id: string | number) => {
    deleteInfraestruturaType(id);
    await mutate();
  };
  return (
    <>
      <GenericModal
        title="Cadastrar Tipo de infraestrutura"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <CreateInfraestruturaTypeScreen
          onClose={() => {
            setOpen(false);
            mutate();
          }}
        />
      </GenericModal>

      <GenericModal
        title="Actualizar Tipo de infraestrutura"
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
        }}
      >
        <UpdateInfraestruturaType />
      </GenericModal>
      <GenericTable
        tableId={SWR.INFRAESTRUTURA_TYPE}
        fetcher={getAllInfraestruturaType}
        entityName="Tipo de infraestrutura"
        primaryKey={MachineType.Id}
        dataModifier={dataModifier}
        cells={cells}
        onCreate={() => setOpen(true)}
        setOpenEdit={setOpenEdit}
        onDelete={deleteInfraestrutura}
        title="Tipos de infraestrutura"
        importData={createManyInfraestruturaType}
      />
    </>
  );
};

export default InfraestruturaTypeScreen;
