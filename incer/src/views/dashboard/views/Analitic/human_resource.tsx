import { Box, Grid, Paper, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const HumanResourceAnalitic: FC = () => {
  const superset = process.env.REACT_APP_SUPERSET;

  return (
    <>
      <Box display="flex" justifyContent="space-between" flex-direction="row">
        <Typography variant="h5">Dashboard - Recursos Humanos</Typography>
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
              title="total culturas"
              width="100%"
              height="400px"
              seamless
              frameBorder="0"
              scrolling="no"
              src={`${superset}/superset/explore/?form_data_key=cC537c53uTTlFtEIW0nqQC5-9odZxzPLYRfP9K6OMBjGANwT_xp58e461wnTx4JW&standalone=1&height=650`}
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
              height="400px"
              seamless
              frameBorder="0"
              scrolling="no"
              src={`${superset}/superset/explore/?form_data_key=F1DEHgI9dyVSpM8Xisu3qb8FB-HoFWKFrYdxGnWCY9HHLdu9-BNGUuVCEiQIA8jh&standalone=1&height=650`}
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
              height="400px"
              seamless
              frameBorder="0"
              scrolling="no"
              src={`${superset}/superset/explore/?form_data_key=5bji3ddeMrlcI8adcyOn4Wg86Ut7S48PNbkfm9dIsoifPnqfRAidRvKtsSaRQQXI&standalone=1&height=650`}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default HumanResourceAnalitic;
