import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, InputAdornment, TextField } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import useAsyncState from '../../../../hooks/use-async-state';
import { resetPassword } from '../../../../services/auth';
import useStyles from './form.styles';
import validationSchema from './form.validation';

interface IForgotForm {}
const ForgotForm: FC<IForgotForm> = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { error, setError, success, setSuccess } = useAsyncState();

  const onSubmit = handleSubmit<{ email: string }>(data => {
    setError(null);
    setSuccess(false);

    resetPassword(data.email)
      .then(() => {
        setSuccess(true);
      })
      .catch(err => {
        setError(Error(err.msg || err.message || err.error));
      });
  });

  const classes = useStyles();
  return (
    <form className={classes.root} onSubmit={onSubmit}>
      {error && (
        <Grid item xs={12}>
          <Alert severity="error">
            <AlertTitle>Erro</AlertTitle>
            {error.message}
          </Alert>
        </Grid>
      )}

      {success && (
        <Grid item xs={12}>
          <Alert severity="success">
            <AlertTitle>Sucesso</AlertTitle>
            Foi enviado para o seu e-mail com o link de recuperação.
          </Alert>
        </Grid>
      )}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
        style={{ marginTop: '8px' }}
      >
        <Grid item xs={12}>
          <TextField
            name="email"
            type="text"
            label="E-mail"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            inputRef={register()}
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
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
            Recuperar senha
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default ForgotForm;
