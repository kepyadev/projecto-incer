import { Box, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';

import GenericModal from '../../../../../../../components/generic-modal';
import { Fazenda } from '../../../../../../../constants/entities';
import ROUTES from '../../../../../../../constants/routes';
import { getAllFazendaProducer } from '../../../../../../../services/fazenda';
import CreateFazendaForm from '../../../../../views/shared/components/fazenda/create';

// Define o fetcher para o SWR
const fetchFazendas = async () => {
  const response = await getAllFazendaProducer({ page: 1, limit: 5 });
  return response.data?.payload.data || [];
};

const FazendaShortCut = () => {
  const [open, setOpen] = useState(false);

  // Use SWR para buscar as fazendas
  const { data: fazendas = [], mutate } = useSWR(
    '/fazenda', // Chave única para identificar o cache
    fetchFazendas, // Função para buscar os dados
    {
      revalidateOnFocus: false, // Evita refetch ao alternar entre abas
    }
  );

  const handleCloseModal = () => setOpen(false);

  //  const handleOpenModal = () => setOpen(true);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      style={{ height: '75%' }}
    >
      <GenericModal title="Cadastrar Fazenda" onClose={handleCloseModal} open={open}>
        <CreateFazendaForm
          modalHandleClose={() => {
            handleCloseModal();
            mutate();
          }}
        />
      </GenericModal>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        style={{ height: '35px' }}
      >
        <h3 style={{ flex: 1 }}>Fazendas</h3>
        <Link
          to={ROUTES.PRODUCER_FAZENDA}
          style={{ textDecoration: 'none', flex: 1 }}
        >
          ver todas
        </Link>
      </Box>
      {fazendas?.slice(0, 4)?.map(fazenda => {
        return (
          <Paper
            // eslint-disable-next-line no-underscore-dangle
            key={fazenda._id}
            style={{
              backgroundColor: '#fff',
              padding: '10px 10px',
              margin: '10px 0',
              borderRadius: '10px',
            }}
          >
            {fazenda[Fazenda.Descricao]}
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              style={{ margin: '10px 0px 10px 0px' }}
            >
              {fazenda.county.description}
              {/*  <Link
                key={v4()}
                // eslint-disable-next-line no-underscore-dangle
                to={`${ROUTES.PRODUCER_FAZENDA}/details/${fazenda._id}`}
                style={{ textDecoration: 'none' }}
              >
                ver detalhes
              </Link> */}
            </Box>
          </Paper>
        );
      })}
      {/* <Button
        variant="outlined"
        color="secondary"
        startIcon={<AddBoxIcon style={{ marginLeft: '15px' }} />}
        onClick={handleOpenModal}
      >
        Nova Fazenda
      </Button> */}
    </Box>
  );
};

export default FazendaShortCut;
