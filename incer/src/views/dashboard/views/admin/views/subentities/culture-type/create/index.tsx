import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import SnackMessage from '../../../../../../../../components/snack-message';
import { CultureType } from '../../../../../../../../constants/entities';
import useAsyncState from '../../../../../../../../hooks/use-async-state';
import { createCultureType } from '../../../../../../../../services/culturas_type';
import { ICultureTypeData } from '../../../../../../../../types/culture';
import { CreateCultureTypeProps } from './create.types';
import validationSchema from './create.validation';

const CreateCultureType: FC<CreateCultureTypeProps> = ({ onClose }) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { snackMessage, setSnackMessage } = useAsyncState();

  const onSubmit = handleSubmit(data => {
    const newCultureType: ICultureTypeData = { ...data };
    createCultureType(newCultureType)
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
              placeholder="Descrição"
              variant="outlined"
              fullWidth
              label="Descrição"
              inputRef={register()}
              name={CultureType.Description}
              error={!!errors[CultureType.Description]}
              helperText={errors[CultureType.Description]?.message}
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

export default CreateCultureType;
