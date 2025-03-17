import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import SnackMessage from '../../../../../../../../components/snack-message';
import { AnimalType } from '../../../../../../../../constants/sub-entites';
import useAsyncState from '../../../../../../../../hooks/use-async-state';
import { createAnimalType } from '../../../../../../../../services/animals-type';
import { AnimalTypeDTO } from '../../../../../../../../types';
import { CreateAnimalTypeScreenProps } from './create.types';
import validationSchema from './create.validation';

const CreateAnimalTypeScreen: FC<CreateAnimalTypeScreenProps> = ({ onClose }) => {
  const [isAve, setIsAve] = useState(false);
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { snackMessage, setSnackMessage } = useAsyncState();

  const onSubmit = handleSubmit(data => {
    const newAnimalType: AnimalTypeDTO = { ...data, [AnimalType.IsAve]: isAve };
    createAnimalType(newAnimalType)
      .then(() => {
        setSnackMessage({
          isError: false,
          message: 'Tipo de animal cadastrada!',
        });
      })
      .catch((error: Error) => {
        setSnackMessage({ isError: true, message: error.message });
      });
    onClose();
  });

  const handleChangeIsAve = () => {
    setIsAve(!isAve);
  };

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
              type="text"
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

export default CreateAnimalTypeScreen;
