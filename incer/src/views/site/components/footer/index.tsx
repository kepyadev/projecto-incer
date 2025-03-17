import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { v4 } from 'uuid';

import Logo from '../../../../components/logo';
import useStyles from './footer.styles';
import socialNetworks from './footer.types';

const FootBar = () => {
  const classes = useStyles();
  const data = new Date().getFullYear();
  return (
    <Grid
      container
      className={classes.footerBar}
      direction="row"
      justifyContent="center"
      alignItems="stretch"
    >
      <Grid item style={{ color: '#fff', fontSize: '14pt' }} xs={12} sm={6} md={7}>
        {data} Cerprod, All rigths reserved
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        {socialNetworks.map(network => (
          <a
            target="_blank"
            href={network.url}
            rel="noreferrer"
            style={{ marginRight: '16px' }}
            key={v4()}
          >
            <img src={network.imgUrl} alt={`social-network-${network.name}`} />
          </a>
        ))}
      </Grid>
    </Grid>
  );
};

const SiteFooter = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item xs={12} sm={12} md={3} className={classes.logotipoItem}>
            <Logo />
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={classes['MuiGrid-item']}>
            <Typography variant="h5" className={classes.title}>
              Endereço
            </Typography>
            <Typography variant="body1">Luanda, Talatona</Typography>
            <Typography variant="body1">Município Talatona Via AS21</Typography>
            <Typography variant="body1">Casa nº 4</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={classes['MuiGrid-item']}>
            <Typography variant="h5" className={classes.title}>
              Contactos
            </Typography>
            <Typography variant="body1">Tel: (+244) 998 765 765</Typography>
            <Typography variant="body1">Tel: (+244) 998 765 766</Typography>
            <Typography variant="body1">E-mail: exemplo@gmail.com</Typography>
          </Grid>
        </Grid>
      </div>
      <FootBar />
    </div>
  );
};

export default SiteFooter;
