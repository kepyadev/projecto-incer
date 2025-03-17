import { Box, Grid, Paper, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const CultureAnalitic: FC = () => {
  const superset = process.env.REACT_APP_SUPERSET;

  return (
    <>
      <Box display="flex" justifyContent="space-between" flex-direction="row">
        <Typography variant="h5">Dashboard - Culturas</Typography>
        <Link
          style={{
            backgroundColor: 'rgb(247, 175, 27)',
            padding: '10px',
            borderRadius: '5px',
            color: '#fff',
            textDecoration: 'none',
          }}
          to={{ pathname: `${superset}/r/6` }}
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
              src={`${superset}/r/9`}
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
              height="400px"
              seamless
              frameBorder="0"
              scrolling="no"
              src={`${superset}/superset/explore/?form_data_key=4BqXvgkNj21NK5ov_2768gIPyf9fpauBdr8cyHq8heRanQ4IEEzbh35XpPQ90Hwi&standalone=1&height=650`}
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
              height="400px"
              seamless
              frameBorder="0"
              scrolling="no"
              src={`${superset}/superset/explore/?form_data_key=KKCgRp9ug3SG-MJcOfuRKapBDZzjZhu6YIoHsXponog50f3dFzGJnifGW8wVaSi6&standalone=1&height=650`}
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
              src={`${superset}/superset/explore/?form_data_key=RKvyj3Fp1-YSdtUN_kxc9WRG_pJNyQe-NXaI3HH8EcRatL2Gm15P-VASR4frwpLq&standalone=1&height=750`}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default CultureAnalitic;
