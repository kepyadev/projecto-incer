import { Box, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';

import GenericModal from '../../../../../../../components/generic-modal';
import { Fazenda } from '../../../../../../../constants/entities';
import ROUTES from '../../../../../../../constants/routes';
import { getAllFazenda } from '../../../../../../../services/fazenda';
import { IFazenda } from '../../../../../../../types/fazenda';
import CreateFazendaForm from '../../../../../views/shared/components/fazenda/create';

export interface IProps {}

const FazendaTechnicianShortCut = () => {
  const [fazendas, setFazendas] = useState<ReadonlyArray<IFazenda>>();
  const [open, setOpen] = useState(false);
  const handleCloseModal = () => setOpen(false);

  useEffect(() => {
    getAllFazenda({ page: 1, limit: 5 })
      .then(result => {
        setFazendas(result.data?.payload.data);
      })
      .catch(() => {
        setFazendas([]);
      });
  }, [open]);

  /* const handleOpenModal = () => {
    setOpen(true);
  }; */

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      style={{ height: '75%' }}
    >
      <GenericModal title="Cadastrar Fazenda" onClose={handleCloseModal} open={open}>
        <CreateFazendaForm modalHandleClose={handleCloseModal} />
      </GenericModal>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ margin: '0 5px', height: '35px' }}
      >
        <h3 style={{ width: '50%' }}>Fazendas</h3>
        <Link to={ROUTES.TECHNICIAN_FAZENDAS} style={{ textDecoration: 'none' }}>
          ver todas
        </Link>
      </Box>
      {fazendas?.slice(0, 4)?.map(fazenda => {
        return (
          <Paper
            key={v4()}
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
              {/*   <Link
                // eslint-disable-next-line no-underscore-dangle
                to={`${ROUTES.TECHNICIAN_FAZENDAS}/details/${fazenda._id}`}
                style={{ textDecoration: 'none' }}
              >
                ver detalhes
              </Link> */}
            </Box>
          </Paper>
        );
      })}
      {/*  <Button
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

export default FazendaTechnicianShortCut;
