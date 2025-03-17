import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ErrorFail from '../../../../../../../../components/error-fail';
import SnackMessage from '../../../../../../../../components/snack-message';
import { ImportedProductsTypes } from '../../../../../../../../constants/entities';
import useAsyncState from '../../../../../../../../hooks/use-async-state';
import {
  getAllConsumptionById,
  UpdateConsumption,
} from '../../../../../../../../services/consumption';
import { IImportedProductsData } from '../../../../../../../../types/ImportedProducts';
import validationSchema from '../create/create.validation';
import { UpdateConsumptionProps } from './update.types';

const UpdateConsumptionForm: FC<UpdateConsumptionProps> = ({ onClose }) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const id = localStorage.getItem('active_item');
  const [importedProducts, setImportedProducts] = useState<any>();
  const { snackMessage, setSnackMessage } = useAsyncState();

  useEffect(() => {
    if (id)
      getAllConsumptionById(id)
        .then(response => {
          setImportedProducts(response.data?.payload);
          if (response.data) setImportedProducts(response.data?.payload);
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

  if (!importedProducts)
    return (
      <Alert severity="error">
        Lamentamos, não foi possível localizar a infraestruturaType
      </Alert>
    );

  const onSubmit = handleSubmit(data => {
    const newImportedProducts: IImportedProductsData = { ...data };
    UpdateConsumption(
      newImportedProducts,
      importedProducts?.data[0][ImportedProductsTypes.Id]
    )
      .then(() => {
        setSnackMessage({
          isError: false,
          message: 'Tipo de infraestruturaType cadastrada!',
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
              name={ImportedProductsTypes.Product}
              error={!!errors[ImportedProductsTypes.Product]}
              helperText={errors[ImportedProductsTypes.Product]?.message}
              defaultValue={importedProducts?.data[0][ImportedProductsTypes.Product]}
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
              defaultValue={
                importedProducts?.data[0][ImportedProductsTypes.OriginCountry]
              }
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
              defaultValue={
                (importedProducts?.data[0] &&
                  importedProducts?.data[0][ImportedProductsTypes.MarketPrice] &&
                  importedProducts?.data[0][ImportedProductsTypes.MarketPrice]) ||
                0
              }
              type="number"
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
              defaultValue={
                (importedProducts?.data[0] &&
                  importedProducts?.data[0][
                    ImportedProductsTypes.QuantityImported
                  ] &&
                  importedProducts?.data[0][
                    ImportedProductsTypes.QuantityImported
                  ]) ||
                0
              }
              type="number"
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
              defaultValue={
                (importedProducts?.data[0] &&
                  importedProducts?.data[0][ImportedProductsTypes.Year] &&
                  importedProducts?.data[0][ImportedProductsTypes.Year]) ||
                0
              }
              type="number"
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

export default UpdateConsumptionForm;
