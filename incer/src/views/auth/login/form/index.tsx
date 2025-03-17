import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Checkbox,
  Grid,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Loading from '../../../../components/Loading';
import ROUTES from '../../../../constants/routes';
import { AuthContext, AuthContextData } from '../../../../context/auth';
import useAsyncState from '../../../../hooks/use-async-state';
import { LoginFormData } from '../login.types';
import useStyles from './form.styles';
import validationSchema from './form.validation';

const LoginForm = () => {
  const { loading, setLoading, success, setSuccess, error, setError } =
    useAsyncState();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const history = useHistory();
  const { handleLogin } = useContext(AuthContext) as AuthContextData;

  useEffect(() => {
    setError(null);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();

  const handleSignupClick = () => {
    history.push(ROUTES.REGISTER);
  };

  const onSubmit = handleSubmit<LoginFormData>(data => {
    setLoading(true);
    try {
      handleLogin(data)
        .then(() => {
          setSuccess(true);
        })
        .catch(erro => {
          setError(new Error(`${erro.message}`));
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (erro) {
      setError(
        new Error('lamentamos ocorreu algum erro, por favor tente novamente!')
      );
    }
  });

  return (
    <form className={classes.root} onSubmit={onSubmit}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
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
            <Alert severity="error">
              <AlertTitle>Sucesso</AlertTitle>
              Credenciais aceites
            </Alert>
          </Grid>
        )}

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
          <TextField
            name="password"
            type="password"
            label="Palavra passe"
            variant="outlined"
            InputProps={{
              role: 'textbox',
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            inputRef={register()}
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container justifyContent="space-between" alignContent="center">
            <Grid item xs={12} md={6} sm={6} className={classes.rememberMe}>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'Lembrar' }}
                  />
                }
                label="Lembrar"
              />
            </Grid>
            <Grid item xs={12} md={6} sm={6} className={classes.forgetPassword}>
              <a href="/forgot-password" className={classes.link}>
                Esqueci-me da palavra passe
              </a>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={onSubmit}
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
            fullWidth
            disabled={loading}
          >
            {loading ? <Loading /> : 'Entrar'}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={handleSignupClick}
            variant="contained"
            color="secondary"
            disableElevation
            fullWidth
            name="register"
          >
            Registrar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
