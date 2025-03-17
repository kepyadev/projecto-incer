import { Grid, Paper } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';

import GenericCard from '../../../../components/generic-card';
import GenericTable from '../../../../components/generic-table';
import { SWR } from '../../../../constants/swr';
import useAsyncState from '../../../../hooks/use-async-state';
import {
  getAnimalsByProducer,
  getCultureByProducer,
  getProducerResume,
} from '../../../../services/producer';
import pallete from '../../../../theme/colors';
import { cellsAnimals, cellsCultures, dataModifierCultures } from './index.types';

const Producer: FC = () => {
  const [cultures, setCultures] = useState<number>(0);
  const [machines, setMachines] = useState<number>(0);
  const [fazendas, setFazendas] = useState<number>(0);
  const [animals, setAnimals] = useState<number>(0);
  const { loading, setLoading } = useAsyncState();

  useEffect(() => {
    setLoading(true);
    getProducerResume()
      .then(response => {
        setCultures(response.data.payload.cultures);
        setMachines(response.data.payload.machines);
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
            title="Máquinas"
            value={machines}
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
        <Grid item xs={12} md={6}>
          <h4>Culturas</h4>
          <Paper style={{ padding: '10px 15px' }}>
            <GenericTable
              pagination={false}
              fetcher={getCultureByProducer}
              cells={cellsCultures}
              entityName="Culturas"
              primaryKey="_id"
              tableId={SWR.CULTURE}
              dataModifier={dataModifierCultures}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <h4>Animais</h4>
          <Paper style={{ padding: '10px 15px' }}>
            <GenericTable
              pagination={false}
              fetcher={getAnimalsByProducer}
              cells={cellsAnimals}
              entityName="Animais"
              primaryKey="_id"
              tableId={SWR.ANIMAL}
              dataModifier={dataModifierCultures}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default Producer;
