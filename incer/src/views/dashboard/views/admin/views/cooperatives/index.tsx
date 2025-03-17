import React from 'react';
import { useHistory } from 'react-router-dom';

import PdfMake from '../../../../../../adapter/pdf_export';
import GenericTable from '../../../../../../components/generic-table';
import { Cooperative } from '../../../../../../constants/entities';
import { DashboardSubView } from '../../../../../../constants/routes';
import { SWR } from '../../../../../../constants/swr';
import { getAllCooperative } from '../../../../../../services/cooperative';
import {
  cells,
  cooperativeFilterFilterTranslation,
  dataModifier,
} from './cooperative.type';
import FilterCooperative from './filter';

const CooperativeAdminView = () => {
  const history = useHistory();

  const onSelectOne = (id: string) => {
    history.push(`${DashboardSubView.ADMIN_COOPERATIVE_DETAILS}/${id}`);
  };
  const fetchCooperatives = (params?: Record<string, any>) => {
    return getAllCooperative({ ...params, entity: 1 });
  };

  return (
    <>
      <GenericTable
        tableId={SWR.COOPERATIVE}
        entityName="Cooperativa"
        primaryKey={Cooperative.Id}
        fetcher={fetchCooperatives}
        cells={cells}
        onSelectOne={onSelectOne}
        dataModifier={dataModifier}
        title="Cooperativas"
        pdf={PdfMake}
        FilterForm={FilterCooperative}
        filterFieldLabels={cooperativeFilterFilterTranslation}
      />
    </>
  );
};

export default CooperativeAdminView;
