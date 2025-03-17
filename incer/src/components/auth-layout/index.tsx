import { Box, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { FC } from 'react';

import Logo from '../logo';
import useStyles from './auth-layout.styles';
import { AuthLayoutProps } from './auth-layout.types';

// eslint-disable-next-line react/prop-types
const AuthLayout: FC<AuthLayoutProps> = ({ children, title, isShownigLogo }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item md={6} xs={10} className={classes.leftSide}>
        {isShownigLogo && (
          <div style={{ float: 'left' }}>
            <Logo />
          </div>
        )}
      </Grid>
      <Grid item md={6} xs={12} className={classes.rigthSide}>
        <Box className={classes.containerTitle}>
          <Typography variant="h1" className={classes.title}>
            {title}
          </Typography>
        </Box>
        {children}
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
