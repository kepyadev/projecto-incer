import React, { useState } from 'react';
import useSWR from 'swr';

import GenericModal from '../../../../../../../components/generic-modal';
import GenericTable from '../../../../../../../components/generic-table';
import { NationalMarketPricesTypes } from '../../../../../../../constants/entities';
import { SWR } from '../../../../../../../constants/swr';
import {
  DeleteNationalMarketPrices,
  getAllNationalMarketPrices,
} from '../../../../../../../services/createnationalMarketPrices';
import CreatenationalMarketPrices from './create';
import { cells, dataModifier } from './national-market.types';
import UpdateNationalMarketPriceForm from './update';

const NationalMarketPricesScreen = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { mutate } = useSWR(SWR.MARKET_PRICES, getAllNationalMarketPrices);

  const deleteNationalMarketPrices = async (id: string | number) => {
    mutate();
    return DeleteNationalMarketPrices(id);
  };
  return (
    <>
      <GenericModal
        title="Cadastrar  produtos importados"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <CreatenationalMarketPrices
          onClose={() => {
            setOpen(false);
            mutate();
          }}
        />
      </GenericModal>

      <GenericModal
        title="Actualizar  produtos importados"
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
        }}
      >
        <UpdateNationalMarketPriceForm
          onClose={() => {
            setOpenEdit(false);
            mutate();
          }}
        />
      </GenericModal>
      <GenericTable
        tableId={SWR.MARKET_PRICES}
        fetcher={getAllNationalMarketPrices}
        entityName=" Produtos importados"
        primaryKey={NationalMarketPricesTypes.Id}
        dataModifier={dataModifier}
        cells={cells}
        onCreate={() => setOpen(true)}
        setOpenEdit={setOpenEdit}
        onDelete={deleteNationalMarketPrices}
        title="Tipos de preços de mercado nacional"
        // importData={CreateManyNationalMarketPrices}
      />
    </>
  );
};

export default NationalMarketPricesScreen;
