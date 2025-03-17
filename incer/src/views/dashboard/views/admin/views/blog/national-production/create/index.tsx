import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import SnackMessage from '../../../../../../../../components/snack-message';
import { NationalProductionType } from '../../../../../../../../constants/entities';
import useAsyncState from '../../../../../../../../hooks/use-async-state';
import { CreateNationalProduction } from '../../../../../../../../services/NationalProduction';
import { INationalProductionData } from '../../../../../../../../types/nationalProduction';
import { CreteNationalProductionProps } from './create.types';
import validationSchema from './create.validation';

const CreteNationalProductionType: FC<CreteNationalProductionProps> = ({
  onClose,
}) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { snackMessage, setSnackMessage } = useAsyncState();

  const onSubmit = handleSubmit(data => {
    const newNationalProduction: INationalProductionData = { ...data };
    CreateNationalProduction(newNationalProduction)
      .then(() => {
        setSnackMessage({
          isError: false,
          message: 'Tipo de produção nacional!',
        });
      })
      .catch((error: Error) => {
        setSnackMessage({ isError: true, message: error.message });
      });
    onClose();
  });

  return (
    <>
      <SnackMessage
        snackMessage={snackMessage}
        handleClose={() => {
          setSnackMessage(null);
        }}
      />
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              placeholder="Nome"
              variant="outlined"
              fullWidth
              label="Nome da produção"
              inputRef={register()}
              name={NationalProductionType.Product}
              error={!!errors[NationalProductionType.Product]}
              helperText={errors[NationalProductionType.Product]?.message}
              type="text"
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              placeholder="Volume"
              variant="outlined"
              fullWidth
              label="Volume"
              inputRef={register()}
              name={NationalProductionType.QuantityProduced}
              error={!!errors[NationalProductionType.QuantityProduced]}
              helperText={errors[NationalProductionType.QuantityProduced]?.message}
              type="number"
              defaultValue={0}
            />
          </Grid>

          <Grid item md={12} sm={12} xs={12}>
            <TextField
              placeholder="Preço"
              variant="outlined"
              fullWidth
              label="Preço"
              inputRef={register()}
              name={NationalProductionType.AveragePrice}
              error={!!errors[NationalProductionType.AveragePrice]}
              helperText={errors[NationalProductionType.AveragePrice]?.message}
              type="number"
              defaultValue={0}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              placeholder="Ano"
              variant="outlined"
              fullWidth
              label="ano"
              inputRef={register()}
              name={NationalProductionType.Year}
              error={!!errors[NationalProductionType.Year]}
              helperText={errors[NationalProductionType.Year]?.message}
              type="year"
              defaultValue={0}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              placeholder="Região"
              variant="outlined"
              fullWidth
              label="Região"
              inputRef={register()}
              name={NationalProductionType.Region}
              error={!!errors[NationalProductionType.Region]}
              helperText={errors[NationalProductionType.Region]?.message}
              type="text"
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
                Salvar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CreteNationalProductionType;
