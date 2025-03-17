import { Box, Grid, Paper, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const MachineAnalitic: FC = () => {
  const superset = process.env.REACT_APP_SUPERSET;

  return (
    <>
      <Box display="flex" justifyContent="space-between" flex-direction="row">
        <Typography variant="h5">Dashboard - Máquinas</Typography>
        <Link
          style={{
            backgroundColor: 'rgb(247, 175, 27)',
            padding: '10px',
            borderRadius: '5px',
            color: '#fff',
            textDecoration: 'none',
          }}
          to={{ pathname: `${superset}/r/5` }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Dashboard Completo
        </Link>
      </Box>
      <hr />
      <Grid
        container
        style={{
          marginBottom: '10px',
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'row',
        }}
        spacing={3}
      >
        <Grid item xs={12} md={12} sm={12}>
          <Paper
            style={{
              backgroundColor: 'rgb(247, 247, 247)',
              borderRadius: '10px 10px',
              padding: '10px',
            }}
            elevation={0}
          >
            <iframe
              title="registro fazendas"
              width="100%"
              height="400px"
              seamless
              frameBorder="0"
              scrolling="no"
              src={`${superset}/superset/explore/?form_data_key=ARdR5XGTmwfJC_SuZUaaGpHdafM8FvBWkiWKqfcawQrbO8ozzXvD9NJsPvT_4zCy&standalone=1&height=700`}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <Paper
            style={{
              backgroundColor: 'rgb(247, 247, 247)',
              borderRadius: '10px 10px',
              padding: '10px',
            }}
            elevation={0}
          >
            <iframe
              title="total culturas"
              width="100%"
              height="300px"
              seamless
              frameBorder="0"
              scrolling="no"
              src={`${superset}/superset/explore/?form_data_key=jb_Trae7CxO1LkW9X58r6KU1KXnnAFujcf2V8hB9fiDXLS6xazR4c6Cqjmt-8qUI&standalone=1&height=500`}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <Paper
            style={{
              backgroundColor: 'rgb(247, 247, 247)',
              borderRadius: '10px 10px',
              padding: '10px',
            }}
            elevation={0}
          >
            <iframe
              title="Tipos de culturas"
              width="100%"
              height="300px"
              seamless
              frameBorder="0"
              scrolling="no"
              src={`${superset}/superset/explore/?form_data_key=waEWS21GtEUYwC2CzAvduxcVqljENuITCYI4q57uUO4fQEn4AWa1cUir7aZQKusD&standalone=1&height=500`}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default MachineAnalitic;
