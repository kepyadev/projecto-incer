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
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';
import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import Loading from '../../../../../../../../../components/Loading';
import SnackMessage from '../../../../../../../../../components/snack-message';
import {
  Cooperative,
  County,
  Producer,
  Province,
} from '../../../../../../../../../constants/entities';
import { User } from '../../../../../../../../../constants/user';
import useAsyncState from '../../../../../../../../../hooks/use-async-state';
import { addNewProducer } from '../../../../../../../../../services/cooperative';
import getAllProvinces from '../../../../../../../../../services/province';
import { ICounty, IProvince } from '../../../../../../../../../types';
import { ProducerDTO } from '../../../../../../../../../types/producer';
import { UserRole } from '../../../../../../../../../types/user';
import { getCooperativeLogged } from '../../../../../../../../../utils';
import validationSchema from './add-new.validation';

interface IAddNewProducer {
  modalHandleClose: () => void;
}

type ProducerType = 'single' | 'business' | 'foreign';

const AddNewProducer: FC<IAddNewProducer> = ({ modalHandleClose }) => {
  const { control, errors, register, handleSubmit, watch, setValue } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      [Producer.isProducer]: 'single' as ProducerType,
      [User.Role]: UserRole.Producer,
    },
  });

  const { setSnackMessage, snackMessage, loading, setLoading } = useAsyncState();
  const [provinces, setProvinces] = useState<IProvince[]>();
  const [county, setCounty] = useState<string>();

  const [countys, setCountys] = useState<ICounty[]>();

  const [province, setProvince] = useState<string>();
  const producerType = watch(Producer.isProducer);
  const userRole = watch(User.Role);

  useEffect(() => {
    const loadProvinces = async () => {
      try {
        setLoading(true);
        const response = await getAllProvinces();
        setProvinces(response.data?.payload.data);
      } catch (error) {
        setSnackMessage({
          isError: true,
          message: 'Erro ao carregar províncias',
        });
      } finally {
        setLoading(false);
      }
    };

    loadProvinces();
  }, [setLoading, setSnackMessage]);

  const handleChangeProvince = (value: any) => {
    setProvince(value.target.value);
    const pro = findProvince(provinces, value.target.value);
    setCountys(pro?.countys);
  };

  const handleChangeCounty = (value: any) => {
    setCounty(value.target.value);
  };

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
    // Clear NIF when changing producer type
    setValue(Producer.Nif, '');
  };

  const onSubmit = async (data: any) => {
    if (!county) {
      setSnackMessage({
        isError: true,
        message: 'Por favor, selecione um município',
      });
      return;
    }

    const cooperative = getCooperativeLogged();
    if (!cooperative) {
      setSnackMessage({
        isError: true,
        message: 'Cooperativa inválida',
      });
      return;
    }

    try {
      setLoading(true);
      const producerData: ProducerDTO = {
        [Producer.Nif]: data[Producer.Nif],
        [Producer.CompanyName]: data[Producer.CompanyName],
        [Producer.isProducer]: data[Producer.isProducer],
        [Producer.County]: county,
        [Producer.Cooperative]: cooperative[Cooperative.Id],
        [Producer.User]: {
          [User.FirstName]: data[User.FirstName],
          [User.LastName]: data[User.LastName],
          [User.Email]: data[User.Email],
          [User.Phone]: data[User.Phone],
          [User.Role]: UserRole.Producer,
          [User.County]: county,
        },
      };

      await addNewProducer(producerData, cooperative[Cooperative.Id]);
      setSnackMessage({
        isError: false,
        message: 'Produtor vinculado com sucesso',
      });
      modalHandleClose();
    } catch (error: any) {
      setSnackMessage({
        isError: true,
        message: error.message || 'Erro ao vincular produtor',
      });
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {snackMessage && (
        <SnackMessage
          snackMessage={snackMessage}
          handleClose={() => setSnackMessage(null)}
        />
      )}

      <Grid container spacing={2}>
        {/* Producer Type Selection */}
        {userRole === UserRole.Producer && (
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
        )}

        {/* Company Name - Only for Business */}
        {producerType === 'business' && (
          <Grid item xs={12}>
            <TextField
              name={Producer.CompanyName}
              placeholder="Nome da empresa"
              variant="outlined"
              fullWidth
              inputRef={register}
              error={!!errors[Producer.CompanyName]}
              helperText={errors[Producer.CompanyName]?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        )}

        {/* Personal Information */}
        <Grid item xs={12} md={6}>
          <TextField
            name={User.FirstName}
            placeholder="Primeiro nome"
            variant="outlined"
            fullWidth
            inputRef={register}
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

        <Grid item xs={12} md={6}>
          <TextField
            name={User.LastName}
            placeholder="Último nome"
            variant="outlined"
            fullWidth
            inputRef={register}
            error={!!errors[User.LastName]}
            helperText={errors[User.LastName]?.message}
          />
        </Grid>

        {/* NIF Field */}
        <Grid item xs={12}>
          <TextField
            name={Producer.Nif}
            placeholder={getNIFPlaceholder()}
            variant="outlined"
            fullWidth
            inputRef={register}
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

        <Grid item xs={6}>
          <TextField
            name={User.Email}
            placeholder="E-mail"
            type="email"
            variant="outlined"
            fullWidth
            inputRef={register}
            error={!!errors[User.Email]}
            helperText={errors[User.Email]?.message}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            name={User.Phone}
            placeholder="Telefone"
            type="tel"
            variant="outlined"
            fullWidth
            inputRef={register}
            error={!!errors[User.Phone]}
            helperText={errors[User.Phone]?.message}
            inputProps={{
              maxLength: 9,
            }}
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddNewProducer;
