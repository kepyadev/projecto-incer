import React, { useState } from 'react';
import useSWR from 'swr';

import PdfMake from '../../../../../../adapter/pdf_export';
import GenericModal from '../../../../../../components/generic-modal';
import GenericTable from '../../../../../../components/generic-table';
import { Culture } from '../../../../../../constants/entities';
import { SWR } from '../../../../../../constants/swr';
import { getAllCulture } from '../../../../../../services/culture';
import CreateCulturaTechnician from './create';
import { cells, dataModifier, filterLabel } from './culture.type';
import FilterCultura from './filter';

const CultureTechnicianView = () => {
  const [open, setOpen] = useState(false);

  const { mutate } = useSWR(SWR.CULTURE, getAllCulture);
  const handleCloseModal = () => {
    setOpen(false);
  };

  const modalHandleClose = () => setOpen(false);

  return (
    <>
      <GenericModal title="Cadastrar Cultura" onClose={handleCloseModal} open={open}>
        <CreateCulturaTechnician
          modalHandleClose={() => {
            modalHandleClose();
            mutate();
          }}
        />
      </GenericModal>
      <GenericTable
        title="Culturas"
        tableId={SWR.CULTURE}
        entityName="culture"
        primaryKey={Culture.Id}
        fetcher={getAllCulture}
        cells={cells}
        dataModifier={dataModifier}
        onCreate={() => {
          setOpen(true);
        }}
        FilterForm={FilterCultura}
        filterFieldLabels={filterLabel}
        pdf={PdfMake}
      />
    </>
  );
};

export default CultureTechnicianView;
