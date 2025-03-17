import { Box, Tab, Tabs, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ErrorFail from '../../../../../../../components/error-fail';
import Loading from '../../../../../../../components/Loading';
import NotData from '../../../../../../../components/not-data';
import { Fazenda } from '../../../../../../../constants/entities';
import useAsyncState from '../../../../../../../hooks/use-async-state';
import { getFazendaById } from '../../../../../../../services/fazenda';
import { IFazenda } from '../../../../../../../types/fazenda';
import Animails from './components/animals';
import Culturas from './components/culturas';
import GeneralInformation from './components/general-information';
import HumanResourceView from './components/human-resource';
import Infraestrutura from './components/infraestruturas';
import Machines from './components/machines';
import MeiosEstacionarioView from './components/meios';

export default function FazendaDetail() {
  const [value, setValue] = useState<string>('info');
  const [fazenda, setFazenda] = useState<IFazenda | undefined>(undefined);
  const { error, setError, loading, setLoading } = useAsyncState();
  const routes = useHistory().location.pathname.split('/');

  const id = routes[routes.length - 1];

  useEffect(() => {
    if (id) {
      setLoading(true);
      getFazendaById(id)
        .then(res => {
          setFazenda(res.data?.payload);
        })
        .catch((erro: any) => {
          setError(erro.msg);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (_event: any, newValue: string) => {
    setValue(newValue);
  };

  if (loading) return <Loading />;

  if (error) return <ErrorFail />;

  if (!fazenda) return <NotData />;

  const getSelectedView = (valueToShow: string) => {
    switch (valueToShow) {
      case 'info':
        return <GeneralInformation fazenda={fazenda} />;

      case 'culture':
        return (
          <Culturas
            culturas={fazenda[Fazenda.Culturas]}
            cooperativeId={fazenda[Fazenda.Cooperative]}
          />
        );

      case 'machines':
        return <Machines fazendaId={fazenda[Fazenda.Id]} />;

      case 'infraestrutura':
        return <Infraestrutura fazendaId={fazenda[Fazenda.Id]} />;

      case 'animals':
        return <Animails fazendaId={fazenda[Fazenda.Id]} />;

      case 'human':
        return <HumanResourceView fazendaId={fazenda[Fazenda.Id]} />;

      case 'meios':
        return <MeiosEstacionarioView fazendaId={fazenda[Fazenda.Id]} />;

      default:
        return <ErrorFail />;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" style={{ marginBottom: '32px' }}>
        Fazenda {fazenda[Fazenda.Descricao]}
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        variant="scrollable"
        aria-label="secondary tabs example"
        style={{
          backgroundColor: 'orange',
          color: 'white',
          borderRadius: '5px',
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
      >
        <Tab value="info" label="Informações gerais" />
        <Tab value="culture" label="Culturas" />
        <Tab value="machines" label="Máquinas e equipamentos" />
        <Tab value="meios" label="Meios estacionários" />
        <Tab value="infraestrutura" label="Infraestruturas" />
        <Tab value="animals" label="Animais" />
        <Tab value="human" label="Recursos humanos" />
      </Tabs>

      {getSelectedView(value)}
    </Box>
  );
}
