import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import ErrorFail from '../../../../../../../../../components/error-fail';
import Loading from '../../../../../../../../../components/Loading';
import {
  County,
  Fazenda,
  Province,
} from '../../../../../../../../../constants/entities';
import { Geo } from '../../../../../../../../../constants/sub-entites';
import useAsyncState from '../../../../../../../../../hooks/use-async-state';
import getAllProvinces from '../../../../../../../../../services/province';
import { ICounty, IProvince } from '../../../../../../../../../types';
import { FormStepProps } from '../../create.types';
import validationSchema from './location.validation';

const LocationForm: FC<FormStepProps> = ({ onNext = () => {}, fazenda }) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [provinces, setProvinces] = useState<IProvince[]>();
  const [countys, setCountys] = useState<ICounty[]>();

  const [province, setProvince] = useState<string>();
  const [county, setCounty] = useState<string>();
  const { error, setError, loading, setLoading } = useAsyncState();

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoading(true);
        const response = await getAllProvinces();
        setProvinces(response.data?.payload.data);

        if (fazenda) {
          const selectedProvinceId =
            fazenda[Fazenda.County][County.Province]![Province.Id];
          const selectedCountyId = fazenda[Fazenda.County][County.Id];

          setProvince(selectedProvinceId);
          const provinceData = findProvince(
            response.data?.payload.data,
            selectedProvinceId
          );
          setCountys(provinceData?.countys);

          setCounty(selectedCountyId);
        }
      } catch {
        setError(new Error('Lamentamos, ocorreu um erro ao carregar os dados!'));
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
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

  const onSubmit = handleSubmit(data => {
    if (!county) {
      return;
    }
    const selectedProvince = findProvince(provinces!, province!);
    const selectedCounty = findCounty(selectedProvince?.countys, county!);

    if (!selectedCounty || selectedCounty === undefined) {
      setCounty('');
      // eslint-disable-next-line consistent-return
      return;
    }

    const fazendaLocalization = {
      [Fazenda.Localization]: {
        province: selectedProvince,
        county: selectedCounty,
      },
      [Fazenda.Estradanacional]: data[Fazenda.Estradanacional],
      [Fazenda.DistanciaEstrada]: data[Fazenda.DistanciaEstrada],
      [Fazenda.Geo]: {
        [Geo.Latitude]: data[Geo.Latitude],
        [Geo.Longitude]: data[Geo.Longitude],
      },
    };
    localStorage.setItem('location', JSON.stringify(fazendaLocalization));

    onNext();
  });

  const handleChangeProvince = (value: any) => {
    setProvince(value.target.value);
    const pro = findProvince(provinces, value.target.value);
    setCountys(pro?.countys);
  };
  const handleChangeCounty = (value: any) => {
    // const coun = findCounty(countys, value.target.value);
    setCounty(value.target.value);
  };

  if (loading) return <Loading />;

  if (error) return <ErrorFail />;

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item md={6} sm={6} xs={12}>
          <FormControl variant="outlined" style={{ width: '100%' }}>
            <InputLabel id="province-label">Província</InputLabel>
            <Select
              name="province 3333"
              labelId="province-label"
              id="province"
              onChange={handleChangeProvince}
              fullWidth
              label="Província"
              defaultValue={province}
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
              defaultValue={county}
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
        <Grid item md={12} sm={12} xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Estrada Nacional Mais Próxima"
            inputRef={register()}
            error={!!errors[Fazenda.Estradanacional]}
            helperText={errors[Fazenda.Estradanacional]?.message}
            name={Fazenda.Estradanacional}
            defaultValue={
              (fazenda &&
                fazenda[Fazenda.Geo] &&
                fazenda[Fazenda.Estradanacional]) ||
              ''
            }
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Distância à Estrada Nacional mais próxima (KM)"
            inputRef={register()}
            type="number"
            name={Fazenda.DistanciaEstrada}
            error={!!errors[Fazenda.DistanciaEstrada]}
            helperText={errors[Fazenda.DistanciaEstrada]?.message}
            defaultValue={
              (fazenda &&
                fazenda[Fazenda.Geo] &&
                fazenda[Fazenda.DistanciaEstrada]) ||
              ''
            }
          />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Latitude"
            inputRef={register()}
            name={Geo.Latitude}
            error={!!errors[Geo.Latitude]}
            helperText={errors[Geo.Latitude]?.message}
            defaultValue={
              (fazenda &&
                fazenda[Fazenda.Geo] &&
                fazenda[Fazenda.Geo][Geo.Latitude]) ||
              ''
            }
          />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <TextField
            placeholder="Longitude"
            variant="outlined"
            fullWidth
            label="Longitude"
            inputRef={register()}
            name={Geo.Longitude}
            error={!!errors[Geo.Longitude]}
            helperText={errors[Geo.Longitude]?.message}
            defaultValue={
              (fazenda &&
                fazenda[Fazenda.Geo] &&
                fazenda[Fazenda.Geo][Geo.Longitude]) ||
              ''
            }
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
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Próximo
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default LocationForm;
