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
  MeioEstacionario,
  MeioEstacionarioType,
  Power,
} from '../../../../../../../../../../constants/sub-entites';
import useAsyncState from '../../../../../../../../../../hooks/use-async-state';
import { addMeioEstacionario } from '../../../../../../../../../../services/fazenda';
import { getAllMeiosEstacionariosType } from '../../../../../../../../../../services/meios-estacionarios-type';
import {
  IHumanResourceType,
  MeioEstacionarioDTO,
  PowerUnidade,
} from '../../../../../../../../../../types';
import { CreateMeiosEstacionariosProps } from './create.types';
import validationSchema from './create.validation';

const CreateMeiosEstacionarios: FC<CreateMeiosEstacionariosProps> = ({
  fazendaId,
  onClose,
}) => {
  const [meiosEstacionariosTypes, setmeiosEstacionariosTypes] =
    useState<IHumanResourceType[]>();
  const [meiosEstacionariosType, setMeiosEstacionariosType] = useState<string>();
  const { snackMessage, setSnackMessage, loading, setLoading } = useAsyncState();
  const [unidade, setUnidade] = useState<PowerUnidade>('pH');

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleChangeUnidade = (e: any) => {
    setUnidade(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    getAllMeiosEstacionariosType()
      .then(res => {
        setmeiosEstacionariosTypes(res.data?.payload.data);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = handleSubmit(data => {
    setLoading(true);
    const dataToSend: MeioEstacionarioDTO = {
      ...data,
      [MeioEstacionario.Type]: meiosEstacionariosType!,
      [MeioEstacionario.FazendaId]: fazendaId,
      [MeioEstacionario.PowerValue]: {
        [Power.Value]: data[MeioEstacionario.PowerValue],
        [Power.Unidade]: unidade,
      },
    };
    console.log(dataToSend);
    addMeioEstacionario(dataToSend)
      .then(response => {
        setSnackMessage({
          isError: false,
          message: response.data?.msg || 'Meio Estacionario cadastrado',
        });
        onClose();
      })
      .catch((erro: Error) => {
        setSnackMessage({ isError: true, message: erro.message });
      })
      .finally(() => {
        setLoading(false);
      });
  });

  const handleChangeMeiosEstacionariosTypes = (e: any) => {
    setMeiosEstacionariosType(e.target.value);
  };
  if (loading) return <Loading />;

  if (!meiosEstacionariosTypes)
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
        {meiosEstacionariosTypes && (
          <Grid item xs={12}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <InputLabel id="tipo-label">Tipo</InputLabel>
              <Select
                labelId="tipo-label"
                id="tipo"
                value={meiosEstacionariosType}
                onChange={handleChangeMeiosEstacionariosTypes}
                fullWidth
                label="Tipo"
                name={MeioEstacionario.Type}
                placeholder="Tipo"
                variant="outlined"
              >
                <MenuItem key={v4()}>Selecionar uma opção</MenuItem>
                {meiosEstacionariosTypes.map(meiosEstacionariosTypesItem => {
                  return (
                    <MenuItem
                      value={meiosEstacionariosTypesItem[MeioEstacionarioType.Id]}
                      key={v4()}
                    >
                      {meiosEstacionariosTypesItem[MeioEstacionarioType.Description]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        )}

        <Grid item xs={12} sm={12} md={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Quantidade"
            name={MeioEstacionario.Quantity}
            inputRef={register()}
            error={!!errors[MeioEstacionario.Quantity]}
            helperText={errors[MeioEstacionario.Quantity]?.message}
            type="number"
            defaultValue="0"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Potência"
            name={MeioEstacionario.PowerValue}
            inputRef={register()}
            error={!!errors[MeioEstacionario.PowerValue]}
            helperText={errors[MeioEstacionario.PowerValue]?.message}
            type="number"
            defaultValue="0"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" style={{ width: '100%' }}>
            <InputLabel id="unidade-label">Unidade de potência</InputLabel>
            <Select
              labelId="unidade-label"
              id="unidade"
              value={unidade}
              onChange={handleChangeUnidade}
              fullWidth
              label="Unidade de potência"
              name={MeioEstacionario.Unidade}
              placeholder="unidade de potência"
              variant="outlined"
            >
              <MenuItem key={v4()}>Selecionar uma opção</MenuItem>

              <MenuItem value="pH" key={v4()}>
                pH
              </MenuItem>
              <MenuItem value="Watts" key={v4()}>
                Watts
              </MenuItem>
            </Select>
          </FormControl>
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
  );
};

export default CreateMeiosEstacionarios;
