import React from 'react';

import AuthLayout from '../../../components/auth-layout';
import SignupForm from './form';
import useStyles from './signup.styles';

const SignupScreen = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AuthLayout title="Registo" isShownigLogo>
        <SignupForm />
      </AuthLayout>
    </div>
  );
};

export default SignupScreen;
