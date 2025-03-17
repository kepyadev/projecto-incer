import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ErrorFail from '../../../../../../../../components/error-fail';
import SnackMessage from '../../../../../../../../components/snack-message';
import { NationalProductionType } from '../../../../../../../../constants/entities';
import useAsyncState from '../../../../../../../../hooks/use-async-state';
import {
  getAllNationalProductionById,
  UpdateNationalProduction,
} from '../../../../../../../../services/NationalProduction';
import {
  INationalProduction,
  INationalProductionData,
} from '../../../../../../../../types/nationalProduction';
import validationSchema from '../create/create.validation';
import { UpdateNationalProductionProps } from './update.types';

const UpdateNationalProductionForm: FC<UpdateNationalProductionProps> = ({
  onClose,
}) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const id = localStorage.getItem('active_item');
  const [nationalProduction, setNationalProduction] =
    useState<INationalProduction>();
  const { snackMessage, setSnackMessage } = useAsyncState();

  useEffect(() => {
    if (id)
      getAllNationalProductionById(id)
        .then(response => {
          setNationalProduction(response.data?.payload);
          if (response.data) {
            setNationalProduction(response.data?.payload);
          }
        })
        .catch(() => {
          setSnackMessage({
            isError: true,
            message: 'Lamentamos, ocorreu um erro ao carregar os dados',
          });
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!id) return <ErrorFail />;

  if (!nationalProduction)
    return (
      <Alert severity="error">
        Lamentamos, não foi possível localizar a cultura
      </Alert>
    );

  const onSubmit = handleSubmit(data => {
    const newCultureType: INationalProductionData = { ...data };
    UpdateNationalProduction(
      newCultureType,
      nationalProduction[NationalProductionType.Id]
    )
      .then(() => {
        setSnackMessage({ isError: false, message: 'Tipo de cultura cadastrada!' });
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
              defaultValue={nationalProduction[NationalProductionType.Product]}
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
              defaultValue={
                nationalProduction[NationalProductionType.QuantityProduced]
              }
              type="number"
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
              defaultValue={nationalProduction[NationalProductionType.AveragePrice]}
              type="number"
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
              defaultValue={nationalProduction[NationalProductionType.Year]}
              type="year"
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
              defaultValue={nationalProduction[NationalProductionType.Region]}
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

export default UpdateNationalProductionForm;
