import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';

import PdfMake from '../../../../../../adapter/pdf_export';
import GenericModal from '../../../../../../components/generic-modal';
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
import CreateCooperativeTechnician from './create';
import FilterCooperative from './filter';

const CooperativeTechnicianView = () => {
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);

  const { mutate } = useSWR(SWR.COOPERATIVE, getAllCooperative);

  const onSelectOne = (id: string) => {
    history.push(`${DashboardSubView.TECHNICIAN_COOPERATIVE_DETAILS}/${id}`);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <GenericModal
        title="Cadastrar Cooperativa"
        onClose={handleCloseModal}
        open={openModal}
      >
        <CreateCooperativeTechnician
          onCancel={() => {
            handleCloseModal();
            mutate();
          }}
        />
      </GenericModal>
      <GenericTable
        title="Cooperativas & Associações"
        tableId={SWR.COOPERATIVE}
        entityName="Cooperativa"
        primaryKey={Cooperative.Id}
        fetcher={getAllCooperative}
        cells={cells}
        onSelectOne={onSelectOne}
        dataModifier={dataModifier}
        onCreate={() => {
          setOpenModal(true);
        }}
        pdf={PdfMake}
        FilterForm={FilterCooperative}
        filterFieldLabels={cooperativeFilterFilterTranslation}
      />
    </>
  );
};

export default CooperativeTechnicianView;
