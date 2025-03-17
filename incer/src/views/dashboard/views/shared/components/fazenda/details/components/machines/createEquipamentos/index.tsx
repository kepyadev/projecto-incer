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

import Loading from '../../../../../../../../../../components/Loading';
import SnackMessage from '../../../../../../../../../../components/snack-message';
import {
  Alfaia,
  Equipamento,
} from '../../../../../../../../../../constants/sub-entites';
import useAsyncState from '../../../../../../../../../../hooks/use-async-state';
import { getAllEquipamentosType } from '../../../../../../../../../../services/equipamento-type';
import { addEquipamentoToFazenda } from '../../../../../../../../../../services/fazenda';
import {
  EquipamentoDTO,
  IEquipamentoType,
} from '../../../../../../../../../../types';
import validationSchema from './create.validation';
import { CreateEquipamentoProps } from './create-equipamento.types';

const CreateEquipamento: FC<CreateEquipamentoProps> = ({ fazendaId, onClose }) => {
  const [equipamentoTypes, setEquipamentoTypes] =
    useState<ReadonlyArray<IEquipamentoType>>();
  const [alfaia, setAlfaia] = useState<string>();
  const { snackMessage, setSnackMessage, loading, setLoading } = useAsyncState();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setLoading(true);
    getAllEquipamentosType()
      .then(res => {
        setEquipamentoTypes(res.data?.payload.data);
      })
      .catch((_erro: any) => {})
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeAlfaia = (e: any) => {
    setAlfaia(e.target.value);
  };

  const submit = handleSubmit(data => {
    setLoading(true);
    const dataToSend: EquipamentoDTO = {
      ...data,
      [Equipamento.Alfaia]: alfaia!,
      [Equipamento.Caracteristicas]: data[Equipamento.Caracteristicas],
      [Equipamento.Quantity]: data[Equipamento.Quantity],
      [Equipamento.FazendaId]: fazendaId,
    };

    addEquipamentoToFazenda(dataToSend)
      .then(res => {
        setSnackMessage({
          isError: false,
          message: res.data?.msg || 'Equipamento adicionado!',
        });
        onClose();
      })
      .catch((erro: any) => {
        setSnackMessage({ isError: true, message: erro.msg });
      })
      .finally(() => {
        setLoading(false);
      });
  });

  if (loading) return <Loading />;

  if (!equipamentoTypes)
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
    <form onSubmit={submit}>
      {snackMessage && (
        <SnackMessage
          snackMessage={snackMessage}
          handleClose={() => {
            setSnackMessage(null);
          }}
        />
      )}
      <Grid container spacing={2}>
        {equipamentoTypes && (
          <Grid item xs={12}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <InputLabel id="tipo-label">Tipo</InputLabel>
              <Select
                labelId="tipo-label"
                id="tipo"
                value={alfaia}
                onChange={handleChangeAlfaia}
                fullWidth
                label="Tipo"
                name={Equipamento.Alfaia}
                placeholder="Tipo"
                variant="outlined"
              >
                <MenuItem key={v4()}>Selecionar uma opção</MenuItem>

                {equipamentoTypes.map(equipamentoItem => {
                  return (
                    <MenuItem value={equipamentoItem[Alfaia.Id]} key={v4()}>
                      {equipamentoItem[Alfaia.Description]}
                    </MenuItem>
                  );
                })}
              </Select>
              {!alfaia && (
                <FormHelperText style={{ color: '#ff0000' }}>
                  Por favor, selecione uma Equipamento
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
            name={Equipamento.Quantity}
            inputRef={register()}
            error={!!errors[Equipamento.Quantity]}
            helperText={errors[Equipamento.Quantity]?.message}
            type="number"
            defaultValue="0"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Características"
            name={Equipamento.Caracteristicas}
            inputRef={register()}
            error={!!errors[Equipamento.Caracteristicas]}
            helperText={errors[Equipamento.Caracteristicas]?.message}
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
            <Button variant="contained" color="primary" type="submit">
              Salvar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};
export default CreateEquipamento;
