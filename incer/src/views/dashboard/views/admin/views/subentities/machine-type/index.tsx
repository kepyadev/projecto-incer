import React, { useState } from 'react';
import useSWR from 'swr';

import GenericModal from '../../../../../../../components/generic-modal';
import GenericTable from '../../../../../../../components/generic-table';
import { MachineType } from '../../../../../../../constants/sub-entites';
import { SWR } from '../../../../../../../constants/swr';
import {
  createManyMachineType,
  deleteMachineType,
  getAllMachineTypes,
} from '../../../../../../../services/machine-type';
import CreateMachineType from './create';
import { cells, dataModifier } from './machine-type.types';
import UpdateMachineType from './update';

const MachineTypeScreen = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { mutate } = useSWR(SWR.CULTURE_TYPE, getAllMachineTypes);

  const deleteMachine = async (id: string | number) => {
    deleteMachineType(id);
    await mutate();
  };

  return (
    <>
      <GenericModal
        title="Cadastrar Tipo de máquina"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <CreateMachineType
          onClose={() => {
            setOpen(false);
            mutate();
          }}
        />
      </GenericModal>

      <GenericModal
        title="Actualizar Tipo de máquina"
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
        }}
      >
        <UpdateMachineType />
      </GenericModal>
      <GenericTable
        tableId={SWR.CULTURE_TYPE}
        fetcher={getAllMachineTypes}
        entityName="Tipo de máquina"
        primaryKey={MachineType.Id}
        dataModifier={dataModifier}
        cells={cells}
        onCreate={() => setOpen(true)}
        setOpenEdit={setOpenEdit}
        onDelete={deleteMachine}
        title="Tipos de máquinas"
        importData={createManyMachineType}
      />
    </>
  );
};
export default MachineTypeScreen;
