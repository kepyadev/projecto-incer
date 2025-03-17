import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ErrorFail from '../../../../../../../../components/error-fail';
import SnackMessage from '../../../../../../../../components/snack-message';
import { HumanResourceType } from '../../../../../../../../constants/sub-entites';
import useAsyncState from '../../../../../../../../hooks/use-async-state';
import {
  getOneHumanResourceType,
  updateHumanResourceType,
} from '../../../../../../../../services/human-resource-type';
import {
  HumanResourceTypeDTO,
  IHumanResourceType,
} from '../../../../../../../../types';
import validationSchema from './create.validation';

const UpdateHumanResourceType = () => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const id = localStorage.getItem('active_item');
  const [infraestruturaType, setHumanResourceType] = useState<IHumanResourceType>();
  const { snackMessage, setSnackMessage } = useAsyncState();

  useEffect(() => {
    if (id)
      getOneHumanResourceType(id)
        .then(response => {
          setHumanResourceType(response.data?.payload);
          if (response.data) setHumanResourceType(response.data?.payload);
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

  if (!infraestruturaType)
    return (
      <Alert severity="error">
        Lamentamos, não foi possível localizar a infraestruturaType
      </Alert>
    );

  const onSubmit = handleSubmit(data => {
    const newHumanResourceType: HumanResourceTypeDTO = { ...data };
    updateHumanResourceType(
      newHumanResourceType,
      infraestruturaType[HumanResourceType.Id]
    )
      .then(() => {
        setSnackMessage({
          isError: false,
          message: 'Tipo de infraestrutura actualizada!',
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
              name={HumanResourceType.Description}
              error={!!errors[HumanResourceType.Description]}
              helperText={errors[HumanResourceType.Description]?.message}
              defaultValue={infraestruturaType[HumanResourceType.Description]}
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

export default UpdateHumanResourceType;
