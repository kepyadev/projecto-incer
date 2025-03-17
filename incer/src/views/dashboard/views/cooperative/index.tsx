import { Grid, Paper } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';

import GenericCard from '../../../../components/generic-card';
import GenericTable from '../../../../components/generic-table';
import {
  Cooperative,
  Culture as CultureConst,
} from '../../../../constants/entities';
import { SWR } from '../../../../constants/swr';
import useAsyncState from '../../../../hooks/use-async-state';
import { getCooperativeResume } from '../../../../services/cooperative';
import { getAllCultureCooperative } from '../../../../services/culture';
import pallete from '../../../../theme/colors';
import { getCooperativeLogged } from '../../../../utils';
import { cellsCultures, dataModifierCultures } from './index.types';

const CooperativeDashboard: FC = () => {
  const [cooperative] = useState(getCooperativeLogged());
  const [cultures, setCultures] = useState<number>(0);
  const [producers, setProducers] = useState<number>(0);
  const [fazendas, setFazendas] = useState<number>(0);
  const [animals, setAnimals] = useState<number>(0);
  const { loading, setLoading } = useAsyncState();

  useEffect(() => {
    setLoading(true);
    getCooperativeResume()
      .then(response => {
        setCultures(response.data.payload.cultures);
        setProducers(response.data.payload.producers);
        setFazendas(response.data.payload.fazendas);
        setAnimals(response.data.payload.animals);
      })
      .catch()
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid
        container
        style={{
          marginBottom: '50px',
          display: 'flex',
          flexDirection: 'row',
          justifyItems: 'center',
          justifyContent: 'center',
        }}
        spacing={3}
      >
        <Grid item xs={12} md={6} sm={6} lg={3}>
          <GenericCard
            color={pallete.PRIMARY}
            title="Cooperados"
            value={producers}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={6} lg={3}>
          <GenericCard
            color="#C4C4C4"
            title="Fazendas"
            value={fazendas}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={6} lg={3}>
          <GenericCard
            color={pallete.PRIMARY}
            title="Animais"
            value={animals}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={6} lg={3}>
          <GenericCard
            color={pallete.PRIMARY}
            title="Culturas"
            value={cultures}
            loading={loading}
          />
        </Grid>
      </Grid>

      {/*  <Grid item xs={12} md={4} sm={12}>
          <ProducerResume />
        </Grid> */}
      <Grid item xs={12} md={12}>
        <h4>Culturas</h4>
        <Paper style={{ padding: '10px 15px' }} elevation={0}>
          <GenericTable
            pagination={false}
            fetcher={getAllCultureCooperative(cooperative[Cooperative.Id])}
            cells={cellsCultures}
            entityName="Culturas"
            primaryKey={CultureConst.Id}
            tableId={SWR.CULTURE}
            dataModifier={dataModifierCultures}
          />
        </Paper>
      </Grid>
    </>
  );
};
export default CooperativeDashboard;
