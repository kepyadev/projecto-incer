import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import SnackMessage from '../../../../../../../../../components/snack-message';
import { Producer } from '../../../../../../../../../constants/entities';
import { User } from '../../../../../../../../../constants/user';
import useAsyncState from '../../../../../../../../../hooks/use-async-state';
import { addExistentProducer } from '../../../../../../../../../services/cooperative';
import validationSchema from './add-existent.validation';

const AddExistentProducer = ({ modalHandleClose }: any) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { setSnackMessage, snackMessage } = useAsyncState();
  const routes = useHistory().location.pathname.split('/');
  const id = routes[routes.length - 1];

  const onSubmit = handleSubmit(data => {
    addExistentProducer({
      [Producer.Id]: data[Producer.Id],
      [Producer.Cooperative]: id,
    })
      .then(response => {
        setSnackMessage({
          isError: false,
          message: `Produtor ${
            response.data?.payload[Producer.User][User.FirstName]
          } foi vinculado a cooperativa`,
        });
        modalHandleClose();
      })
      .catch((error: Error) => {
        setSnackMessage({
          isError: true,
          message: error.message,
        });
      });
  });

  return (
    <form onSubmit={onSubmit}>
      {snackMessage && (
        <SnackMessage
          snackMessage={snackMessage}
          handleClose={() => {
            setSnackMessage(null);
          }}
        />
      )}
      <Grid container spacing={2}>
        <Grid item md={12} sm={12} xs={12}>
          <TextField
            placeholder="Código do produtor"
            variant="outlined"
            fullWidth
            name={Producer.Id}
            error={!!errors[Producer.Id]}
            helperText={errors[Producer.Id]?.message}
            inputRef={register()}
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
            {/* 
            <Button variant="text" color="primary" type="submit">
              Cancelar
            </Button> */}
            <Button variant="contained" color="primary" type="submit">
              Salvar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddExistentProducer;
