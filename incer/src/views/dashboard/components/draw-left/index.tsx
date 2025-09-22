import { Box, Drawer, Hidden } from '@material-ui/core';
import React, { FC, useContext } from 'react';
import { v4 } from 'uuid';

import Logo from '../../../../components/logo';
import { DashboardView } from '../../../../constants/routes';
import { AuthContext, AuthContextData } from '../../../../context/auth';
import { UserRole } from '../../../../types/user';
// import ROUTES from '../../../../constants/routes';
import { dashboardOptions } from '../../dashboard.data';
import useStyles from './drawer-left.styles';
import { IOptions } from './drawer-left.types';
import ButtonSquare from '../../../../components/button-square';

interface DrawerLEftProps {
  open: boolean;
}

interface MainChildProps {
  open: boolean;
  permanent?: boolean;
}

const MainChild: FC<MainChildProps> = ({ open, permanent = false }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext) as AuthContextData;
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      classes={{
        paper: classes.drawerPaper,
      }}
      open={open || permanent}
      anchor="left"
    >
      <div className={classes.drawerHeader}>
        <Logo full />
      </div>
      <Box
        style={{
          padding: '0px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          maxWidth: '230px',
        }}
      >
        {Object.keys(dashboardOptions).map(key => {
          const view = dashboardOptions[key as DashboardView] as IOptions;
          if (!user || !view.roles.includes(user.role)) return null;
          if (user.role === UserRole.GeneralAnalitic) {
            const pathActual = key.replace('/dashboard', '');

            if (!user.permitions?.includes(pathActual) && pathActual !== '') {
              return null;
            }
          }
          return (
            <ButtonSquare
              text={view.text}
              SvgPath={view.path}
              url={view.url}
              key={v4()}
            />
          );
        })}
      </Box>
    </Drawer>
  );
};

const DrawerLeft: FC<DrawerLEftProps> = ({ open }) => {
  return (
    <nav>
      <Hidden smDown>
        <MainChild open={open} permanent />
      </Hidden>
      <Hidden mdUp>
        <MainChild open={open} />
      </Hidden>
    </nav>
  );
};

export default DrawerLeft;
