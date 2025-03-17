import { Box, Button, Drawer, Hidden } from '@material-ui/core';
import React, { FC, useContext } from 'react';

import { AuthContext, AuthContextData } from '../../../../context/auth';
import { UserRole } from '../../../../types/user';
import LoggedUser from './components/logged-user';
import FazendaCooperativeShortCut from './components/operation/fazenda-cooperative';
import FazendaShortCut from './components/operation/fazenda-producer';
import FazendaTechnicianShortCut from './components/operation/fazenda-technician';
import useStyles from './drawer-rigth.styles';

interface DrawerRigthProps {
  open: boolean;
}

const DrawerRigth: FC<DrawerRigthProps> = ({ children, open }) => {
  const classes = useStyles();

  const { handleLogout, user } = useContext(AuthContext) as AuthContextData;

  return (
    <nav>
      <Hidden smDown>
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="right"
          open={false}
        >
          <LoggedUser />
          {user?.role === UserRole.Producer && <FazendaShortCut />}
          {user?.role === UserRole.Technician && <FazendaTechnicianShortCut />}
          {user?.role === UserRole.Cooperative && <FazendaCooperativeShortCut />}
          {user?.role === UserRole.Admin && <div style={{ height: '75%' }} />}
          {user?.role === UserRole.GeneralAnalitic && (
            <div style={{ height: '75%' }} />
          )}

          {children}
          <Button
            variant="contained"
            fullWidth
            color="secondary"
            onClick={handleLogout}
          >
            SAIR
          </Button>
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="right"
          open={open}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            style={{ height: '95%' }}
          >
            <LoggedUser />
            {user?.role === UserRole.Producer && <FazendaShortCut />}
            {user?.role === UserRole.Technician && <FazendaTechnicianShortCut />}
            {user?.role === UserRole.Cooperative && <FazendaCooperativeShortCut />}

            {children}
            {/*  <Button
              variant="contained"
              fullWidth
              color="secondary"
              onClick={handleLogout}
            >
              SAIR
            </Button> */}
          </Box>
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default DrawerRigth;
