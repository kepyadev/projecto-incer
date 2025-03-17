import React, { useState } from 'react';
import useSWR from 'swr';

import GenericModal from '../../../../../../../components/generic-modal';
import GenericTable from '../../../../../../../components/generic-table';
import { ImportedProductsTypes } from '../../../../../../../constants/entities';
import { SWR } from '../../../../../../../constants/swr';
import {
  DeleteConsumption,
  getAllConsumption,
} from '../../../../../../../services/consumption';
import { cells, dataModifier } from './consumption.types';
import CreateConsumption from './create';
import UpdateConsumptionForm from './update';

const ConsumptionScreen = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { mutate } = useSWR(SWR.CONSUMPTION, getAllConsumption);

  const deleteConsumption = async (id: string | number) => {
    mutate();
    return DeleteConsumption(id);
  };
  return (
    <>
      <GenericModal
        title="Cadastrar produtos importados"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <CreateConsumption
          onClose={() => {
            setOpen(false);
            mutate();
          }}
        />
      </GenericModal>

      <GenericModal
        title="Actualizar produtos importados"
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
        }}
      >
        <UpdateConsumptionForm
          onClose={() => {
            setOpenEdit(false);
            mutate();
          }}
        />
      </GenericModal>
      <GenericTable
        tableId={SWR.CONSUMPTION}
        fetcher={getAllConsumption}
        entityName="Tipo de produtos importados"
        primaryKey={ImportedProductsTypes.Id}
        dataModifier={dataModifier}
        cells={cells}
        onCreate={() => setOpen(true)}
        setOpenEdit={setOpenEdit}
        onDelete={deleteConsumption}
        title="Tipo de produtos importados"
        // importData={CreateManyConsumption}
      />
    </>
  );
};

export default ConsumptionScreen;
