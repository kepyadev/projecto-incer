import { Box, Grid, Paper, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const FazendaAnalitic: FC = () => {
  const superset = process.env.REACT_APP_SUPERSET;

  return (
    <>
      <Box display="flex" justifyContent="space-between" flex-direction="row">
        <Typography variant="h5">Dashboard - Fazendas</Typography>
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
              title="Tipos de culturas"
              width="100%"
              height="400px"
              seamless
              frameBorder="0"
              scrolling="no"
              src={`${superset}/superset/explore/?form_data_key=83D34AoVvAPZkAoOW00I9OMJOd2dun4zwbAyB9B5oHdPPs6bbWgM8tAu2_YRJO6R&standalone=1&height=700`}
            />
          </Paper>
        </Grid>
      </Grid>

      <Grid
        container
        style={{
          marginTop: '10px',
        }}
        spacing={3}
      >
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
              title="registro fazendas"
              width="100%"
              height="300px"
              seamless
              frameBorder="0"
              scrolling="no"
              src={`${superset}/superset/explore/?form_data=%7B%22slice_id%22%3A%209%7D&standalone=1&height=600`}
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
              title="registro fazendas"
              width="100%"
              height="300px"
              seamless
              frameBorder="0"
              scrolling="no"
              src={`${superset}/superset/explore/?form_data=%7B%22slice_id%22%3A%205%7D&standalone=1&height=600`}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default FazendaAnalitic;
