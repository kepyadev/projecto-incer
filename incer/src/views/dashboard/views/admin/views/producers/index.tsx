import React from 'react';
import { useHistory } from 'react-router-dom';

import PdfMake from '../../../../../../adapter/pdf_export';
import GenericTable from '../../../../../../components/generic-table';
import { Producer } from '../../../../../../constants/entities';
import { DashboardSubView } from '../../../../../../constants/routes';
import { SWR } from '../../../../../../constants/swr';
import { getAllProducers } from '../../../../../../services/producer';
import FilterProducer from './filter';
import { cells, dataModifier } from './producers.type';

const ProducersAdminView = () => {
  const history = useHistory();

  const onSelectOne = (id: string) => {
    history.push(`${DashboardSubView.ADMIN_PRODUCER_DETAILS}/${id}`);
  };

  return (
    <>
      <GenericTable
        tableId={SWR.PRODUCER}
        entityName="produtor"
        primaryKey={Producer.Id}
        fetcher={getAllProducers}
        cells={cells}
        onSelectOne={onSelectOne}
        dataModifier={dataModifier}
        title="Produtores"
        pdf={PdfMake}
        FilterForm={FilterProducer}
        filterFieldLabels={{
          cooperative: 'Cooperativa',
          province: 'Província',
          county: 'Município',
          name: 'Produtor',
        }}
      />
    </>
  );
};

export default ProducersAdminView;
