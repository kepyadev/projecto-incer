import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ErrorFail from '../../../../../../../../components/error-fail';
import SnackMessage from '../../../../../../../../components/snack-message';
import { CultureType } from '../../../../../../../../constants/entities';
import useAsyncState from '../../../../../../../../hooks/use-async-state';
import {
  getOneCultureType,
  updateCultureType,
} from '../../../../../../../../services/culturas_type';
import {
  ICultureType,
  ICultureTypeData,
} from '../../../../../../../../types/culture';
import validationSchema from './update.validation';

const UpdateCultureType = () => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const id = localStorage.getItem('active_item');
  const [cultureType, setCultureType] = useState<ICultureType>();
  const { snackMessage, setSnackMessage } = useAsyncState();

  useEffect(() => {
    if (id)
      getOneCultureType(id)
        .then(response => {
          setCultureType(response.data?.payload);
          if (response.data) {
            setCultureType(response.data?.payload);
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

  if (!cultureType)
    return (
      <Alert severity="error">
        Lamentamos, não foi possível localizar a cultura
      </Alert>
    );

  const onSubmit = handleSubmit(data => {
    const newCultureType: ICultureTypeData = { ...data };
    updateCultureType(newCultureType, cultureType[CultureType.Id])
      .then(() => {
        setSnackMessage({ isError: false, message: 'Tipo de cultura cadastrada!' });
      })
      .catch((error: Error) => {
        setSnackMessage({ isError: true, message: error.message });
      });
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
              name={CultureType.Description}
              error={!!errors[CultureType.Description]}
              helperText={errors[CultureType.Description]?.message}
              defaultValue={cultureType[CultureType.Description]}
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

export default UpdateCultureType;
