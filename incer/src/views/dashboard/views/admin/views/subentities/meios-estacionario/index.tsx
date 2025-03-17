import React, { useState } from 'react';
import useSWR from 'swr';

import GenericModal from '../../../../../../../components/generic-modal';
import GenericTable from '../../../../../../../components/generic-table';
import { MachineType } from '../../../../../../../constants/sub-entites';
import { SWR } from '../../../../../../../constants/swr';
import {
  createManyMeioEstacionarioType,
  deleteMeioEstacionarioType,
  getAllMeiosEstacionariosType,
} from '../../../../../../../services/meios-estacionarios-type';
import CreateMeioEstacionarioTypeScreen from './create';
import { cells, dataModifier } from './meio-estacionario.types';
import UpdateMeioEstacionarioType from './update';

const MeioEstacionarioTypeScreen = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { mutate } = useSWR(
    SWR.MEIO_ESTACIONARIO_TYPE,
    getAllMeiosEstacionariosType
  );

  const deleteMeioEstacionario = async (id: string | number) => {
    deleteMeioEstacionarioType(id);
    await mutate();
  };
  return (
    <>
      <GenericModal
        title="Cadastrar Tipo de meio estacionário"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <CreateMeioEstacionarioTypeScreen
          onClose={() => {
            setOpen(false);
            mutate();
          }}
        />
      </GenericModal>

      <GenericModal
        title="Actualizar Tipo de meio estacionário"
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
        }}
      >
        <UpdateMeioEstacionarioType />
      </GenericModal>
      <GenericTable
        tableId={SWR.MEIO_ESTACIONARIO_TYPE}
        fetcher={getAllMeiosEstacionariosType}
        entityName="Tipo de meio estacionário"
        primaryKey={MachineType.Id}
        dataModifier={dataModifier}
        cells={cells}
        onCreate={() => setOpen(true)}
        setOpenEdit={setOpenEdit}
        onDelete={deleteMeioEstacionario}
        title="Tipos de meio estacionário"
        importData={createManyMeioEstacionarioType}
      />
    </>
  );
};

export default MeioEstacionarioTypeScreen;
