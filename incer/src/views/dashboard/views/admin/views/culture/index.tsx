import React from 'react';

import PdfMake from '../../../../../../adapter/pdf_export';
import GenericTable from '../../../../../../components/generic-table';
import { Culture } from '../../../../../../constants/entities';
import { SWR } from '../../../../../../constants/swr';
import { getAllCulture } from '../../../../../../services/culture';
import { cells, dataModifier } from './culture.type';
import FilterCultura from './filter';

const CultureAdminView = () => {
  return (
    <>
      <GenericTable
        tableId={SWR.CULTURAS_FAZENDA}
        entityName="Culturas"
        primaryKey={Culture.Id}
        fetcher={getAllCulture}
        cells={cells}
        dataModifier={dataModifier}
        title="Culturas"
        pdf={PdfMake}
        FilterForm={FilterCultura}
      />
    </>
  );
};

export default CultureAdminView;
