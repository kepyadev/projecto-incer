import { Box, Grid, Paper, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const AnimalAnalitic: FC = () => {
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
          to={{ pathname: `${superset}/r/7` }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Dashboard Completo
        </Link>
      </Box>
      <hr />
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} sm={12}>
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
              height="400px"
              seamless
              frameBorder="0"
              scrolling="no"
              src={`${superset}/superset/explore/?form_data=%7B%22slice_id%22%3A%207%7D&standalone=1&height=650`}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={9} sm={12}>
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
              height="400px"
              seamless
              frameBorder="0"
              scrolling="no"
              src={`${superset}/superset/explore/?form_data_key=Ziarg1YPRkYAOISv7US-qRyowEf8X75MiN-Zl_nUQtlMpHe4DiVxsmzIHhPjkH6S&standalone=1&height=650`}
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
              src={`${superset}/superset/explore/?form_data_key=g7t0Qya9wpbGHHIqVC_Lb7ndOj3f8Hb3BQ1w8dv5HSiK_n5hXY8i1sOR4Ntd90GL&standalone=1&height=650`}
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
              src={`${superset}/superset/explore/?form_data_key=lkziOFK8KEfenIGoK-rKNOnsRb9lFTZXwLRVStPsMxym4GXujU4XBb17nJCgpanJ&standalone=1&height=550`}
            />
          </Paper>
        </Grid>
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
              src={`${superset}/superset/explore/?form_data_key=kgrYGATDoZ5O2GxekJc6QLqAcFiQNz4RHb1YUAiFshKUFfHHRU5OkjniFjybhj5R&standalone=1&height=800`}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default AnimalAnalitic;
