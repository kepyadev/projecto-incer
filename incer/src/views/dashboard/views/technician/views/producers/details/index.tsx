import { Box, Button, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ConfirmModal from '../../../../../../../components/confirm-modal';
import GenericModal from '../../../../../../../components/generic-modal';
import InfoDetail from '../../../../../../../components/info-detail';
import Loading from '../../../../../../../components/Loading';
import NotData from '../../../../../../../components/not-data';
import SnackMessage from '../../../../../../../components/snack-message';
import TableWithoutFetcher from '../../../../../../../components/table';
import { Producer } from '../../../../../../../constants/entities';
import {
  DashboardSubView,
  DashboardView,
} from '../../../../../../../constants/routes';
import { User } from '../../../../../../../constants/user';
import { AuthContext, AuthContextData } from '../../../../../../../context/auth';
import useAsyncState from '../../../../../../../hooks/use-async-state';
import { unlinkProducer } from '../../../../../../../services/cooperative';
import { getProducerById } from '../../../../../../../services/producer';
import { IProducer } from '../../../../../../../types/producer';
import { UserRole } from '../../../../../../../types/user';
import CreateFazendaForm from '../../../../shared/components/fazenda/create';
import { cells, getFields } from './details.types';

const TechnicianProducerDetail = () => {
  const { loading, setLoading, snackMessage, setSnackMessage } = useAsyncState();
  const [producer, setProducer] = useState<IProducer | undefined>();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openFazendaModal, setOpenFazendaModal] = useState(false);
  const routes = useHistory().location.pathname.split('/');
  const history = useHistory();
  const id = routes[routes.length - 1];

  const { user } = useContext(AuthContext) as AuthContextData;
  const isAdmin: boolean = !user || user[User.Role] === UserRole.Admin;

  /* const handleCreateFazenda = () => {
    setOpenFazendaModal(true);
  }; */

  /*  const onCreate = isAdmin
    ? undefined
    : () => {
        handleCreateFazenda();
      };
 */
  useEffect(() => {
    setLoading(true);
    getProducerById(id)
      .then(response => {
        setProducer(response.data?.payload);
      })
      .catch(() => {
        setSnackMessage({
          isError: true,
          message: 'Lamentamos, ocorreu um erro ao carregar os dados do produtor!',
        });
      })
      .finally(() => {
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseFazendaModal = () => {
    setOpenFazendaModal(false);
  };
  if (loading) return <Loading />;

  if (!producer) return <NotData />;

  const fields = getFields(producer);
  const actionConfirmModal = () => {
    setLoading(true);
    unlinkProducer({
      producer: producer[Producer.Id],
    })
      .then(() => {
        setSnackMessage({
          isError: false,
          message: 'Produtor desvinculado com sucesso',
        });
        history.push(`${DashboardView.COOPERATIVE_PRODUCERS}`);
      })
      .catch(() => {
        setSnackMessage({
          isError: true,
          message:
            'Lamentamos, ocorreu um erro ao desvincular o produtor. Por favor tente novamente',
        });
      })
      .finally(() => {
        setLoading(false);
        handleCloseConfirmModal();
      });
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmationModal(false);
  };

  const onSelectOne = (fazendaId: string) => {
    if (user![User.Role] === UserRole.Cooperative) {
      history.push(`${DashboardSubView.COOPERATIVE_FAZENDA_DETAILS}/${fazendaId}`);
    } else if (user![User.Role] === UserRole.Technician) {
      history.push(`${DashboardSubView.TECHNICIAN_FAZENDA_DETAILS}/${fazendaId}`);
    }
  };
  return (
    <>
      <SnackMessage
        snackMessage={snackMessage}
        handleClose={() => {
          setSnackMessage(null);
        }}
      />
      <ConfirmModal
        open={openConfirmationModal}
        onClose={handleCloseConfirmModal}
        text="Deseja realmente desvincular este produtor?"
        action={actionConfirmModal}
      />
      {!isAdmin && (
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5">Detalhes do produtor</Typography>
          {/* {producer[Producer.Cooperative] && ( */}
          <Button
            variant="contained"
            style={{ backgroundColor: 'red', color: 'white' }}
            onClick={() => {
              setOpenConfirmationModal(true);
            }}
          >
            Desvincular
          </Button>
          {/*  )} */}
        </Box>
      )}
      <InfoDetail fields={fields} />

      {producer && (
        <GenericModal
          title="Cadastrar Fazenda"
          onClose={handleCloseFazendaModal}
          open={openFazendaModal}
        >
          <CreateFazendaForm
            modalHandleClose={handleCloseFazendaModal}
            producer={producer}
          />
        </GenericModal>
      )}
      <TableWithoutFetcher
        rows={producer[Producer.Fazendas] || []}
        cells={cells}
        entityName="Fazenda"
        // onCreate={onCreate}
        title="Fazendas"
        onSelectOne={onSelectOne}
        primaryKey={Producer.Id}
      />
    </>
  );
};

export default TechnicianProducerDetail;
