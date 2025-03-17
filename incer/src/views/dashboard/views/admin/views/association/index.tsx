import React from 'react';
import { useHistory } from 'react-router-dom';

import PdfMake from '../../../../../../adapter/pdf_export';
import GenericTable from '../../../../../../components/generic-table';
import { Cooperative } from '../../../../../../constants/entities';
import { DashboardSubView } from '../../../../../../constants/routes';
import { SWR } from '../../../../../../constants/swr';
import getAllAssociation from '../../../../../../services/association';
import {
  cells,
  cooperativeFilterFilterTranslation,
  dataModifier,
} from './association.type';
import FilterCooperative from './filter';

const AssociationAdminView = () => {
  const history = useHistory();

  const onSelectOne = (id: string) => {
    history.push(`${DashboardSubView.ADMIN_COOPERATIVE_DETAILS}/${id}`);
  };
  const fetchCooperatives = (params?: Record<string, any>) => {
    return getAllAssociation({ ...params, entity: 0 });
  };

  return (
    <>
      <GenericTable
        tableId={SWR.ASSOCIATION}
        entityName="Associação"
        primaryKey={Cooperative.Id}
        fetcher={fetchCooperatives}
        cells={cells}
        onSelectOne={onSelectOne}
        dataModifier={dataModifier}
        title="Associações"
        pdf={PdfMake}
        FilterForm={FilterCooperative}
        filterFieldLabels={cooperativeFilterFilterTranslation}
      />
    </>
  );
};

export default AssociationAdminView;
