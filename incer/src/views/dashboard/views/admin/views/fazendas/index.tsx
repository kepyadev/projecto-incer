import React from 'react';
import { useHistory } from 'react-router-dom';

import PdfMake from '../../../../../../adapter/pdf_export';
import GenericTable from '../../../../../../components/generic-table';
import { Fazenda } from '../../../../../../constants/entities';
import { DashboardSubView } from '../../../../../../constants/routes';
import { SWR } from '../../../../../../constants/swr';
import { getAllFazenda } from '../../../../../../services/fazenda';
import { cells, dataModifier, filterFazendalabel } from './fazenda.type';
import FilterFazenda from './filter';

const FazendaAdminView = () => {
  const history = useHistory();

  const onSelectOne = (id: string) => {
    history.push(`${DashboardSubView.ADMIN_FAZENDA_DETAILS}/${id}`);
  };

  return (
    <>
      <GenericTable
        tableId={SWR.FAZENDAS}
        entityName="Fazenda"
        primaryKey={Fazenda.Id}
        fetcher={getAllFazenda}
        cells={cells}
        onSelectOne={onSelectOne}
        dataModifier={dataModifier}
        title="Fazendas"
        pdf={PdfMake}
        FilterForm={FilterFazenda}
        filterFieldLabels={filterFazendalabel}
      />
    </>
  );
};

export default FazendaAdminView;
