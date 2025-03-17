import React, { useState } from 'react';
import useSWR from 'swr';

import PdfMake from '../../../../../../adapter/pdf_export';
import GenericModal from '../../../../../../components/generic-modal';
import GenericTable from '../../../../../../components/generic-table';
import { SWR } from '../../../../../../constants/swr';
import { User } from '../../../../../../constants/user';
import { getAllTechnician } from '../../../../../../services/technician';
import CreateTechnicianView from './create';
import FilterTechnician from './filter';
import { cells, dataModifier } from './users.types';

const TechnicianView = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { mutate } = useSWR(SWR.TECHNICIAN, getAllTechnician);

  return (
    <>
      <GenericModal
        title="Cadastrar Técnico"
        open={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
      >
        <CreateTechnicianView
          onClose={() => {
            mutate();
            setOpenCreateModal(false);
          }}
        />
      </GenericModal>
      <GenericTable
        title="Técnicos"
        fetcher={getAllTechnician}
        primaryKey={User.Id}
        cells={cells}
        dataModifier={dataModifier}
        tableId={SWR.TECHNICIAN}
        entityName="Técnicos"
        onCreate={() => {
          setOpenCreateModal(true);
        }}
        pdf={PdfMake}
        FilterForm={FilterTechnician}
      />
    </>
  );
};

export default TechnicianView;
