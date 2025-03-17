import React, { useState } from 'react';
import useSWR from 'swr';

import GenericModal from '../../../../../../../components/generic-modal';
import GenericTable from '../../../../../../../components/generic-table';
import { MachineType } from '../../../../../../../constants/sub-entites';
import { SWR } from '../../../../../../../constants/swr';
import {
  createManyAnimalType,
  deleteAnimalType,
  getAllAnimalsTypes,
} from '../../../../../../../services/animals-type';
import { cells, dataModifier } from './animal.types';
import CreateAnimalTypeScreen from './create';
import UpdateAnimalType from './update';

const AnimalTypeScreen = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { mutate } = useSWR(SWR.MEIO_ESTACIONARIO_TYPE, getAllAnimalsTypes);

  return (
    <>
      <GenericModal
        title="Cadastrar Tipo de animais"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <CreateAnimalTypeScreen
          onClose={() => {
            setOpen(false);
            mutate();
          }}
        />
      </GenericModal>

      <GenericModal
        title="Actualizar Tipo de animais"
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
        }}
      >
        <UpdateAnimalType />
      </GenericModal>
      <GenericTable
        tableId={SWR.MEIO_ESTACIONARIO_TYPE}
        fetcher={getAllAnimalsTypes}
        entityName="Tipos de animais"
        primaryKey={MachineType.Id}
        dataModifier={dataModifier}
        cells={cells}
        onCreate={() => setOpen(true)}
        setOpenEdit={setOpenEdit}
        onDelete={deleteAnimalType}
        title="Tipos de animais"
        importData={createManyAnimalType}
      />
    </>
  );
};

export default AnimalTypeScreen;
