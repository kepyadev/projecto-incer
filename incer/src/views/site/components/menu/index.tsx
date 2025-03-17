import { Grid, Hidden, Typography } from '@material-ui/core';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { v4 } from 'uuid';

import useStyles from './menu.styles';
import { itensMenu } from './menu.types';

const SiteMenu: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div className={classes.root}>
      <Hidden only="xs">
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {itensMenu.map(item => {
            // Verificar se a rota atual coincide com a rota do item
            const isActive = location.pathname === item.route;

            return (
              <Grid item key={v4()}>
                <Typography variant="body1">
                  <a
                    href={item.route}
                    className={`${classes.item} ${isActive ? classes.active : ''}`}
                  >
                    {item.text}
                  </a>
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Hidden>
    </div>
  );
};

export default SiteMenu;
