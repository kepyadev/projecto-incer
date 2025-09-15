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
import { useForm } from 'react-hook-form';
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
import validationSchema from './form.validation';
import { SignupFormData } from './signup.types';
import getAllProvinces from '../../../../services/province';

const SignupForm: FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const roles = Roles;
  const [agreement, setAgreement] = useState<boolean>(false);
  const [role, setRole] = useState<UserRole>(UserRole.Producer);
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [provinces, setProvinces] = useState<IProvince[]>();
  const [countys, setCountys] = useState<ICounty[]>();
  const [isCooperative, setIsCooperative] = useState<'cooperative' | 'assoc'>(
    'cooperative'
  );
  const [isProducer, setIsProducer] = useState<'bussiness' | 'single'>('single');

  const [province, setProvince] = useState<string>();
  const [county, setCounty] = useState<string>();

  const { setLoading, error, setError, setSuccess } = useAsyncState();
  const { handleSingup } = useContext(AuthContext) as AuthContextData;

  const handleChangeProvince = (value: any) => {
    setProvince(value.target.value);
    const pro = findProvince(provinces, value.target.value);
    setCountys(pro?.countys);
  };
  const handleChangeCounty = (value: any) => {
    setCounty(value.target.value);
    // const coun = findCounty(countys, value.target.value);
  };

  const handleChangeCooperative = (value: any) => {
    setIsCooperative(value.target.value);
  };

  const handleChangeProducer = (value: any) => {
    setIsProducer(value.target.value);
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
    // Garante que 'topo singular' seja sempre ativo
    const activeRole = role || UserRole.Producer;

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
      activeRole === UserRole.Producer
        ? {
            [Producer.Nif]: data[Producer.Nif],
            [Producer.CompanyName]: data[Producer.CompanyName],
            [Producer.isProducer]: isProducer,
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
            [Cooperative.isCooperative]: isCooperative === 'cooperative',
          };

    // Envio do formulário
    try {
      handleSingup({
        user: {
          [User.FirstName]: data[User.FirstName],
          [User.LastName]: data[User.LastName] || data[User.FirstName],
          [User.Email]: data[User.Email],
          [User.Phone]: data[User.Phone],
          [User.Password]: data[User.Password],
          [User.Role]: activeRole, // Garante que o 'topo singular' seja usado
          [User.County]: selectedCounty![County.Id],
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

  const handleChangeRole = (event: any) => {
    setRole(event.target.value as UserRole);
  };

  const handleChangeAgreement = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreement(event.target.checked);
  };

  // if (loading)
  //   return (
  //     <Container>
  //       <CircularProgress size={240} />
  //     </Container>
  //   );

  const onChange = (value: any) => {
    console.log(value);
  };
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
            <InputLabel id="account-type-label">Tipo de conta</InputLabel>
            <Select
              labelId="account-type-label"
              id="account-type"
              value={role}
              defaultValue={UserRole.Producer}
              onChange={handleChangeRole}
              placeholder="Tipo de conta"
              fullWidth
            >
              {roles.map(roleValue => (
                <MenuItem value={roleValue.value} key={v4()}>
                  {roleValue.label}
                </MenuItem>
              ))}
            </Select>
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
                <RadioGroup
                  style={{ textAlign: 'center', width: '100%' }}
                  row
                  aria-labelledby={`demo-row-radio-buttons-group-label-${v4()}`}
                  name={Producer.isProducer}
                  onChange={handleChangeProducer}
                >
                  <FormControlLabel
                    value="single"
                    control={<Radio />}
                    label="Singular"
                  />
                  <FormControlLabel
                    value="bussiness"
                    control={<Radio />}
                    label="Empresa"
                  />
                </RadioGroup>
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
                <RadioGroup
                  row
                  aria-labelledby={`demo-row-radio-buttons-group-label-${v4()}`}
                  name={Cooperative.isCooperative}
                  onChange={handleChangeCooperative}
                >
                  <FormControlLabel
                    value="cooperative"
                    control={<Radio />}
                    label="Cooperativa"
                  />
                  <FormControlLabel
                    value="assoc"
                    control={<Radio />}
                    label="Associaçāo"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </>
        )}

        {isProducer === 'bussiness' && (
          <Grid item md={12} xs={12} sm={6}>
            <TextField
              name={Producer.CompanyName}
              placeholder="Nome da empresa"
              variant="outlined"
              inputRef={register()}
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
          </Grid>
        )}
        <Grid item sm={role === UserRole.Producer ? 6 : 12} xs={12}>
          <TextField
            name={User.FirstName}
            placeholder="Nome"
            variant="outlined"
            inputRef={register()}
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
        </Grid>
        {role === UserRole.Producer && (
          <Grid item md={6} xs={12} sm={6}>
            <TextField
              name={User.LastName}
              placeholder="Apelido"
              variant="outlined"
              inputRef={register()}
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
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            name={Producer.Nif}
            placeholder="NIF"
            variant="outlined"
            inputRef={register()}
            fullWidth
            error={!!errors[Producer.Nif]}
            helperText={errors[Producer.Nif]?.message}
          />
        </Grid>

        <Grid item md={12} sm={6} xs={12}>
          <TextField
            name={User.Email}
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
            inputRef={register()}
            fullWidth
            error={!!errors[User.Email]}
            helperText={errors[User.Email]?.message}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            name={User.Phone}
            placeholder="Telefone"
            variant="outlined"
            InputProps={{
              inputProps: {
                maxLength: 9,
              }, // Limite máximo para navegadores que suportam
              role: 'textbox',
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
            onChange={e => {
              const newValue = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
              if (newValue.length <= 9) {
                onChange(newValue); // Permite apenas até 9 números
              }
            }}
            inputRef={register({ maxLength: 9 })}
            fullWidth
            error={!!errors[User.Phone]}
            helperText={errors[User.Phone]?.message}
            type="tel" // Melhor para números de telefone
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
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
        {role === UserRole.Cooperative && (
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              name={Cooperative.Presindet}
              placeholder="Presidente"
              variant="outlined"
              inputRef={register()}
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
