import React, { FC } from 'react';

import AuthLayout from '../../../components/auth-layout';
import useStyles from './forgot-password.styles';
import ForgotForm from './form';

interface IForgotPassword {}
const ForgotPassword: FC<IForgotPassword> = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AuthLayout title="Esqueceu a sua palavra passe?" isShownigLogo>
        <ForgotForm />
      </AuthLayout>
    </div>
  );
};
export default ForgotPassword;
