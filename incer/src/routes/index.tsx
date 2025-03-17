import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ROUTES from '../constants/routes';
import { AuthContext, AuthContextData } from '../context/auth';
import ForgotPassword from '../views/auth/forgotPassword';
import ForgotPasswordUpdate from '../views/auth/forgotPasswordUpdate';
import LoginScreen from '../views/auth/login/login';
import SignupScreen from '../views/auth/signup';
import Dashboard from '../views/dashboard';
import FazendasView from '../views/dashboard/views/producer/views/fazendas';
import Site from '../views/site';
import Consumption from '../views/site/pages/consumption';
import MarketPrices from '../views/site/pages/market-prices';
import NationalProduction from '../views/site/pages/national-production';

export const Routes = () => {
  const { authenticated } = React.useContext(AuthContext) as AuthContextData;

  return (
    <Switch>
      <AuthRoute
        exact
        path={ROUTES.HOME}
        component={Site}
        isAuthenticated={authenticated}
      />
      <AuthRoute
        exact
        path={ROUTES.NATIONAL_PRODUCTION}
        component={NationalProduction}
      />
      <AuthRoute exact path={ROUTES.CONSUMPTION} component={Consumption} />
      <AuthRoute exact path={ROUTES.MARKET_PRICES} component={MarketPrices} />
      <AuthRoute
        exact
        path={ROUTES.LOGIN}
        component={LoginScreen}
        isAuthenticated={authenticated}
      />
      <AuthRoute
        exact
        path={ROUTES.REGISTER}
        component={SignupScreen}
        isAuthenticated={authenticated}
      />
      <AuthRoute
        exact
        path={ROUTES.FORGOTPASSWORD}
        component={ForgotPassword}
        isAuthenticated={authenticated}
      />
      <AuthRoute
        exact
        path={ROUTES.FORGOTPASSWORD_UPDATE}
        component={ForgotPasswordUpdate}
        isAuthenticated={authenticated}
      />
      <ProtectedRoute
        path={ROUTES.DASHBOARD}
        component={Dashboard}
        isAuthenticated={authenticated}
      />
      <ProtectedRoute
        path={`${ROUTES.DASHBOARD}/:id`}
        component={FazendasView}
        isAuthenticated={authenticated}
      />
    </Switch>
  );
};

const AuthRoute = ({ component, isAuthenticated, ...rest }: any) => {
  const routeComponent = (props: any) =>
    !isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: ROUTES.DASHBOARD }} />
    );
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} render={routeComponent} />;
};

export const ProtectedRoute = ({ component, isAuthenticated, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: ROUTES.LOGIN }} />
    );
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} render={routeComponent} />;
};
