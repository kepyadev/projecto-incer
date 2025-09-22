/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-redundant-roles */
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { v4 } from 'uuid';

import {
  Cooperative,
  County,
  Producer,
  Province,
} from '../../../../constants/entities';
import ROUTES from '../../../../constants/routes';
import { ContactInformation } from '../../../../constants/sub-entites';
import { User } from '../../../../constants/user';
import { AuthContext, AuthContextData } from '../../../../context/auth';
import useAsyncState from '../../../../hooks/use-async-state';
import { ICounty, IProvince } from '../../../../types';
import { Roles, UserRole } from '../../../../types/user';
import useStyles from './form.styles';
import validationSchema, { SignupFormData } from './form.validation';
import getAllProvinces from '../../../../services/province';

const SignupForm: FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const roles = Roles;
  const [agreement, setAgreement] = useState<boolean>(false);
  const {
    errors,
    handleSubmit,
    watch,
    control,
  } = useForm<SignupFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      [User.Role]: UserRole.Producer,
      [Producer.isProducer]: 'single',
      [Cooperative.isCooperative]: 'cooperative',
      [User.FirstName]: '',
      [User.LastName]: '',
      [User.Email]: '',
      [User.Phone]: '',
      [User.Password]: '',
      [User.ConfirmPassword]: '',
    },
  });

  const [provinces, setProvinces] = useState<IProvince[]>();

  const [province, setProvince] = useState<string>();
  const [county, setCounty] = useState<string>();

  const role = watch(User.Role, UserRole.Producer);
  const producerType = watch(Producer.isProducer, 'single');

  const { setLoading, error, setError, setSuccess } = useAsyncState();
  const { handleSingup } = useContext(AuthContext) as AuthContextData;
  const [countys, setCountys] = useState<ICounty[]>();

  const handleChangeProvince = (value: any) => {
    setProvince(value.target.value);
    const pro = findProvince(provinces, value.target.value);
    setCountys(pro?.countys);
  };
  const handleChangeCounty = (value: any) => {
    setCounty(value.target.value);
  };

  useEffect(() => {
    getAllProvinces()
      .then(response => {
        setProvinces(response.data?.payload.data);
      })
      .catch(() => {
        setError(new Error('Lamentamos, ocorreu um erro ao carregar as provincias'));
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const findProvince = (
    allProvinces: IProvince[] | undefined,
    provinceId: string
  ): IProvince | undefined => {
    return allProvinces?.filter(provinceItem => {
      return provinceItem[Province.Id] === provinceId;
    })[0];
  };

  const findCounty = (
    allCountys: ICounty[] | undefined,
    countyId: string
  ): ICounty | undefined => {
    return allCountys?.filter(countyItem => {
      return countyItem[County.Id] === countyId;
    })[0];
  };

  const onSubmit = handleSubmit<SignupFormData>(data => {
    setLoading(true);

    const selectedProvince = findProvince(provinces!, province!);
    const selectedCounty = findCounty(selectedProvince?.countys, county!);

    // Validação de província e município
    if (!province || !county) {
      setError(
        new Error(
          'Por favor, selecione uma província e um município para continuar.'
        )
      );
      setLoading(false);
      return;
    }

    // Validação dos Termos e Condições
    if (!agreement) {
      setError(new Error('Para concluir o cadastro, aceite os termos e condições.'));
      setLoading(false);
      return;
    }

    // Informações específicas baseadas no tipo de usuário
    const especificInformation =
      role === UserRole.Producer
        ? {
            [Producer.Nif]: data[Producer.Nif],
            [Producer.CompanyName]: data[Producer.CompanyName],
            [Producer.isProducer]: data[Producer.isProducer],
            [Producer.County]: selectedCounty,
          }
        : {
            [Cooperative.Contact]: {
              [ContactInformation.Phone]: data[User.Phone],
              [ContactInformation.Email]: data[User.Email],
            },
            [Cooperative.Nif]: data[Producer.Nif],
            [Cooperative.Description]: data[User.FirstName],
            [Cooperative.County]: selectedCounty,
            [Cooperative.Presindet]: data[Cooperative.Presindet],
            [Cooperative.isCooperative]: data[Cooperative.isCooperative] === 'cooperative',
          };

    // Envio do formulário
    try {
      handleSingup({
        user: {
          [User.FirstName]: data[User.FirstName],
          [User.LastName]: data[User.LastName] || data[User.FirstName],
          [User.Email]: data[User.Email],
          [User.Phone]: Number(data[User.Phone]),
          [User.Password]: data[User.Password],
          [User.Role]: role, // Garante que o 'topo singular' seja usado
          [User.County]: selectedCounty![County.Id],
          [User.ImageUrl]: '', // valor padrão obrigatório
        },
        especific_information: especificInformation,
      })
        .then(() => {
          setSuccess(true);
          // window.location.reload();
        })
        .catch(erro => {
          setError(new Error(`${erro.message}`));
        });
    } catch (erro: any) {
      setError(new Error(`${erro.message}`));
    }

    setLoading(false);
  });

  const handleChangeAgreement = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreement(event.target.checked);
  };

  // if (loading)
  //   return (
  //     <Container>
  //       <CircularProgress size={240} />
  //     </Container>
  //   );

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

        <Grid item xs={12}>
          <FormControl variant="outlined" style={{ width: '100%' }}>
            <Controller
              name={User.Role}
              control={control}
              defaultValue={UserRole.Producer}
              render={(props) => (
                <Select {...props} label="Tipo de conta" fullWidth>
                  {roles.map(roleValue => (
                    <MenuItem value={roleValue.value} key={v4()}>
                      {roleValue.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <InputLabel shrink id="account-type-label">
              Tipo de conta
            </InputLabel>
          </FormControl>
        </Grid>
        {role === UserRole.Producer && (
          <>
            <Grid xs={12} md={12}>
              <FormControl
                style={{ textAlign: 'center', width: '100%', color: 'black' }}
              >
                <FormLabel
                  id={`demo-row-radio-buttons-group-label-${v4()}`}
                  style={{
                    color: '#ffffff',
                  }}
                >
                  Escolha um tipo de produtor
                </FormLabel>
                <Controller
                  name={Producer.isProducer}
                  control={control}
                  defaultValue="single"
                  render={(props) => (
                    <RadioGroup {...props} row style={{ justifyContent: 'center' }}>
                      <FormControlLabel
                        value="single"
                        control={<Radio />}
                        label="Singular"
                      />
                      <FormControlLabel
                        value="business"
                        control={<Radio />}
                        label="Empresa"
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>
          </>
        )}

        {role === UserRole.Cooperative && (
          <>
            <Grid xs={12} md={12}>
              <FormControl
                style={{ textAlign: 'center', width: '100%', color: 'black' }}
              >
                <FormLabel
                  style={{
                    color: '#ffffff',
                  }}
                  id={`demo-row-radio-buttons-group-label-${v4()}`}
                >
                  Escolha um tipo de entidade
                </FormLabel>
                <Controller
                  name={Cooperative.isCooperative}
                  control={control}
                  defaultValue="cooperative"
                  render={(props) => (
                    <RadioGroup {...props} row style={{ justifyContent: 'center' }}>
                      <FormControlLabel
                        value="cooperative"
                        control={<Radio />}
                        label="Cooperativa"
                      />
                      <FormControlLabel
                        value="assoc"
                        control={<Radio />}
                        label="Associação"
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>
          </>
        )}

        {producerType === 'business' && (
          <Grid item md={12} xs={12} sm={6}>
            <Controller
              name={Producer.CompanyName}
              control={control}
              render={props => (
                <TextField
                  {...props}
                  placeholder="Nome da empresa"
                  variant="outlined"
                  fullWidth
                  error={!!errors[Producer.CompanyName]}
                  helperText={errors[Producer.CompanyName]?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        )}
        <Grid item sm={role === UserRole.Producer ? 6 : 12} xs={12}>
          <Controller
            name={User.FirstName}
            control={control}
            render={props => (
              <TextField
                {...props}
                placeholder="Nome"
                variant="outlined"
                fullWidth
                error={!!errors[User.FirstName]}
                helperText={errors[User.FirstName]?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        {role === UserRole.Producer && (
          <Grid item md={6} xs={12} sm={6}>
            <Controller
              name={User.LastName}
              control={control}
              render={props => (
                <TextField
                  {...props}
                  placeholder="Apelido"
                  variant="outlined"
                  required
                  fullWidth
                  error={!!errors[User.LastName]}
                  helperText={errors[User.LastName]?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Controller
            name={Producer.Nif}
            control={control}
            render={props => (
              <TextField
                {...props}
                placeholder="NIF"
                variant="outlined"
                fullWidth
                error={!!errors[Producer.Nif]}
                helperText={errors[Producer.Nif]?.message}
              />
            )}
          />
        </Grid>

        <Grid item md={12} sm={6} xs={12}>
          <Controller
            name={User.Email}
            control={control}
            render={props => (
              <TextField
                {...props}
                type="email"
                placeholder="E-mail"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                error={!!errors[User.Email]}
                helperText={errors[User.Email]?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Controller
            name={User.Phone}
            control={control}
            render={props => (
              <TextField
                {...props}
                placeholder="Telefone"
                variant="outlined"
                InputProps={{
                  inputProps: {
                    maxLength: 9,
                  },
                  role: 'textbox',
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                error={!!errors[User.Phone]}
                helperText={errors[User.Phone]?.message}
                type="tel"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name={User.Password}
            control={control}
            render={props => (
              <TextField
                {...props}
                type="password"
                placeholder="Palavra passe"
                variant="outlined"
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
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name={User.ConfirmPassword}
            control={control}
            render={props => (
              <TextField
                {...props}
                type="password"
                placeholder="Confirme a Palavra passe"
                variant="outlined"
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
            )}
          />
        </Grid>
        {role === UserRole.Cooperative && (
          <Grid item md={12} sm={12} xs={12}>
            <Controller
              name={Cooperative.Presindet}
              control={control}
              render={props => (
                <TextField
                  {...props}
                  placeholder="Presidente"
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors[Cooperative.Presindet]}
                  helperText={errors[Cooperative.Presindet]?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        )}

        <Grid item md={6} sm={6} xs={12}>
          <FormControl variant="outlined" style={{ width: '100%' }}>
            <InputLabel id="province-label">Província</InputLabel>
            <Select
              name="province"
              labelId="province-label"
              id="province"
              value={province}
              onChange={handleChangeProvince}
              fullWidth
              label="Província"
            >
              <MenuItem value={undefined} key={v4()}>
                Selecione uma provínvia
              </MenuItem>
              {provinces &&
                provinces.map(provinceItem => {
                  return (
                    <MenuItem value={provinceItem[Province.Id]} key={v4()}>
                      {provinceItem[Province.Description]}
                    </MenuItem>
                  );
                })}
            </Select>
            {!province && (
              <FormHelperText style={{ color: '#ff0000' }}>
                Por favor selecione uma província
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <FormControl variant="outlined" style={{ width: '100%' }}>
            <InputLabel id="county-label">Município</InputLabel>
            <Select
              labelId="county-label"
              id="county"
              value={county}
              onChange={handleChangeCounty}
              fullWidth
              label="Município"
              name="municipio"
              disabled={!countys}
            >
              <MenuItem value={undefined} key={v4()}>
                Selecione um município
              </MenuItem>
              {countys &&
                countys.map(countyItem => {
                  return (
                    <MenuItem value={countyItem[County.Id]} key={v4()}>
                      {countyItem[County.Description]}
                    </MenuItem>
                  );
                })}
            </Select>
            {!county && (
              <FormHelperText style={{ color: '#ff0000' }}>
                Por favor selecione um município
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreement}
                onChange={handleChangeAgreement}
                name="agreement"
                color="primary"
              />
            }
            label="Ao se cadastrar estara a concordar com os termos e condições"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="button"
            onClick={onSubmit}
            variant="contained"
            color="primary"
            disableElevation
            fullWidth
            name="register"
          >
            Registrar
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            name="entrar"
            fullWidth
            onClick={() => history.push(ROUTES.LOGIN)}
            style={{ flex: 1 }}
          >
            Entrar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignupForm;
