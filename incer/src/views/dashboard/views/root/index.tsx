import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from 'recharts';

import GenericCard from '../../../../components/generic-card';
import pallete from '../../../../theme/colors';

const Root: FC = () => {
  const data = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 500, pv: 4400, amt: 200 },
    { name: 'Page C', uv: 200, pv: 6400, amt: 700 },
    { name: 'Page D', uv: 450, pv: 3100, amt: 900 },
  ];
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
        <GenericCard color={pallete.PRIMARY} title="Produtores" value={15} />
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={3}>
        <GenericCard color="#C4C4C4" title="Fazendas" value={24} />
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={3}>
        <GenericCard color={pallete.PRIMARY} title="Animais" value={1032} />
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={3}>
        <GenericCard color={pallete.PRIMARY} title="Culturas" value={32} />
      </Grid>

      <Grid item xs={12}>
        <LineChart
          width={900}
          height={400}
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
          <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
          <Line type="monotone" dataKey="amt" stroke="#666908" yAxisId={2} />
        </LineChart>
      </Grid>
    </Grid>
  );
};
export default Root;
