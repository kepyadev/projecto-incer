import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ErrorFail from '../../../../../../../../components/error-fail';
import SnackMessage from '../../../../../../../../components/snack-message';
import { AnimalType } from '../../../../../../../../constants/sub-entites';
import useAsyncState from '../../../../../../../../hooks/use-async-state';
import {
  getOneAnimalType,
  updateAnimalType,
} from '../../../../../../../../services/animals-type';
import { AnimalTypeDTO, IAnimalType } from '../../../../../../../../types';
import validationSchema from './create.validation';

const UpdateAnimalType = () => {
  const [isAve, setIsAve] = useState(false);
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const id = localStorage.getItem('active_item');
  const [animalType, setAnimalType] = useState<IAnimalType>();
  const { snackMessage, setSnackMessage } = useAsyncState();

  useEffect(() => {
    if (id)
      getOneAnimalType(id)
        .then(response => {
          setAnimalType(response.data?.payload);
          if (response.data) {
            const inData = response.data?.payload;
            setIsAve(inData[AnimalType.IsAve]);
            setAnimalType(inData);
          }
        })
        .catch(() => {
          setSnackMessage({
            isError: true,
            message: 'Lamentamos, ocorreu um erro ao carregar os dados!',
          });
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChangeIsAve = () => {
    setIsAve(!isAve);
  };

  if (!id) return <ErrorFail />;

  if (!animalType)
    return (
      <Alert severity="error">Lamentamos, não foi possível localizar o animal</Alert>
    );

  const onSubmit = handleSubmit(data => {
    const newAnimalType: AnimalTypeDTO = { ...data, [AnimalType.IsAve]: isAve };
    updateAnimalType(newAnimalType, animalType[AnimalType.Id])
      .then(() => {
        setSnackMessage({
          isError: false,
          message: 'Tipo de animal actualizado!',
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
          <Grid item md={8} sm={12} xs={12}>
            <TextField
              placeholder="Descrição"
              variant="outlined"
              fullWidth
              label="Descrição"
              inputRef={register()}
              name={AnimalType.Description}
              error={!!errors[AnimalType.Description]}
              helperText={errors[AnimalType.Description]?.message}
              defaultValue={animalType[AnimalType.Description]}
            />
          </Grid>

          <Grid item md={2} sm={12} xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={isAve}
                  onChange={handleChangeIsAve}
                  inputProps={{ 'aria-label': 'controlled' }}
                  color="primary"
                />
              }
              label="Ave"
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

export default UpdateAnimalType;
