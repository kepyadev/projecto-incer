import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, InputAdornment, TextField } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';

import ErrorFail from '../../../../components/error-fail';
import SnackMessage from '../../../../components/snack-message';
import { User } from '../../../../constants/user';
import useAsyncState from '../../../../hooks/use-async-state';
import { resetPasswordUpdate } from '../../../../services/auth';
import useStyles from './form.styles';
import validationSchema from './form.validation';

interface IForgotFormUpdate {}
const ForgotFormUpdate: FC<IForgotFormUpdate> = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { snackMessage, setSnackMessage } = useAsyncState();
  const [token, setToken] = useState<string | null>(null);

  const { search } = useLocation();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    setToken(new URLSearchParams(search).get('token'));
  }, []);

  const onSubmit = handleSubmit<{ password: string }>(data => {
    resetPasswordUpdate(data.password, token!)
      .then(() => {
        setSnackMessage({ isError: false, message: 'Palavra passe recuperada!' });
        history.push('/login');
      })
      .catch(() => {
        setSnackMessage({
          isError: true,
          message: 'lamentamos, não foi possível recuperar a sua Palavra passe!',
        });
      });
  });

  if (!token) return <ErrorFail text="Link de recuperação inválido" />;

  return (
    <form className={classes.root} onSubmit={onSubmit}>
      {snackMessage && (
        <SnackMessage
          snackMessage={snackMessage}
          handleClose={() => {
            setSnackMessage(null);
          }}
        />
      )}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item xs={12}>
          <TextField
            name={User.Password}
            type="password"
            placeholder="Palavra passe"
            variant="outlined"
            inputRef={register()}
            fullWidth
            error={!!errors[User.Password]}
            helperText={errors[User.Password]?.message}
            InputProps={{
              role: 'textbox',
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name={User.ConfirmPassword}
            type="password"
            placeholder="Confirme a Palavra passe"
            variant="outlined"
            inputRef={register()}
            fullWidth
            error={!!errors[User.ConfirmPassword]}
            helperText={errors[User.ConfirmPassword]?.message}
            InputProps={{
              role: 'textbox',
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={onSubmit}
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
            fullWidth
          >
            Salvar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default ForgotFormUpdate;
