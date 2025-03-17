import React, { useState } from 'react';
import useSWR from 'swr';

import PdfMake from '../../../../../../adapter/pdf_export';
import GenericModal from '../../../../../../components/generic-modal';
import GenericTable from '../../../../../../components/generic-table';
import { Cooperative, Culture } from '../../../../../../constants/entities';
import { SWR } from '../../../../../../constants/swr';
import { getAllCultureCooperative } from '../../../../../../services/culture';
import { getCooperativeLogged } from '../../../../../../utils';
import CreateCultura from './create';
import { cells, dataModifier } from './cultures.type';
import FilterCultura from './filter';

const CulturaCooperativeView = () => {
  const [cooperative] = useState(getCooperativeLogged());

  const [openModal, setOpenModal] = useState(false);
  const { mutate } = useSWR(
    SWR.CULTURE,
    getAllCultureCooperative(cooperative[Cooperative.Id])
  );

  const modalHandleClose = () => setOpenModal(false);
  return (
    <>
      <GenericModal
        open={openModal}
        title="Cadastrar Cultura"
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <CreateCultura
          modalHandleClose={() => {
            modalHandleClose();
            mutate();
          }}
        />
      </GenericModal>
      <GenericTable
        fetcher={getAllCultureCooperative(cooperative[Cooperative.Id])}
        cells={cells}
        entityName="Culturas"
        title="Culturas"
        primaryKey={Culture.Id}
        tableId={SWR.CULTURE}
        dataModifier={dataModifier}
        onCreate={() => {
          setOpenModal(true);
        }}
        pdf={PdfMake}
        FilterForm={FilterCultura}
        filterFieldLabels={{
          province: 'Província',
          county: 'Município',
          description: 'Cultura',
          fazenda: 'Fazenda',
        }}
      />
    </>
  );
};

export default CulturaCooperativeView;
