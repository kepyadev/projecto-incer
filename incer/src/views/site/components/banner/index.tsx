import { Grid, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import ROUTES from '../../../../constants/routes';
import useStyles from './banner.styles';

const SiteBanner: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container direction="row" alignItems="center" style={{ height: '100%' }}>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="h1" className={classes.title}>
            colecta e análise de dados dos operadores de cereais
          </Typography>
          <Link
            style={{
              padding: 20,
              borderRadius: 10,
              backgroundColor: '#F7AF1B',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: '0.9rem',
            }}
            className={classes.button}
            to={ROUTES.MARKET_PRICES}
          >
            VER DADOS
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default SiteBanner;
