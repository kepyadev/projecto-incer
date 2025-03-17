import React, { useState } from 'react';
import useSWR from 'swr';

import GenericModal from '../../../../../../../components/generic-modal';
import GenericTable from '../../../../../../../components/generic-table';
import { MachineType } from '../../../../../../../constants/sub-entites';
import { SWR } from '../../../../../../../constants/swr';
import {
  createManyEquipamentoType,
  deleteEquipamentoType,
  getAllEquipamentosType,
} from '../../../../../../../services/equipamento-type';
import CreateEquipamentoType from './create';
import { cells, dataModifier } from './equipamento-type.types';
import UpdateEquipamentoTypeScreen from './update';

const EquipamentoTypeScreen = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { mutate } = useSWR(SWR.ALFAIA, getAllEquipamentosType);

  const deleteEquipamento = async (id: string | number) => {
    deleteEquipamentoType(id);
    await mutate();
  };
  return (
    <>
      <GenericModal
        title="Cadastrar Tipo de equipamento"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <CreateEquipamentoType
          onClose={() => {
            setOpen(false);
            mutate();
          }}
        />
      </GenericModal>

      <GenericModal
        title="Actualizar Tipo de equipamento"
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
        }}
      >
        <UpdateEquipamentoTypeScreen />
      </GenericModal>
      <GenericTable
        tableId={SWR.ALFAIA}
        fetcher={getAllEquipamentosType}
        entityName="Tipo de equipamento"
        primaryKey={MachineType.Id}
        dataModifier={dataModifier}
        cells={cells}
        onCreate={() => setOpen(true)}
        setOpenEdit={setOpenEdit}
        onDelete={deleteEquipamento}
        title="Tipos de equipamentos"
        importData={createManyEquipamentoType}
      />
    </>
  );
};

export default EquipamentoTypeScreen;
