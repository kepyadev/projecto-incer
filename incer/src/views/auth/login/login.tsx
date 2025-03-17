import React from 'react';

import AuthLayout from '../../../components/auth-layout';
import LoginForm from './form';
import useStyles from './login.styles';

const LoginScreen = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AuthLayout title="Login" isShownigLogo>
        <LoginForm />
      </AuthLayout>
    </div>
  );
};

export default LoginScreen;
