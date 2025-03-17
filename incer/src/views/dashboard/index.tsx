import { Box, Container, IconButton } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { ArrowBack } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ForbidenPermission from '../../components/forbidenPermission';
import Loading from '../../components/Loading';
import { DashboardSubView, DashboardView } from '../../constants/routes';
import { User } from '../../constants/user';
import { AuthContext, AuthContextData } from '../../context/auth';
import useAsyncState from '../../hooks/use-async-state';
import { UserRole } from '../../types/user';
import DrawerLeft from './components/draw-left';
import LoggedUser from './components/drawer-rigth/components/logged-user';
import { dashboardOptions, dashboardSubViewOptions } from './dashboard.data';
import useStyles from './dashboard.styles';
import { hasPermission, isValidRoute } from './dashboard.type';
import Admin from './views/admin';
import Analitic from './views/Analitic';
import Cooperative from './views/cooperative';
import Producer from './views/producer';
import Root from './views/root';
import Technician from './views/technician';

const Dashboard: FC = ({ children }) => {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openRigth, setOpenRigth] = useState(true);
  const [View, setView] = useState<ReactNode>(null);
  const routerPath = history.location.pathname;
  const { user, loading: loadingUser } = useContext(AuthContext) as AuthContextData;
  const [permission, setPermission] = useState<boolean>(true);
  const { loading, setLoading } = useAsyncState();

  const validateRole = (loggedRole: string, viewRoles: string[]) =>
    viewRoles.includes(loggedRole);
  useEffect(() => {
    setLoading(true);

    const isSubRoute = routerPath.split('/').length > 3;
    const pather = routerPath.split('/').slice(0, 3).join('/');

    // console.log('TODO: adicionar a negação para proteger a dashboard and return');

    if (user) {
      if (!hasPermission(user, dashboardOptions, pather as DashboardView)) {
        setLoading(false);
        setPermission(false);
        return;
      }
      setPermission(true);
    }

    if (isSubRoute) {
      setLoading(false);
      const actualRouteWithouParam = routerPath.split('/').slice(0, 4).join('/');

      if (isValidRoute(dashboardSubViewOptions, actualRouteWithouParam)) {
        if (
          user &&
          !validateRole(
            user[User.Role],
            dashboardSubViewOptions[actualRouteWithouParam as DashboardSubView].role
          )
        ) {
          setView(<ForbidenPermission />);
          return;
        }
        setView(
          dashboardSubViewOptions[actualRouteWithouParam as DashboardSubView]
            .compenent
        );

        return;
      }
    }
    if (routerPath === DashboardView.DASHBOAD) {
      // setView(
      //   user && user.role === UserRole.Producer ? <Producer /> : <h1>Outro ROLE</h1>
      // );
      switch (user && user.role) {
        case UserRole.Producer:
          setView(<Producer />);
          setLoading(false);
          return;

        case UserRole.Cooperative:
          setView(<Cooperative />);
          setLoading(false);
          return;

        case UserRole.Technician:
          setView(<Technician />);
          setLoading(false);
          return;

        case UserRole.Admin:
          setView(<Admin />);
          setLoading(false);
          return;

        case UserRole.GeneralAnalitic:
          setView(<Analitic />);
          setLoading(false);
          return;

        case UserRole.Root:
          setView(<Root />);
          setLoading(false);
          return;

        default:
          setView(<ForbidenPermission />);
          //   // handleLogout();
          return;
      }
    }

    if (Object.keys(dashboardOptions).includes(routerPath)) {
      setLoading(false);
      if (
        user &&
        !validateRole(
          user[User.Role],
          dashboardOptions[routerPath as DashboardView].roles
        )
      ) {
        setView(<ForbidenPermission />);
        return;
      }

      setView(dashboardOptions[routerPath as DashboardView].component);
      return;
    }

    setView(<h1>Pagina nao encontrada</h1>);
  }, [routerPath, user]);

  if (loading || loadingUser) return <Loading />;

  if (!permission) return <ForbidenPermission />;

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
          [classes.appBarShiftRight]: openRigth,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <Box
            display="flex"
            flexDirection="row"
            style={{ justifyContent: 'space-between', width: '100%' }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => {
                setOpen(!open);
              }}
              className={classes.hanburguerIcon}
            >
              {open ? <ArrowBack /> : <MenuIcon />}
            </IconButton>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => {
                setOpenRigth(openRigth);
              }}
              className={classes.hanburguerIcon}
            />
          </Box>
          <LoggedUser />
        </Toolbar>
      </AppBar>

      <DrawerLeft open={open} />

      <main className={classes.content}>
        <Container>
          <div className={classes.toolbar} />
          {children || View}
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
