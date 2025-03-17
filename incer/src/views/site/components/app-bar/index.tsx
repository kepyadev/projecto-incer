import { AppBar, Box, Button, Toolbar } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Logo from '../../../../components/logo';
import ROUTES from '../../../../constants/routes';
import useStyles from './app-bar.styles';

const SiteAppBar = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Box flexGrow={1}>
            <Logo />
          </Box>
          <Box className={classes.menu}>
            <Button
              variant="text"
              color="primary"
              onClick={() => history.push(ROUTES.LOGIN)}
              style={{ flex: 1 }}
            >
              Entrar
            </Button>
            <Button
              name="register"
              variant="contained"
              color="primary"
              onClick={() => history.push(ROUTES.REGISTER)}
              style={{ flex: 1 }}
            >
              Criar conta
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default SiteAppBar;
