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
  Infraestrutura,
  InfraestruturaType,
} from '../../../../../../../../../../constants/sub-entites';
import useAsyncState from '../../../../../../../../../../hooks/use-async-state';
import { addInfraestruturaToFazenda } from '../../../../../../../../../../services/fazenda';
import { getAllInfraestruturaType } from '../../../../../../../../../../services/infraestruturas-type';
import {
  IInfraestruturaType,
  InfraestruturaDTO,
} from '../../../../../../../../../../types';
import { CreateEquipamentoProps } from '../../machines/createEquipamentos/create-equipamento.types';
import validationSchema from './create-infraestrutura.validation';

const CreateInfraestrutura: FC<CreateEquipamentoProps> = ({
  fazendaId,
  onClose,
}) => {
  const [infraestrutura, setInfraestrutura] = useState<string>();
  const [infraestruturas, setInfraestruturas] =
    useState<ReadonlyArray<IInfraestruturaType>>();
  const [unidades] = useState<string[]>(['t', 'm³', 'm²']);
  const [unidade, setUnidade] = useState<'t' | 'm³' | 'm²'>('t');
  const { snackMessage, setSnackMessage, setLoading, loading } = useAsyncState();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setLoading(true);
    getAllInfraestruturaType()
      .then(res => {
        setInfraestruturas(res.data?.payload.data);
        if (infraestruturas && infraestruturas?.length > 0)
          setInfraestrutura(infraestruturas[0][InfraestruturaType.Id]);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeInfraestrutura = (e: any) => {
    setInfraestrutura(e.target.value);
  };

  const handleChangeUnidades = (e: any) => {
    setUnidade(e.target.value);
  };

  const onSubmit = handleSubmit(data => {
    setLoading(true);
    const dataToSend: InfraestruturaDTO = {
      ...data,
      [Infraestrutura.Type]: infraestrutura!,
      [Infraestrutura.Capacity]: data[Infraestrutura.Capacity],
      [Infraestrutura.Quantity]: data[Infraestrutura.Quantity],
      [Infraestrutura.Unidade]: unidade,
      [Infraestrutura.Fazenda]: fazendaId,
    };

    addInfraestruturaToFazenda(dataToSend)
      .then(res => {
        setSnackMessage({
          isError: false,
          message: res.data?.msg || 'Infraestrutura cadastrar',
        });
        onClose();
      })
      .catch((erro: any) => {
        setSnackMessage({
          isError: true,
          message: `lamentamos, ocorreu algum erro: ${erro.msg}`,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  });

  if (loading) return <Loading />;

  if (!infraestruturas)
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
        {infraestruturas && (
          <Grid item xs={12} sm={12}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <InputLabel id="tipo-label">Tipo</InputLabel>
              <Select
                labelId="tipo-label"
                id="tipo"
                value={infraestrutura}
                onChange={handleChangeInfraestrutura}
                fullWidth
                label="Tipo"
                name={Infraestrutura.Type}
                placeholder="Tipo"
                inputRef={register()}
                variant="outlined"
              >
                <MenuItem key={v4()}>Selecionar uma opção</MenuItem>
                {infraestruturas.map(infraestruturaItem => {
                  return (
                    <MenuItem
                      value={infraestruturaItem[InfraestruturaType.Id]}
                      key={v4()}
                    >
                      {infraestruturaItem[InfraestruturaType.Description]}
                    </MenuItem>
                  );
                })}
              </Select>
              {!infraestrutura && (
                <FormHelperText style={{ color: '#ff0000' }}>
                  Por favor selecione uma Tipo
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
            name={Infraestrutura.Quantity}
            inputRef={register()}
            error={!!errors[Infraestrutura.Quantity]}
            helperText={errors[Infraestrutura.Quantity]?.message}
            type="number"
            defaultValue={0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Capacidade"
            name={Infraestrutura.Capacity}
            inputRef={register()}
            error={!!errors[Infraestrutura.Capacity]}
            helperText={errors[Infraestrutura.Capacity]?.message}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl variant="outlined" style={{ width: '100%' }}>
            <InputLabel id="unidade-label">Unidade</InputLabel>
            <Select
              labelId="unidade-label"
              id="unidade"
              value={unidade}
              onChange={handleChangeUnidades}
              fullWidth
              label="Unidade"
              name={Infraestrutura.Unidade}
              placeholder="Tipo"
              inputRef={register()}
              variant="outlined"
            >
              <MenuItem key={v4()}>Selecionar uma opção</MenuItem>
              {unidades.map(unidadeItem => {
                return (
                  <MenuItem value={unidadeItem} key={v4()}>
                    {unidadeItem}
                  </MenuItem>
                );
              })}
            </Select>
            {!unidade && (
              <FormHelperText style={{ color: '#ff0000' }}>
                Por favor selecione uma Unidade
              </FormHelperText>
            )}
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

export default CreateInfraestrutura;
