import React, { useState } from 'react';
import useSWR from 'swr';

import PdfMake from '../../../../../../adapter/pdf_export';
import GenericModal from '../../../../../../components/generic-modal';
import GenericTable from '../../../../../../components/generic-table';
import { SWR } from '../../../../../../constants/swr';
import { User } from '../../../../../../constants/user';
import { getAllPartner } from '../../../../../../services/partner';
import CreatePartnerView from './create';
import FilterPartner from './filter';
import { cells, dataModifier } from './users.types';

const PartnerView = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { mutate } = useSWR(`${SWR.PARTNER}`, getAllPartner);

  return (
    <>
      <GenericModal
        title="Cadastrar Parceiro"
        open={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
      >
        <CreatePartnerView
          close={() => {
            setOpenCreateModal(false);
            mutate();
          }}
        />
      </GenericModal>
      <GenericTable
        fetcher={getAllPartner}
        primaryKey={User.Id}
        cells={cells}
        dataModifier={dataModifier}
        tableId={SWR.PARTNER}
        entityName="Parceiro"
        onCreate={() => {
          setOpenCreateModal(true);
        }}
        pdf={PdfMake}
        FilterForm={FilterPartner}
        filterFieldLabels={{ name: 'Parceiro', ministerio: 'Ministério' }}
      />
    </>
  );
};

export default PartnerView;
