import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';

import ErrorFail from '../../../../components/error-fail';
import GenericCard from '../../../../components/generic-card';
import Loading from '../../../../components/Loading';
import useAsyncState from '../../../../hooks/use-async-state';
import { fazendaGrown } from '../../../../services/fazenda';
import { getTechnicianResume } from '../../../../services/technician';
import pallete from '../../../../theme/colors';
import { getMonth } from '../../../../utils';

const Admin = () => {
  const { loading, setLoading, error, setError } = useAsyncState();
  const [data, setData] = useState<any>();

  const [cultures, setCultures] = useState<number>(0);
  const [cooperatives, setCooperatives] = useState<number>(0);
  const [fazendas, setFazendas] = useState<number>(0);
  const [producers, setProducers] = useState<number>(0);

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
        setError(new Error('lamentamos, ocorreu algum erro!', error));
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

  if (loading) return <Loading />;

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
      <Grid item xs={12} md={6} sm={4} lg={3}>
        <GenericCard color={pallete.PRIMARY} title="Produtores" value={producers} />
      </Grid>
      <Grid item xs={12} md={6} sm={4} lg={3}>
        <GenericCard color="#C4C4C4" title="Fazendas" value={fazendas} />
      </Grid>
      <Grid item xs={12} md={6} sm={4} lg={3}>
        <GenericCard
          color={pallete.PRIMARY}
          title="Cooperativas"
          value={cooperatives}
        />
      </Grid>
      <Grid item xs={12} md={6} sm={4} lg={3}>
        <GenericCard color="#C4C4C4" title="Culturas" value={cultures} />
      </Grid>
      <Grid item xs={12} style={{ overflowX: 'scroll' }}>
        <div style={{ width: '100%', height: 400 }}>
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
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Grid>
    </Grid>
  );
};

export default Admin;
