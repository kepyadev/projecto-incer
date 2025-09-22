import { Grid } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';

import { Culture, Production } from '../../../../assets/img/icons';
import ErrorFail from '../../../../components/error-fail';
import GenericCard from '../../../../components/generic-card';
import useAsyncState from '../../../../hooks/use-async-state';
import { fazendaGrown } from '../../../../services/fazenda';
import { getTechnicianResume } from '../../../../services/technician';
import pallete from '../../../../theme/colors';
import { getMonth } from '../../../../utils';

const Technician: FC = () => {
  const [cultures, setCultures] = useState<number>(0);
  const [cooperatives, setCooperatives] = useState<number>(0);
  const [fazendas, setFazendas] = useState<number>(0);
  const [producers, setProducers] = useState<number>(0);
  const { loading, setLoading, error, setError } = useAsyncState();
  const [data, setData] = useState<any>();

  // const data = [
  //   { name: '2022-10-02', uv: 400 },
  //   { name: '2022-09-09', uv: 500 },
  //   { name: '2022-09-13', uv: 200 },
  //   { name: '2022-11-02', uv: 450 },
  // ];

  useEffect(() => {
    setLoading(true);
    getTechnicianResume()
      .then(response => {
        setCultures(response.data.payload.cultures);
        setCooperatives(response.data.payload.cooperatives);
        setFazendas(response.data.payload.fazendas);
        setProducers(response.data.payload.producers);
      })
      .catch((error) => { 
       console.log(error)
        setError(new Error('lamentamos, ocorreu algum erro!'));
      })
      .finally(() => {
        setLoading(false);
      });

    fazendaGrown().then(response => {
      const r = response.data?.payload.map(res => {
        return { name: getMonth(res.date), fazendas: res.fazendas };
      });
      setData(r);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorFail />;

  return (
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
          title="Produtores"
          paths={Production}
          value={producers}
          loading={loading}
        />
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={3}>
        <GenericCard
          color="#C4C4C4"
          title="Fazendas"
          value={fazendas}
          paths={Culture}
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
      <Grid item xs={12} md={6} sm={6} lg={3}>
        <GenericCard
          color={pallete.PRIMARY}
          title="Cooperativas"
          value={cooperatives}
          loading={loading}
        />
      </Grid>
      <Grid item xs={12} style={{ overflowX: 'scroll' }}>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart
              height={400}
              data={data}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              <Line
                type="monotone"
                dataKey="fazendas"
                stroke="#ff7300"
                yAxisId={0}
              />
              <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
              <Line type="monotone" dataKey="amt" stroke="#666908" yAxisId={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Grid>
    </Grid>
  );
};
export default Technician;
