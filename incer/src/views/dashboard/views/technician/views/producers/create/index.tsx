import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import Loading from '../../../../../../../components/Loading';
import SnackMessage from '../../../../../../../components/snack-message';
import { County, Producer, Province } from '../../../../../../../constants/entities';
import { User } from '../../../../../../../constants/user';
import useAsyncState from '../../../../../../../hooks/use-async-state';
import getAllProvinces from '../../../../../../../services/province';
import { addNewProducerWithoutCooperativeTechnician } from '../../../../../../../services/technician';
import { ICounty, IProvince } from '../../../../../../../types';
import { UserRole } from '../../../../../../../types/user';
import validationSchema from './producer.validation';

type ProducerType = 'single' | 'business' | 'foreign';

interface IAddNewProducerTechnicianProps {
  onClose: () => void;
}
const AddNewProducerTechnician: FC<IAddNewProducerTechnicianProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  onClose,
}) => {
  const { errors, register, watch, control, setValue, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      [Producer.isProducer]: 'single' as ProducerType,
    },
  });
  const { setSnackMessage, snackMessage, loading, setLoading } = useAsyncState();
  const [provinces, setProvinces] = useState<IProvince[]>();
  const [province, setProvince] = useState<string>();
  const [county, setCounty] = useState<string>();
  const [countys, setCountys] = useState<ICounty[]>();

  const producerType = watch(Producer.isProducer);

  // const { user } = useContext(AuthContext) as AuthContextData;
  const handleChangeProvince = (value: any) => {
    setProvince(value.target.value);
    const pro = findProvince(provinces, value.target.value);
    setCountys(pro?.countys);
  };
  const handleChangeCounty = (value: any) => {
    setCounty(value.target.value);
    // const coun = findCounty(countys, value.target.value);
  };

  useEffect(() => {
    getAllProvinces()
      .then(response => {
        setProvinces(response.data?.payload.data);
      })
      .catch(() => {
        setSnackMessage({
          isError: true,
          message: 'Lamentamos, ocorreu um erro ao carregar as provincias',
        });
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

  const handleProducerTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Producer.isProducer, event.target.value as ProducerType);
    setValue(Producer.Nif, '');
  };

  const findCounty = (
    allCountys: ICounty[] | undefined,
    countyId: string
  ): ICounty | undefined => {
    return allCountys?.filter(countyItem => {
      return countyItem[County.Id] === countyId;
    })[0];
  };
  const onChange = (value: any) => {
    console.log(value);
  };
  const onSubmit = handleSubmit(data => {
    setLoading(true);

    const selectedProvince = findProvince(provinces!, province!);
    const selectedCounty = findCounty(selectedProvince?.countys, county!);

    if (!province || !county) {
      setSnackMessage({
        isError: true,
        message: 'Por favor, selecione uma província e um município para continuar.',
      });
      setLoading(false);
      return;
    }

    const producerData: any = {
      [Producer.Nif]: data[Producer.Nif],
      [Producer.CompanyName]: data[Producer.CompanyName],
      [Producer.Cooperative]: '',
      [Producer.County]: selectedCounty,
      [Producer.isProducer]: producerType,

      [Producer.User]: {
        [User.FirstName]: data[User.FirstName],
        [User.LastName]: data[User.LastName],
        [User.Email]: data[User.Email],
        [User.Phone]: data[User.Phone]! as unknown as number,
        [User.Role]: UserRole.Producer,
        [Producer.County]: selectedCounty,
      },
    };

    addNewProducerWithoutCooperativeTechnician(producerData)
      .then((_response: any) => {
        onClose();
        setSnackMessage({
          isError: false,
          message: `Produtor foi criado com sucesso!`,
        });
      })
      .catch((error: Error) => {
        setSnackMessage({
          isError: true,
          message: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  });

  const getNIFPlaceholder = () => {
    switch (producerType) {
      case 'business':
        return 'NIF Empresa (10 dígitos)';
      case 'foreign':
        return 'NIF Estrangeiro (9 dígitos)';
      default:
        return 'NIF Individual (formato: 000181960LA019)';
    }
  };

  if (loading) return <Loading />;
  console.log(producerType);
  return (
    <form onSubmit={onSubmit}>
      {snackMessage && (
        <SnackMessage
          snackMessage={snackMessage}
          handleClose={() => {
            setSnackMessage(null);
          }}
        />
      )}
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Tipo de Produtor
        </Typography>
        <Controller
          name={Producer.isProducer}
          control={control}
          render={({ field }: any) => (
            <RadioGroup
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...field}
              row
              onChange={handleProducerTypeChange}
              style={{ justifyContent: 'space-around' }}
            >
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
              <FormControlLabel
                value="foreign"
                control={<Radio />}
                label="Estrangeiro"
              />
            </RadioGroup>
          )}
        />
      </Grid>
      <Grid container spacing={2}>
        {producerType === 'business' && (
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
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            placeholder="Primeiro nome"
            variant="outlined"
            required
            fullWidth
            inputRef={register()}
            name={User.FirstName}
            error={!!errors[User.FirstName]}
            helperText={errors[User.FirstName]?.message}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            placeholder="Último nome"
            required
            variant="outlined"
            fullWidth
            inputRef={register()}
            name={User.LastName}
            error={!!errors[User.LastName]}
            helperText={errors[User.LastName]?.message}
          />
        </Grid>
        {/* <Grid item md={6} sm={12} xs={12}>
          <TextField
            placeholder="Nº de bilhete de indentidade"
            variant="outlined"
            fullWidth
            inputRef={register()}
            name={Producer.Bi}
            error={!!errors[Producer.Bi]}
            helperText={errors[Producer.Bi]?.message}
          />
        </Grid> */}
        <Grid item md={12} sm={12} xs={12}>
          <TextField
            placeholder={getNIFPlaceholder()}
            variant="outlined"
            fullWidth
            inputRef={register()}
            name={Producer.Nif}
            error={!!errors[Producer.Nif]}
            helperText={errors[Producer.Nif]?.message}
          />
        </Grid>
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
                Por favor selecione uma provínvia
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
            {!countys && (
              <FormHelperText style={{ color: '#ff0000' }}>
                Por favor selecione um município
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item md={12} sm={12} xs={12}>
          <TextField
            placeholder="E-mail"
            variant="outlined"
            fullWidth
            inputRef={register()}
            name={User.Email}
            error={!!errors[User.Email]}
            helperText={errors[User.Email]?.message}
            type="email"
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <TextField
            placeholder="Telefone"
            variant="outlined"
            fullWidth
            name={User.Phone}
            error={!!errors[User.Phone]}
            helperText={errors[User.Phone]?.message}
            type="tel"
            InputProps={{
              inputProps: {
                maxLength: 9,
              }, // Limite máximo para navegadores que suportam
            }}
            onChange={e => {
              const newValue = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
              if (newValue.length <= 9) {
                onChange(newValue); // Permite apenas até 9 números
              }
            }}
            inputRef={register({ maxLength: 9 })}
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            style={{
              justifyItems: 'flex-end',
              marginTop: '15px',
              padding: '15px 10px',
            }}
          >
            {/* <Button variant="text" color="primary" onClick={() => onClose()}>
              Cancelar
            </Button> */}
            <Button variant="contained" color="primary" type="submit">
              Salvar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddNewProducerTechnician;
function setError(arg0: Error) {
  throw new Error('Function not implemented.', arg0);
}
