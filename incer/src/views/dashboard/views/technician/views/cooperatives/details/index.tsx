import { Box, Container, Tab, Tabs, Typography } from '@material-ui/core';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ErrorFail from '../../../../../../../components/error-fail';
import GenericModal from '../../../../../../../components/generic-modal';
import GenericTable from '../../../../../../../components/generic-table';
import InfoDetail from '../../../../../../../components/info-detail';
import { InfoField } from '../../../../../../../components/info-detail/infoDetail.types';
import Loading from '../../../../../../../components/Loading';
import TableWithoutFetcher from '../../../../../../../components/table';
import {
  Cooperative,
  County,
  Province,
} from '../../../../../../../constants/entities';
import { DashboardSubView } from '../../../../../../../constants/routes';
import { SWR } from '../../../../../../../constants/swr';
import { User } from '../../../../../../../constants/user';
import { AuthContext, AuthContextData } from '../../../../../../../context/auth';
// import { AuthContext, AuthContextData } from '../../../../../../../context/auth';
import useAsyncState from '../../../../../../../hooks/use-async-state';
import { getCooperativeById } from '../../../../../../../services/cooperative';
import { getAllProducersByCooperativeId } from '../../../../../../../services/producer';
import { ICooperative } from '../../../../../../../types/cooperative';
import { UserRole } from '../../../../../../../types/user';
import CreateProducerTechnician from '../components/create-producer';
import {
  cellsProducer,
  cellsProducersDesvinculados,
  dataModifierProducer,
  dataModifierProducerDesvinculados,
} from './cooperative.types';

const CooperativeDetailViewTechnician: FC = () => {
  const [value, setValue] = useState<string>('producers');
  const [cooperative, setCooperative] = useState<ICooperative>();
  const { error, setError, loading, setLoading } = useAsyncState();
  const { user } = useContext(AuthContext) as AuthContextData;
  const [openModalProducer, setOpenModalProducer] = useState(false);
  const history = useHistory();
  const routes = history.location.pathname.split('/');
  const id = routes[routes.length - 1];

  useEffect(() => {
    setLoading(true);
    getCooperativeById(id)
      .then(res => {
        setCooperative(res.data?.payload);
      })
      .catch((erro: Error) => {
        setError(erro);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (_event: any, newValue: string) => {
    setValue(newValue);
  };

  if (loading) return <Loading />;

  if (error) return <ErrorFail />;

  if (!cooperative)
    return (
      <Container>
        <Box
          style={{
            padding: '20px 10px',
            margin: '20% 10px',
            textAlign: 'center',
            backgroundColor: 'rgb(232, 244, 253)',
            color: 'rgb(13, 60, 97)',
          }}
        >
          <Typography>Lamentamos, cooperativa não encontrada</Typography>
        </Box>
      </Container>
    );

  const fields: InfoField[] = [
    {
      label: 'Provincia',
      value:
        cooperative![Cooperative.County][County.Province]![Province.Description] ??
        '-',
    },
    {
      label: 'Municipio',
      value: cooperative![Cooperative.County][County.Description] ?? '-',
    },
    { label: 'Presidente', value: cooperative[Cooperative.Presindet] },
    { label: 'Contacto', value: cooperative[Cooperative.Contact].phone },
  ];

  const handleNewProducer = () => {
    setOpenModalProducer(true);
  };

  const modalHandleClose = () => {
    setOpenModalProducer(false);
  };

  const handleSelectedProducer = (idproducer: string) => {
    if (user![User.Role] === UserRole.Technician) {
      history.push(`${DashboardSubView.TECHNICIAN_PRODUCER_DETAILS}/${idproducer}`);
    } else {
      // history.push(`${DashboardSubView.TECHNICIAN}/${id}`);
    }
  };

  const getSelectedView = (valueToShow: string) => {
    switch (valueToShow) {
      case 'producers':
        return (
          <>
            <GenericTable
              fetcher={getAllProducersByCooperativeId(cooperative[Cooperative.Id])}
              tableId={`${SWR.COOPERATIVE}/${cooperative[Cooperative.Id]}/producer`}
              entityName="Produtor"
              cells={cellsProducer}
              dataModifier={dataModifierProducer}
              primaryKey={Cooperative.Id}
              onCreate={handleNewProducer}
              onSelectOne={handleSelectedProducer}
            />
          </>
        );

      case 'desvinculados':
        return (
          <TableWithoutFetcher
            rows={dataModifierProducerDesvinculados(
              cooperative[Cooperative.Desvinculados]
            )}
            entityName="Produtor"
            cells={cellsProducersDesvinculados}
          />
        );

      default:
        return <ErrorFail />;
    }
  };

  return (
    <>
      <GenericModal
        title="Cadastrar Produtor"
        open={openModalProducer}
        onClose={() => {
          setOpenModalProducer(false);
        }}
      >
        <CreateProducerTechnician modalHandleClose={modalHandleClose} />
      </GenericModal>
      <Typography variant="h6">
        Cooperativa - {cooperative[Cooperative.Description]}
      </Typography>

      <InfoDetail fields={fields} />

      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          variant="fullWidth"
          aria-label="secondary tabs example"
          style={{
            backgroundColor: 'orange',
            color: 'white',
            borderRadius: '5px',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          <Tab value="producers" label="Produtores" />
          <Tab value="desvinculados" label="Produtores desvinculados" />
        </Tabs>

        {getSelectedView(value)}
      </Box>
    </>
  );
};

export default CooperativeDetailViewTechnician;
