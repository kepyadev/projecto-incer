import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import ErrorFail from '../../../../../../../components/error-fail';
import Loading from '../../../../../../../components/Loading';
import SnackMessage from '../../../../../../../components/snack-message';
import {
  Cooperative,
  County,
  Province,
} from '../../../../../../../constants/entities';
import { ContactInformation } from '../../../../../../../constants/sub-entites';
import { User } from '../../../../../../../constants/user';
import useAsyncState from '../../../../../../../hooks/use-async-state';
import { createCooperative } from '../../../../../../../services/cooperative';
import { getAllProvinces } from '../../../../../../../services/province';
import { IContactInformation, ICounty, IProvince } from '../../../../../../../types';
import { ICooperativeDTO } from '../../../../../../../types/cooperative';
import { CreateCooperativeAdminProps } from './create.types';
import validationSchema from './create.validation';

type CooperativeType = 'cooperative' | 'assoc';

const CreateCooperativeTechnician: FC<CreateCooperativeAdminProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  onCancel,
}) => {
  const [provinces, setProvinces] = useState<IProvince[]>();
  const [countys, setCountys] = useState<ICounty[]>();

  const [province, setProvince] = useState<string>();
  const [county, setCounty] = useState<string>();

  const { errors, register, setValue, watch, control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      [Cooperative.isCooperative]: 'cooperative' as CooperativeType,
    },
  });

  const cooperativeType = watch(Cooperative.isCooperative);
  const { loading, setLoading, error, setError } = useAsyncState();

  useEffect(() => {
    setLoading(true);
    getAllProvinces()
      .then(response => {
        setProvinces(response.data?.payload.data);
      })
      .catch(() => {
        setError(
          Error('Lamentamos, ocorreu um erro ao carregar as províncias e município')
        );
      })
      .finally(() => {
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeProvince = (value: any) => {
    setProvince(value.target.value);
    const pro = findProvince(provinces, value.target.value);
    setCountys(pro?.countys);
  };

  const handleChangeCounty = (value: any) => {
    setCounty(value.target.value);
  };

  const handleChangeCooperative = (event: any) => {
    setValue(Cooperative.isCooperative, event.target.value as CooperativeType);
  };

  const findProvince = (
    allProvinces: IProvince[] | undefined,
    provinceId: string
  ): IProvince | undefined => {
    return allProvinces?.filter(provinceItem => {
      return provinceItem[Province.Id] === provinceId;
    })[0];
  };

  const { setSnackMessage, snackMessage } = useAsyncState();

  const onSubmit = handleSubmit(data => {
    if (!county) {
      setSnackMessage({
        isError: true,
        message: 'Por favor, selecione o município onde se encontra a cooperativa',
      });
    }
    const contact: IContactInformation = {
      [ContactInformation.Email]: data[ContactInformation.Email],
      [ContactInformation.Phone]: data[
        ContactInformation.Phone
      ] as unknown as number,
    };

    const cooperativeDTO: ICooperativeDTO = {
      [Cooperative.Description]: data[Cooperative.Description],
      [Cooperative.Presindet]: data[Cooperative.Presindet],
      [Cooperative.Address]: data[Cooperative.Address],
      [Cooperative.Nif]: data[Cooperative.Nif],
      [Cooperative.Contact]: contact,
      [Cooperative.County]: county!,
      [Cooperative.isCooperative]: cooperativeType === 'cooperative',
    };

    setLoading(true);
    createCooperative(cooperativeDTO)
      .then(() => {
        setSnackMessage({ isError: false, message: 'Cooperativa cadastrada!' });
        onCancel();
      })
      .catch(erro => {
        setSnackMessage({
          isError: true,
          message: erro.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  });

  if (loading) return <Loading />;

  if (error) <ErrorFail text={error.message} />;

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

      <Grid xs={12} md={6}>
        <Controller
          name={Cooperative.isCooperative}
          control={control}
          render={({ field }: any) => (
            <RadioGroup
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...field}
              row
              onChange={handleChangeCooperative}
              style={{ justifyContent: 'space-around' }}
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
          )}
        />
      </Grid>

      <Grid container spacing={2}>
        <Grid item md={12} sm={12} xs={12}>
          <TextField
            placeholder="Nome"
            variant="outlined"
            fullWidth
            inputRef={register()}
            name={Cooperative.Description}
            error={!!errors[User.FirstName]}
            helperText={errors[User.FirstName]?.message}
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <TextField
            placeholder="Nº de identificação fiscal"
            variant="outlined"
            fullWidth
            inputRef={register()}
            name={Cooperative.Nif}
            error={!!errors[Cooperative.Nif]}
            helperText={errors[Cooperative.Nif]?.message}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            placeholder="E-mail"
            variant="outlined"
            fullWidth
            inputRef={register()}
            name={Cooperative.Email}
            error={!!errors[Cooperative.Email]}
            helperText={errors[Cooperative.Email]?.message}
            type="email"
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            placeholder="Telefone"
            variant="outlined"
            fullWidth
            inputRef={register()}
            name={Cooperative.Phone}
            error={!!errors[Cooperative.Phone]}
            helperText={errors[Cooperative.Phone]?.message}
            type="tel" // Melhor opção para números de telefone
            inputProps={{
              maxLength: 9, // Limita o número de dígitos a 9
            }}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.target.value = e.target.value.slice(0, 9); // Garante que não exceda 9 caracteres
            }}
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
            placeholder="Endereço"
            variant="outlined"
            fullWidth
            inputRef={register()}
            name={Cooperative.Address}
            error={!!errors[Cooperative.Address]}
            helperText={errors[Cooperative.Address]?.message}
          />
        </Grid>

        <Grid item md={12} sm={12} xs={12}>
          <TextField
            placeholder="Presidente"
            variant="outlined"
            fullWidth
            inputRef={register()}
            name={Cooperative.Presindet}
            error={!!errors[Cooperative.Presindet]}
            helperText={errors[Cooperative.Presindet]?.message}
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
            {/* <Button
              variant="contained"
              color="secondary"
              onClick={onCancel}
              style={{ marginRight: '16px' }}
            >
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

export default CreateCooperativeTechnician;
