import React, { useState } from 'react';
import useSWR from 'swr';

import GenericModal from '../../../../../../../components/generic-modal';
import GenericTable from '../../../../../../../components/generic-table';
import { CultureType } from '../../../../../../../constants/entities';
import { SWR } from '../../../../../../../constants/swr';
import {
  createManyCultureType,
  deleteCultureType,
  getAllCulturasTypes,
} from '../../../../../../../services/culturas_type';
import CreateCultureType from './create';
import { cells, dataModifier } from './culture-type.types';
import UpdateCultureType from './update';

const CultureTypeScreen = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { mutate } = useSWR(SWR.CULTURE_TYPE, getAllCulturasTypes);

  const deleteCulture = async (id: string | number) => {
    deleteCultureType(id);
    await mutate();
  };
  return (
    <>
      <GenericModal
        title="Cadastrar Tipo de cultura"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <CreateCultureType
          onClose={() => {
            setOpen(false);
            mutate();
          }}
        />
      </GenericModal>

      <GenericModal
        title="Actualizar Tipo de cultura"
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
        }}
      >
        <UpdateCultureType />
      </GenericModal>
      <GenericTable
        tableId={SWR.CULTURE_TYPE}
        fetcher={getAllCulturasTypes}
        entityName="tipo de cultura"
        primaryKey={CultureType.Id}
        dataModifier={dataModifier}
        cells={cells}
        title="Tipos de culturas"
        onCreate={() => {
          setOpen(true);
        }}
        setOpenEdit={setOpenEdit}
        onDelete={deleteCulture}
        importData={createManyCultureType}
      />
    </>
  );
};
export default CultureTypeScreen;
