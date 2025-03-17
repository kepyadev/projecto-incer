import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ErrorFail from '../../../../../../../../components/error-fail';
import SnackMessage from '../../../../../../../../components/snack-message';
import { NationalMarketPricesTypes } from '../../../../../../../../constants/entities';
import useAsyncState from '../../../../../../../../hooks/use-async-state';
import {
  getAllNationalMarketPricesById,
  UpdateNationalMarketPrices,
} from '../../../../../../../../services/createnationalMarketPrices';
import {
  INationalMarketPrices,
  INationalMarketPricesData,
} from '../../../../../../../../types/NationalMarketPrices';
import validationSchema from '../create/create.validation';
import { UpdateNationalMarketPricesProps } from './update.types';

const UpdateNationalMarketPriceForm: FC<UpdateNationalMarketPricesProps> = ({
  onClose,
}) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const id = localStorage.getItem('active_item');
  const [nationalMarketPrices, setNationalMarketPrice] =
    useState<INationalMarketPrices>();
  const { snackMessage, setSnackMessage } = useAsyncState();

  useEffect(() => {
    if (id)
      getAllNationalMarketPricesById(id)
        .then(response => {
          setNationalMarketPrice(response.data?.payload);
          if (response.data) setNationalMarketPrice(response.data?.payload);
        })
        .catch(() => {
          setSnackMessage({
            isError: true,
            message: 'Lamentamos, ocorreu um erro ao carregar os dados!',
          });
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!id) return <ErrorFail />;

  if (!nationalMarketPrices)
    return (
      <Alert severity="error">
        Lamentamos, não foi possível localizar a equipamento
      </Alert>
    );

  const onSubmit = handleSubmit(data => {
    const newNationalMarketPricesData: INationalMarketPricesData = { ...data };
    UpdateNationalMarketPrices(
      newNationalMarketPricesData,
      nationalMarketPrices[NationalMarketPricesTypes.Id]
    )
      .then(() => {
        setSnackMessage({
          isError: false,
          message: 'Tipo de equipamento cadastrada!',
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
              placeholder="Produto"
              variant="outlined"
              fullWidth
              label="Produto"
              inputRef={register()}
              name={NationalMarketPricesTypes.Product}
              error={!!errors[NationalMarketPricesTypes.Product]}
              helperText={errors[NationalMarketPricesTypes.Product]?.message}
              defaultValue={nationalMarketPrices[NationalMarketPricesTypes.Product]}
              type="text"
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              placeholder="Preço"
              variant="outlined"
              fullWidth
              label="Preço"
              inputRef={register()}
              name={NationalMarketPricesTypes.AveragePrice}
              error={!!errors[NationalMarketPricesTypes.AveragePrice]}
              helperText={errors[NationalMarketPricesTypes.AveragePrice]?.message}
              defaultValue={
                nationalMarketPrices[NationalMarketPricesTypes.AveragePrice]
              }
              type="text"
            />
          </Grid>

          <Grid item md={12} sm={12} xs={12}>
            <TextField
              placeholder="Região"
              variant="outlined"
              fullWidth
              label="Região"
              inputRef={register()}
              name={NationalMarketPricesTypes.Region}
              error={!!errors[NationalMarketPricesTypes.Region]}
              helperText={errors[NationalMarketPricesTypes.Region]?.message}
              defaultValue={nationalMarketPrices[NationalMarketPricesTypes.Region]}
              type="text"
            />
          </Grid>

          <Grid item md={12} sm={12} xs={12}>
            <TextField
              placeholder="Ano"
              variant="outlined"
              fullWidth
              label="Ano"
              inputRef={register()}
              name={NationalMarketPricesTypes.Year}
              error={!!errors[NationalMarketPricesTypes.Year]}
              helperText={errors[NationalMarketPricesTypes.Year]?.message}
              defaultValue={nationalMarketPrices[NationalMarketPricesTypes.Year]}
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

export default UpdateNationalMarketPriceForm;
