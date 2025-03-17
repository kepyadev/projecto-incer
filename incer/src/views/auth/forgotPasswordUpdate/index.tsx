import React, { FC } from 'react';

import AuthLayout from '../../../components/auth-layout';
import useStyles from './forgot-password-update.styles';
import ForgotFormUpdate from './form';

interface IForgotPasswordUpdate {}
const ForgotPasswordUpdate: FC<IForgotPasswordUpdate> = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AuthLayout title="Esqueceu a sua palavra passe?" isShownigLogo>
        <ForgotFormUpdate />
      </AuthLayout>
    </div>
  );
};
export default ForgotPasswordUpdate;
