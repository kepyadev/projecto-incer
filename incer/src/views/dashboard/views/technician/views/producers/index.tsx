import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';

import PdfMake from '../../../../../../adapter/pdf_export';
import GenericModal from '../../../../../../components/generic-modal';
import GenericTable from '../../../../../../components/generic-table';
import { Producer } from '../../../../../../constants/entities';
import { DashboardSubView } from '../../../../../../constants/routes';
import { SWR } from '../../../../../../constants/swr';
import { getAllProducers } from '../../../../../../services/producer';
import AddNewProducerTechnician from './create';
import FilterProducer from './filter';
import { cells, dataModifier } from './producers.type';

const ProducersTechnicianView = () => {
  const history = useHistory();

  const { mutate } = useSWR(SWR.PRODUCER, getAllProducers);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const onSelectOne = (id: string) => {
    history.push(`${DashboardSubView.TECHNICIAN_PRODUCER_DETAILS}/${id}`);
  };

  const onCreate = () => {
    setOpenCreateModal(true);
  };

  return (
    <>
      <GenericModal
        title="Cadastrar Produtor"
        open={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
      >
        <AddNewProducerTechnician
          onClose={() => {
            setOpenCreateModal(false);
            mutate();
          }}
        />
      </GenericModal>
      <GenericTable
        title="Produtores"
        tableId={SWR.PRODUCER}
        entityName="producers"
        primaryKey={Producer.Id}
        fetcher={getAllProducers}
        cells={cells}
        onSelectOne={onSelectOne}
        dataModifier={dataModifier}
        onCreate={onCreate}
        pdf={PdfMake}
        FilterForm={FilterProducer}
        filterFieldLabels={{
          cooperative: 'Cooperativa',
          province: 'Província',
          county: 'Município',
          name: 'Nome',
        }}
      />
    </>
  );
};

export default ProducersTechnicianView;
