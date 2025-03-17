import React from 'react';

import PdfMake from '../../../../../../adapter/pdf_export';
import GenericTable from '../../../../../../components/generic-table';
import { SWR } from '../../../../../../constants/swr';
import { User } from '../../../../../../constants/user';
import { getAllLogs } from '../../../../../../services/logs';
import FilterLog from './filter';
import { cells, dataModifier } from './logs.types';

const LogsView = () => {
  return (
    <>
      <GenericTable
        fetcher={getAllLogs}
        primaryKey={User.Id}
        cells={cells}
        tableId={SWR.LOGS}
        entityName="Logs"
        pdf={PdfMake}
        FilterForm={FilterLog}
        dataModifier={dataModifier}
        filterFieldLabels={{
          email_phone: 'E-mail/Telefone',
          data: 'Data',
          hora: 'Hora',
          estado: 'Estado',
          operacao: 'Operação',
        }}
      />
    </>
  );
};

export default LogsView;
