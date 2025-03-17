import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import SnackMessage from '../../../../../../../../components/snack-message';
import { ImportedProductsTypes } from '../../../../../../../../constants/entities';
import useAsyncState from '../../../../../../../../hooks/use-async-state';
import { CreateConsumption } from '../../../../../../../../services/consumption';
import { IImportedProductsData } from '../../../../../../../../types/ImportedProducts';
import { CreateConsumptionProps } from './create.types';
import validationSchema from './create.validation';

const CreateConsumptionForm: FC<CreateConsumptionProps> = ({ onClose }) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { snackMessage, setSnackMessage } = useAsyncState();

  const onSubmit = handleSubmit((data: any) => {
    const newImportedProduct: IImportedProductsData = { ...data };
    CreateConsumption(newImportedProduct)
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
              placeholder="Descrição"
              variant="outlined"
              fullWidth
              label="Descrição"
              inputRef={register()}
              name={ImportedProductsTypes.Product}
              error={!!errors[ImportedProductsTypes.Product]}
              helperText={errors[ImportedProductsTypes.Product]?.message}
              type="text"
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              placeholder="País de origem"
              variant="outlined"
              fullWidth
              label="País de origem"
              inputRef={register()}
              name={ImportedProductsTypes.OriginCountry}
              error={!!errors[ImportedProductsTypes.OriginCountry]}
              helperText={errors[ImportedProductsTypes.OriginCountry]?.message}
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
              name={ImportedProductsTypes.MarketPrice}
              error={!!errors[ImportedProductsTypes.MarketPrice]}
              helperText={errors[ImportedProductsTypes.MarketPrice]?.message}
              type="number"
              defaultValue={0}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              placeholder="Quantidade"
              variant="outlined"
              fullWidth
              label="Quantidade"
              inputRef={register()}
              name={ImportedProductsTypes.QuantityImported}
              error={!!errors[ImportedProductsTypes.QuantityImported]}
              helperText={errors[ImportedProductsTypes.QuantityImported]?.message}
              type="number"
              defaultValue={0}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              placeholder="Ano"
              variant="outlined"
              fullWidth
              label="Ano"
              inputRef={register()}
              name={ImportedProductsTypes.Year}
              error={!!errors[ImportedProductsTypes.Year]}
              helperText={errors[ImportedProductsTypes.Year]?.message}
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

export default CreateConsumptionForm;
