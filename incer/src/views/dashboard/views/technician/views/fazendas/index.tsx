import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';

import PdfMake from '../../../../../../adapter/pdf_export';
import GenericModal from '../../../../../../components/generic-modal';
import GenericTable from '../../../../../../components/generic-table';
import { Fazenda } from '../../../../../../constants/entities';
import { DashboardSubView } from '../../../../../../constants/routes';
import { SWR } from '../../../../../../constants/swr';
import { deleteFazenda, getAllFazenda } from '../../../../../../services/fazenda';
import CreateFazendaForm from '../../../shared/components/fazenda/create';
import UpdateFazendaForm from '../../../shared/components/fazenda/update';
import { cells, dataModifier, filterFazendalabel } from './fazenda.type';
import FilterFazenda from './filter';

const FazendaTechnicianView = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const history = useHistory();

  const { mutate } = useSWR(SWR.FAZENDAS, getAllFazenda);

  const onSelectOne = (id: string) => {
    history.push(`${DashboardSubView.TECHNICIAN_FAZENDA_DETAILS}/${id}`);
  };

  const handleCloseEditModal = () => setOpenEdit(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleDelete = async (id: string | number) => {
    deleteFazenda(id);
    await mutate();
  };
  return (
    <>
      <GenericModal title="Cadastrar Fazenda" onClose={handleCloseModal} open={open}>
        <CreateFazendaForm
          modalHandleClose={() => {
            handleCloseModal();
            mutate();
          }}
        />
      </GenericModal>
      <GenericModal
        title="Editar Fazenda"
        onClose={handleCloseEditModal}
        open={openEdit}
      >
        <UpdateFazendaForm modalHandleClose={handleCloseEditModal} />
      </GenericModal>
      <GenericTable
        title="Fazendas"
        tableId={SWR.FAZENDAS}
        entityName="Fazenda"
        primaryKey={Fazenda.Id}
        fetcher={getAllFazenda}
        cells={cells}
        onSelectOne={onSelectOne}
        onCreate={() => {
          setOpen(true);
        }}
        dataModifier={dataModifier}
        onDelete={handleDelete}
        setOpenEdit={setOpenEdit}
        pdf={PdfMake}
        FilterForm={FilterFazenda}
        filterFieldLabels={filterFazendalabel}
      />
    </>
  );
};

export default FazendaTechnicianView;
