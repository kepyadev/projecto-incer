import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ErrorFail from '../../../../../../../../components/error-fail';
import SnackMessage from '../../../../../../../../components/snack-message';
import { MeioEstacionarioType } from '../../../../../../../../constants/sub-entites';
import useAsyncState from '../../../../../../../../hooks/use-async-state';
import {
  getOneMeiosEstacionariosType,
  updateMeioEstacionarioType,
} from '../../../../../../../../services/meios-estacionarios-type';
import {
  IMeioEstacionarioType,
  MeioEstacionarioTypeDTO,
} from '../../../../../../../../types';
import validationSchema from './create.validation';

const UpdateMeioEstacionarioType = () => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const id = localStorage.getItem('active_item');
  const [animalType, setMeioEstacionarioType] = useState<IMeioEstacionarioType>();
  const { snackMessage, setSnackMessage } = useAsyncState();

  useEffect(() => {
    if (id)
      getOneMeiosEstacionariosType(id)
        .then(response => {
          setMeioEstacionarioType(response.data?.payload);
          if (response.data) setMeioEstacionarioType(response.data?.payload);
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

  if (!animalType)
    return (
      <Alert severity="error">
        Lamentamos, não foi possível localizar a infraestruturaType
      </Alert>
    );

  const onSubmit = handleSubmit(data => {
    const newMeioEstacionarioType: MeioEstacionarioTypeDTO = { ...data };
    updateMeioEstacionarioType(
      newMeioEstacionarioType,
      animalType[MeioEstacionarioType.Id]
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
              name={MeioEstacionarioType.Description}
              error={!!errors[MeioEstacionarioType.Description]}
              helperText={errors[MeioEstacionarioType.Description]?.message}
              defaultValue={animalType[MeioEstacionarioType.Description]}
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

export default UpdateMeioEstacionarioType;
