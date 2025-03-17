import { Box } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';

import PdfMake from '../../../../../../adapter/pdf_export';
import GenericModal from '../../../../../../components/generic-modal';
import GenericTable from '../../../../../../components/generic-table';
import { Fazenda } from '../../../../../../constants/entities';
import { DashboardSubView } from '../../../../../../constants/routes';
import { SWR } from '../../../../../../constants/swr';
import {
  deleteFazenda,
  getAllFazendaProducer,
} from '../../../../../../services/fazenda';
import CreateFazendaForm from '../../../shared/components/fazenda/create';
import UpdateFazendaForm from '../../../shared/components/fazenda/update';
import { cells, dataModifier } from './fazendas.types';
import FilterFazenda from './filter';

const FazendasView: FC = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const history = useHistory();

  const handleCloseModal = () => setOpen(false);
  const handleCloseEditModal = () => setOpenEdit(false);
  const handleOpenModal = () => {
    setOpen(true);
  };

  const { mutate } = useSWR(SWR.FAZENDAS, getAllFazendaProducer);

  const onSelectOne = (id: string) => {
    history.push(`${DashboardSubView.PRODUCER_FAZENDA_DETAILS}/${id}`);
  };
  return (
    <Box>
      <GenericModal title="Cadastrar Fazenda" onClose={handleCloseModal} open={open}>
        <CreateFazendaForm
          modalHandleClose={() => {
            handleCloseModal();
            mutate(); // Atualizar dados
          }}
        />
      </GenericModal>
      <GenericModal
        title="Editar Fazenda"
        onClose={handleCloseEditModal}
        open={openEdit}
      >
        <UpdateFazendaForm
          modalHandleClose={() => {
            handleCloseEditModal();
            mutate(); // Atualizar dados
          }}
        />
      </GenericModal>
      <GenericTable
        title="Fazendas"
        tableId={SWR.FAZENDAS}
        fetcher={getAllFazendaProducer}
        entityName="Fazenda"
        cells={cells}
        onCreate={handleOpenModal}
        dataModifier={dataModifier}
        primaryKey={Fazenda.Id}
        onDelete={async id => {
          const response = await deleteFazenda(id);
          mutate(); // Atualizar dados
          return response; // Retorne a resposta da deleção
        }}
        setOpenEdit={setOpenEdit}
        onSelectOne={onSelectOne}
        pdf={PdfMake}
        FilterForm={FilterFazenda}
      />
    </Box>
  );
};

export default FazendasView;
