import React, { useState } from 'react';
import useSWR from 'swr';

import GenericModal from '../../../../../../../components/generic-modal';
import GenericTable from '../../../../../../../components/generic-table';
import { NationalProductionType } from '../../../../../../../constants/entities';
import { SWR } from '../../../../../../../constants/swr';
import {
  DeleteNationalProduction,
  getAllNationalProduction,
} from '../../../../../../../services/NationalProduction';
import CreteNationalProductionType from './create';
import { cells, dataModifier } from './national-production.types';
import UpdateCultureType from './update';

const NationalProductionScreen = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { mutate } = useSWR(SWR.NATIONAL_PRODUCTION, getAllNationalProduction);

  const deleteNationalProduction = async (id: string | number) => {
    mutate();
    return DeleteNationalProduction(id);
  };
  return (
    <>
      <GenericModal
        title="Cadastrar produção pacional"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <CreteNationalProductionType
          onClose={() => {
            setOpen(false);
            mutate();
          }}
        />
      </GenericModal>

      <GenericModal
        title="Actualizar produção pacional"
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
        }}
      >
        <UpdateCultureType
          onClose={() => {
            setOpenEdit(false);
            mutate();
          }}
        />
      </GenericModal>
      <GenericTable
        tableId={SWR.NATIONAL_PRODUCTION}
        fetcher={getAllNationalProduction}
        entityName="Produção nacional"
        primaryKey={NationalProductionType.Id}
        dataModifier={dataModifier}
        cells={cells}
        title="Produção nacional"
        onCreate={() => {
          setOpen(true);
        }}
        setOpenEdit={setOpenEdit}
        onDelete={deleteNationalProduction}
        // importData={CreateManyNationalProduction}
      />
    </>
  );
};
export default NationalProductionScreen;
