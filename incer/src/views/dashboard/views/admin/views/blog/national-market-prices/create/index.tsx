import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import SnackMessage from '../../../../../../../../components/snack-message';
import { NationalMarketPricesTypes } from '../../../../../../../../constants/entities';
import useAsyncState from '../../../../../../../../hooks/use-async-state';
import { CreateNationalMarketPrices } from '../../../../../../../../services/createnationalMarketPrices';
import { INationalMarketPricesData } from '../../../../../../../../types/NationalMarketPrices';
import { CreateNationalMarketPriceTypeProps } from './create.types';
import validationSchema from './create.validation';

const CreateNationalMarketPricesForm: FC<CreateNationalMarketPriceTypeProps> = ({
  onClose,
}) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { snackMessage, setSnackMessage } = useAsyncState();

  const onSubmit = handleSubmit(data => {
    const newNationalMarketPrices: INationalMarketPricesData = { ...data };
    CreateNationalMarketPrices(newNationalMarketPrices)
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
              placeholder="Produto"
              variant="outlined"
              fullWidth
              label="Produto"
              inputRef={register()}
              name={NationalMarketPricesTypes.Product}
              error={!!errors[NationalMarketPricesTypes.Product]}
              helperText={errors[NationalMarketPricesTypes.Product]?.message}
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
              type="number"
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
              name={NationalMarketPricesTypes.Region}
              error={!!errors[NationalMarketPricesTypes.Region]}
              helperText={errors[NationalMarketPricesTypes.Region]?.message}
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
              type="number"
              defaultValue={0}
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

export default CreateNationalMarketPricesForm;
