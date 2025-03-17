import { Box, Grid, Paper, Typography } from '@material-ui/core';
// import { env } from 'process';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const AnimalAnalitic: FC = () => {
  const superset = process.env.REACT_APP_SUPERSET;
  return (
    <>
      <Box display="flex" justifyContent="space-between" flex-direction="row">
        <Typography variant="h5">Dashboard - Animais</Typography>
        <Link
          style={{
            backgroundColor: 'rgb(247, 175, 27)',
            padding: '10px',
            borderRadius: '5px',
            color: '#fff',
            textDecoration: 'none',
          }}
          to={{ pathname: `${superset}r/7` }}
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
            Efectivo Total
            <iframe
              title="total culturas"
              width="100%"
              height="400px"
              seamless
              frameBorder="0"
              scrolling="no"
              security="no"
              src={`${superset}superset/explore/?form_data_key=1R9e59QT6tnCZySrGkovv9UO5E9LPdqAvI7GrVjzvVTWN3sbZpn86bErXjAjOHJ9&standalone=true&height=650`}
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
              src={`${superset}superset/explore/?form_data_key=uU6H9Ur6hHcxCwn3X3HltB3owmEu91uQJ9RYkdXBTKmAIe64aew-SxMtNtBvaJ7T&standalone=1&height=750`}
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
              src={`${superset}superset/explore/?form_data_key=ghWy3QsYf-LetT4goxvGfYClYMU52mGa-5HChEko1pahETmBb7WTy6zS8ucs9FLi&standalone=1&height=650`}
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
            Matrizes
            <iframe
              title="registro fazendas"
              width="100%"
              height="400px"
              seamless
              frameBorder="0"
              scrolling="no"
              src={`${superset}superset/explore/?form_data_key=OWTBx3Ghdy1dR5s3k7Wjabe2nudy53Ktohl7gvUmVlwHrl9pGrsVACTvau4N-2br&standalone=1&height=650`}
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
            Ovos
            <iframe
              title="registro fazendas"
              width="100%"
              height="400px"
              seamless
              frameBorder="0"
              scrolling="no"
              src={`${superset}superset/explore/?form_data_key=MTMHW4ZSSiPpnghHI7UWRiEPAp6ota2LYTlZrEQGIdW_W0vF1l_WTq-qnworNGeV&standalone=1&height=650`}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default AnimalAnalitic;
