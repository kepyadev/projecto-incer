import { Box, Button, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ConfirmModal from '../../../../../../../components/confirm-modal';
// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import GenericModal from '../../../../../../../components/generic-modal';
import InfoDetail from '../../../../../../../components/info-detail';
import Loading from '../../../../../../../components/Loading';
import NotData from '../../../../../../../components/not-data';
import SnackMessage from '../../../../../../../components/snack-message';
import TableWithoutFetcher from '../../../../../../../components/table';
import { Cooperative, Producer } from '../../../../../../../constants/entities';
import {
  DashboardSubView,
  DashboardView,
} from '../../../../../../../constants/routes';
import { User } from '../../../../../../../constants/user';
import { AuthContext, AuthContextData } from '../../../../../../../context/auth';
import useAsyncState from '../../../../../../../hooks/use-async-state';
import { unlinkProducer } from '../../../../../../../services/cooperative';
import {
  getOneProducerByCooperative,
  getProducerById,
} from '../../../../../../../services/producer';
import { IProducer } from '../../../../../../../types/producer';
import { UserRole } from '../../../../../../../types/user';
import { getCooperativeLogged } from '../../../../../../../utils';
// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import CreateFazendaForm from '../../../../cooperative/views/fazendas/create';
// import CreateFazendaForm from '../../fazenda/create';
import { cells, getFields } from './details.types';

const CooperativeProducerDetail = () => {
  const routes = useHistory().location.pathname.split('/');
  const history = useHistory();
  const { loading, setLoading, snackMessage, setSnackMessage } = useAsyncState();
  const [producer, setProducer] = useState<IProducer | undefined>();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  const [openFazendaModal, setOpenFazendaModal] = useState(false);
  const id = routes[routes.length - 1];
  const [cooperative] = useState(getCooperativeLogged());

  const { user } = useContext(AuthContext) as AuthContextData;
  const isAdmin: boolean = !user || user[User.Role] === UserRole.Admin;

  const handleCreateFazenda = () => {
    setOpenFazendaModal(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  const onCreate = isAdmin
    ? undefined
    : () => {
        handleCreateFazenda();
      };

  useEffect(() => {
    if (user![User.Role] === UserRole.Cooperative) {
      getOneProducerByCooperative(id, cooperative[Cooperative.Id])
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
    } else if (
      user![User.Role] === UserRole.Technician ||
      user![User.Role] === UserRole.Admin
    ) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
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
          {/*           {producer[Producer.Cooperative] && (
           */}
          <Button
            variant="contained"
            style={{ backgroundColor: 'red', color: 'white' }}
            onClick={() => {
              setOpenConfirmationModal(true);
            }}
          >
            Desvincular
          </Button>
          {/*           )}
           */}
        </Box>
      )}
      <InfoDetail fields={fields} />

      <TableWithoutFetcher
        rows={producer[Producer.Fazendas] || []}
        cells={cells}
        entityName="Fazenda"
        title="Fazendas"
        onSelectOne={onSelectOne}
        primaryKey={Producer.Id}
      />
    </>
  );
};

export default CooperativeProducerDetail;
