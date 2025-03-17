import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';

import PdfMake from '../../../../../../adapter/pdf_export';
import GenericModal from '../../../../../../components/generic-modal';
import GenericTable from '../../../../../../components/generic-table';
import { Producer } from '../../../../../../constants/entities';
import ROUTES from '../../../../../../constants/routes';
import { SWR } from '../../../../../../constants/swr';
import { getAllProducersByCooperative } from '../../../../../../services/cooperative';
import CreateProducer from '../../../shared/components/producers/create';
import FilterProducer from './filter';
import { cells, dataModifier } from './producers.types';

const ProducersCooperativeView = () => {
  const history = useHistory();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { mutate } = useSWR(SWR.COOPERATIVE, getAllProducersByCooperative);

  const onCreate = () => {
    setOpenCreateModal(true);
  };

  const handleSelectOne = (id: string) => {
    history.push(`${ROUTES.COOPERATIVE_PRODUCERS_DETAILS}/${id}`);
  };
  const modalHandleClose = () => {
    setOpenCreateModal(false);
  };

  return (
    <>
      <GenericModal
        title="Produtor"
        open={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
      >
        <CreateProducer
          modalHandleClose={() => {
            modalHandleClose();
            mutate();
          }}
        />
      </GenericModal>

      <GenericTable
        entityName="producers"
        tableId={SWR.COOPERATIVE}
        fetcher={getAllProducersByCooperative}
        cells={cells}
        onCreate={onCreate}
        onSelectOne={handleSelectOne}
        primaryKey={Producer.Id}
        title="Produtores"
        dataModifier={dataModifier}
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

export default ProducersCooperativeView;
