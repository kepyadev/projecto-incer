import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
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

import ErrorFail from '../../../../../../../../../../components/error-fail';
import Loading from '../../../../../../../../../../components/Loading';
import SnackMessage from '../../../../../../../../../../components/snack-message';
import {
  Machine,
  MachineType,
  Power,
} from '../../../../../../../../../../constants/sub-entites';
import useAsyncState from '../../../../../../../../../../hooks/use-async-state';
import { addMachineToFazenda } from '../../../../../../../../../../services/fazenda';
import { getAllMachineTypes } from '../../../../../../../../../../services/machine-type';
import {
  IMachineType,
  MachineDTO,
  PowerUnidade,
} from '../../../../../../../../../../types';
import { CreateMachineProps } from './create.types';
import validationSchema from './create.validation';

const CreateMachine: FC<CreateMachineProps> = ({ fazendaId, onClose }) => {
  const [machine, setMachine] = useState<string>();
  const [machines, setMachines] = useState<ReadonlyArray<IMachineType>>();
  const [unidade, setUnidade] = useState<PowerUnidade>('pH');
  const { snackMessage, setSnackMessage, loading, setLoading } = useAsyncState();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setLoading(true);
    getAllMachineTypes()
      .then(res => {
        setMachines(res.data?.payload.data);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = handleSubmit(data => {
    setLoading(true);

    if (!machine) {
      <ErrorFail text="Por favor selecione uma maquina" />;
    }
    const dataToSenda: MachineDTO = {
      ...data,
      [Machine.Type]: machine!,
      [Machine.FazendaId]: fazendaId,
      [Machine.Power]: {
        [Power.Value]: data[Machine.Power],
        [Power.Unidade]: unidade,
      },
      [Machine.Quantity]: data[Machine.Quantity],
    };

    addMachineToFazenda(dataToSenda)
      .then(() => {
        setSnackMessage({
          isError: false,
          message: 'Máquina adicionada!',
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

  const handleChangeMachine = (e: any) => {
    setMachine(e.target.value);
  };

  const handleChangeUnidade = (e: any) => {
    setUnidade(e.target.value);
  };

  if (loading) return <Loading />;

  if (machines === undefined && !loading)
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
        {machines && (
          <Grid item xs={12}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <InputLabel id="tipo-label">Tipo</InputLabel>
              <Select
                labelId="tipo-label"
                id="tipo"
                value={machine}
                onChange={handleChangeMachine}
                fullWidth
                label="Tipo"
                name={Machine.Type}
                placeholder="Tipo"
                variant="outlined"
              >
                <MenuItem key={v4()}>Selecionar uma opção</MenuItem>

                {machines.map(machineItem => {
                  return (
                    <MenuItem value={machineItem[MachineType.Id]} key={v4()}>
                      {machineItem[MachineType.Description]}
                    </MenuItem>
                  );
                })}
              </Select>
              {!machine && (
                <FormHelperText style={{ color: '#ff0000' }}>
                  Por favor selecione uma maquina
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        )}

        <Grid item xs={12} sm={6} md={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Quantidade"
            name={Machine.Quantity}
            inputRef={register()}
            error={!!errors[Machine.Quantity]}
            helperText={errors[Machine.Quantity]?.message}
            type="number"
            defaultValue="0"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Potência"
            name={Machine.Power}
            inputRef={register()}
            error={!!errors[Machine.Power]}
            helperText={errors[Machine.Power]?.message}
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
              name={Machine.Type}
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

export default CreateMachine;
