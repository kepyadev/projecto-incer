import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import ErrorFail from '../../../../../../../components/error-fail';
import Loading from '../../../../../../../components/Loading';
import SnackMessage from '../../../../../../../components/snack-message';
import useAsyncState from '../../../../../../../hooks/use-async-state';
import { createCounty } from '../../../../../../../services/county';
import getAllProvinces from '../../../../../../../services/province';
import { IProvince } from '../../../../../../../types';

const validationSchema = yup.object().shape({
  description: yup.string().required('Nome do município é obrigatório'),
  province: yup.string().required('Província é obrigatória'),
});

interface ICreateCountyView {
  close: () => void;
}

const CreateCountyView: FC<ICreateCountyView> = ({ close }) => {
  const { snackMessage, setSnackMessage, error, loading } = useAsyncState();
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [selectedProvince, setSelectedProvince] = useState('');

  const { errors, register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    getAllProvinces()
      .then(response => {
        console.log('Province response:', response);
        const provinceData = response.data?.payload?.data || [];
        console.log('Province data:', provinceData);
        setProvinces(provinceData);
      })
      .catch(error => {
        console.error('Error loading provinces:', error);
        setSnackMessage({
          isError: true,
          message: 'Erro ao carregar províncias'
        });
      });
  }, [setSnackMessage]);

  const onSubmit = handleSubmit(data => {
    const county = {
      description: data.description,
      province: selectedProvince,
    };

    createCounty(county)
      .then(() => {
        setSnackMessage({
          isError: false,
          message: 'Município criado com sucesso',
        });
        close();
      })
      .catch((erro: Error) => {
        setSnackMessage({
          isError: true,
          message: erro.message,
        });
      });
  });

  const handleProvinceChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    setSelectedProvince(value);
    setValue('province', value);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorFail text={error.message} />;

  return (
    <form onSubmit={onSubmit}>
      {snackMessage && (
        <SnackMessage
          snackMessage={snackMessage}
          handleClose={() => setSnackMessage(null)}
        />
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Província</InputLabel>
            <Select
              value={selectedProvince}
              onChange={handleProvinceChange}
              label="Província"
              error={!!errors.province}
            >
              {provinces.map(province => (
                <MenuItem key={province._id} value={province._id}>
                  {province.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <input
            type="hidden"
            name="province"
            ref={register()}
            value={selectedProvince}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            placeholder="Nome do Município"
            variant="outlined"
            fullWidth
            inputRef={register()}
            name="description"
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="contained" color="primary" type="submit">
              Criar Município
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateCountyView;
