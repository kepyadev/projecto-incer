import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import Loading from '../../../../../../../../../../components/Loading';
import SnackMessage from '../../../../../../../../../../components/snack-message';
import {
  Animal,
  AnimalType,
} from '../../../../../../../../../../constants/sub-entites';
import useAsyncState from '../../../../../../../../../../hooks/use-async-state';
import { getAllAnimalsTypes } from '../../../../../../../../../../services/animals-type';
import { addAnimalsToFazenda } from '../../../../../../../../../../services/fazenda';
import { AnimalDTO, IAnimalType } from '../../../../../../../../../../types';
import { CreateAnimalProps } from './create.types';
import validationSchema from './create.validation';

const CreateAnimal: FC<CreateAnimalProps> = ({ fazendaId, onClose }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [animals, setAnimals] = useState<ReadonlyArray<IAnimalType>>();
  const [animal, setAnimal] = useState<string>();
  const { snackMessage, setSnackMessage, loading, setLoading } = useAsyncState();
  const [isAve, setIsAve] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllAnimalsTypes()
      .then(res => {
        setAnimals(res.data?.payload.data);
        if (animals) setAnimal(animals[0][AnimalType.Id]);
      })
      .catch((erro: any) => {
        setSnackMessage({
          isError: true,
          message: erro.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeAnimal = (e: any) => {
    setAnimal(e.target.value);
    animals?.map(anima => {
      if (anima[AnimalType.Id] === e.target.value) {
        setIsAve(anima[AnimalType.IsAve]);
      }
      return isAve;
    });
  };

  const onSubmit = handleSubmit(data => {
    setLoading(true);
    const dataToSend: AnimalDTO = {
      ...data,
      [Animal.Type]: animal!,
      [Animal.FazendaId]: fazendaId,
    };

    addAnimalsToFazenda(dataToSend)
      .then(res => {
        setSnackMessage({
          isError: false,
          message: res.data?.msg || 'Animal adicionado com sucesso!',
        });
        onClose();
      })
      .catch((erro: any) => {
        setSnackMessage({
          isError: true,
          message: erro.msg || 'Lamentamos, ocorreu uma falha',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  });

  if (loading) return <Loading />;

  if (animals === undefined)
    return (
      <Alert severity="warning">
        {' '}
        <Typography>
          Por Favor, contacte o INCER para que sejam cadastradas as informações em
          falta para esta entidade
        </Typography>
      </Alert>
    );

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
        {animals && (
          <Grid item xs={12}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <InputLabel id="tipo-label">Tipo</InputLabel>
              <Select
                labelId="tipo-label"
                id="county"
                value={animal}
                onChange={handleChangeAnimal}
                fullWidth
                label="Tipo"
                name={Animal.Type}
                placeholder="Tipo"
                variant="outlined"
              >
                <MenuItem value={undefined} key={v4()}>
                  Selecione um tipo
                </MenuItem>
                {animals.map(animalItem => {
                  return (
                    <MenuItem value={animalItem[AnimalType.Id]} key={v4()}>
                      {animalItem[AnimalType.Description]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        )}

        <Grid item xs={12} sm={6} md={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Efectivo total"
            name={Animal.EfectivoTotal}
            inputRef={register()}
            error={!!errors[Animal.EfectivoTotal]}
            helperText={errors[Animal.EfectivoTotal]?.message}
            type="number"
            defaultValue="0"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Matrizes"
            name={Animal.Matrizes}
            inputRef={register()}
            error={!!errors[Animal.Matrizes]}
            helperText={errors[Animal.Matrizes]?.message}
            type="number"
            defaultValue="0"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Produção anual"
            name={Animal.ProducaoAnual}
            inputRef={register()}
            error={!!errors[Animal.ProducaoAnual]}
            helperText={errors[Animal.ProducaoAnual]?.message}
            type="number"
            defaultValue={0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="ano de produção"
            placeholder="ano de produção"
            type="number"
            name={Animal.AnoProducao}
            inputRef={register()}
            error={!!errors[Animal.AnoProducao]}
            helperText={errors[Animal.AnoProducao]?.message}
            defaultValue="0"
          />
        </Grid>
        {isAve && (
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Quantidade de ovos"
              placeholder="Quantidade de ovos"
              type="number"
              name={Animal.QuantidadeOvos}
              inputRef={register()}
              error={!!errors[Animal.QuantidadeOvos]}
              helperText={errors[Animal.QuantidadeOvos]?.message}
              defaultValue="0"
              required={isAve}
            />
          </Grid>
        )}
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
  );
};
export default CreateAnimal;
