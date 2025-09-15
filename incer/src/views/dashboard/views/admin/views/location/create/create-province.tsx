import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import ErrorFail from '../../../../../../../components/error-fail';
import Loading from '../../../../../../../components/Loading';
import SnackMessage from '../../../../../../../components/snack-message';
import useAsyncState from '../../../../../../../hooks/use-async-state';
import { createProvince } from '../../../../../../../services/province';

const validationSchema = yup.object().shape({
  description: yup.string().required('Nome da província é obrigatório'),
});

interface ICreateProvinceView {
  close: () => void;
}

const CreateProvinceView: FC<ICreateProvinceView> = ({ close }) => {
  const { snackMessage, setSnackMessage, error, loading } = useAsyncState();

  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit(data => {
    const province = {
      description: data.description,
      country: 'Angola', // Country name - will be resolved by backend
    };

    createProvince(province)
      .then(() => {
        setSnackMessage({
          isError: false,
          message: 'Província criada com sucesso',
        });
        close();
      })
      .catch((erro: Error) => {
        setSnackMessage({
          isError: true,
          message: erro.message,
        });
      });
  });

  if (loading) return <Loading />;
  if (error) return <ErrorFail text={error.message} />;

  return (
    <form onSubmit={onSubmit}>
      {snackMessage && (
        <SnackMessage
          snackMessage={snackMessage}
          handleClose={() => setSnackMessage(null)}
        />
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            placeholder="Nome da Província"
            variant="outlined"
            fullWidth
            inputRef={register()}
            name="description"
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="contained" color="primary" type="submit">
              Criar Província
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateProvinceView;
