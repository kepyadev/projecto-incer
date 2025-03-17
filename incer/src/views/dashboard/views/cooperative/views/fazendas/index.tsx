import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';

import PdfMake from '../../../../../../adapter/pdf_export';
import GenericModal from '../../../../../../components/generic-modal';
import GenericTable from '../../../../../../components/generic-table';
import { Fazenda } from '../../../../../../constants/entities';
import { DashboardSubView } from '../../../../../../constants/routes';
import { SWR } from '../../../../../../constants/swr';
import { getAllFazendaCooperative } from '../../../../../../services/fazenda';
import CreateFazendaForm from './create';
import { cells, dataModifier } from './fazenda.type';
import FilterFazenda from './filter';

const FazendaCooperativeView = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const { mutate } = useSWR(`${SWR.COOPERATIVE}/fazenda`, getAllFazendaCooperative);

  const onSelectOne = (id: string) => {
    history.push(`${DashboardSubView.COOPERATIVE_FAZENDA_DETAILS}/${id}`);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  return (
    <>
      <GenericModal
        title="Cadastrar Fazenda"
        onClose={() => {
          handleCloseModal();
        }}
        open={open}
      >
        <CreateFazendaForm
          modalHandleClose={() => {
            handleCloseModal();
            mutate();
          }}
        />
      </GenericModal>

      <GenericTable
        fetcher={getAllFazendaCooperative}
        tableId={`${SWR.COOPERATIVE}/fazenda`}
        primaryKey={Fazenda.Id}
        entityName="Fazendas"
        cells={cells}
        onCreate={() => {
          setOpen(true);
        }}
        onSelectOne={onSelectOne}
        dataModifier={dataModifier}
        pdf={PdfMake}
        FilterForm={FilterFazenda}
        filterFieldLabels={{
          producer: 'Produtor',
          province: 'Provincia',
          description: 'Descrição',
          county: 'Município',
        }}
      />
    </>
  );
};

export default FazendaCooperativeView;
