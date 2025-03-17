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
import { DatePicker, Space } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import Loading from '../../../../../../../components/Loading';
import SnackMessage from '../../../../../../../components/snack-message';
import {
  Cooperative,
  Culture,
  CultureType,
  Producer,
} from '../../../../../../../constants/entities';
import { User } from '../../../../../../../constants/user';
import useAsyncState from '../../../../../../../hooks/use-async-state';
import { getAllProducersByCooperative } from '../../../../../../../services/cooperative';
import { getAllCulturasTypes } from '../../../../../../../services/culturas_type';
import {
  addCultureToFazenda,
  getAllFazendaByProducerId,
} from '../../../../../../../services/fazenda';
import {
  CultureDTO,
  ICultureType,
  IIrrigacao,
} from '../../../../../../../types/culture';
import { IFazenda } from '../../../../../../../types/fazenda';
import { IProducer } from '../../../../../../../types/producer';
import { getCooperativeLogged } from '../../../../../../../utils';
import { CreateCulturaProps } from './create.types';
import validationSchema from './create.validation';

const { RangePicker } = DatePicker;

const CreateCultura: FC<CreateCulturaProps> = ({ modalHandleClose }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [culturasType, setCulturasType] = useState<ReadonlyArray<ICultureType>>();
  const [culturaType, setCulturaType] = useState<string>();
  const [irrigacao, setIrrigacao] = useState<IIrrigacao>('Irrigada');
  const { snackMessage, setSnackMessage, loading, setLoading, setError, error } =
    useAsyncState();
  const [cooperativeId, setCooperativeId] = useState<string>();
  const [fazenda, setFazenda] = useState<string>();
  const [fazendas, setFazendas] = useState<IFazenda[]>();
  const [producers, setProducers] = useState<IProducer[]>();

  useEffect(() => {
    setLoading(true);
    getAllCulturasTypes()
      .then(res => {
        setCulturasType(res.data?.payload.data);
        if (culturasType) setCulturaType(culturasType[0][CultureType.Id]);
      })
      .catch((_erro: Error) => {
        setError(
          new Error('Lamentamos, ocorreu um erro ao carregar os tipos de culturas!')
        );
        // setSnackMessage({
        //   isError: true,
        //   message: erro.message,
        // });
      })
      .finally(() => {
        setLoading(false);
      });

    setCooperativeId(getCooperativeLogged()[Cooperative.Id]);

    setLoading(true);
    getAllProducersByCooperative()
      .then(res => {
        setProducers(res.data?.payload.data);
        console.log('PRODUCER', res.data?.payload.data);
        if (producers?.length === 0 || res.data?.payload.count === 0)
          setError(
            new Error(
              'Por favor, certifique-se que tem pelo menos um produtor na sua cooperativa!'
            )
          );
      })
      .catch(() => {
        setError(
          new Error('Lamentamos, ocorreu um erro ao carregar os seus produtores!')
        );
      })
      .finally(() => {
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeCultura = (e: any) => {
    setCulturaType(e.target.value);
  };

  const handleChangeIrrigacao = (e: any) => {
    setIrrigacao(e.target.value);
  };

  const handleChangeProducer = (e: any) => {
    const f = findProducer(e.target.value, producers!);
    getAllFazendaByProducerId(e.target.value)().then(response => {
      setFazendas(response.data?.payload.data);
      if (response.data?.payload.count === 0)
        setError(
          new Error('Lamentamos, o produtor deve ter pelo menos uma fazenda!')
        );
    });
    if (f === undefined)
      setError(new Error('Lamentamos, o produtor deve ter pelo menos uma fazenda!'));
  };

  const handleChangeFazenda = (e: any) => {
    setFazenda(e.target.value);
  };

  const findProducer = (id: string, producersIn: IProducer[]) => {
    return producersIn.filter(item => {
      return item[Producer.Id] === id;
    })[0];
  };
  const onSubmit = handleSubmit(data => {
    if (!fazenda) {
      setError(new Error('Por favor, selecione uma fazenda!'));
      return;
    }
    setLoading(true);
    if (cooperativeId) {
      const dataToSend: CultureDTO = {
        ...data,
        [Culture.Type]: culturaType!,
        [Culture.Irrigacao]: irrigacao,
        [Culture.Fazenda]: fazenda,
        [Culture.AgriculturalYear]: data[Culture.AgriculturalYear],
        [Culture.Cooperative]: cooperativeId,
        [Culture.DataSementeira]: data[Culture.DataSementeira],
      };

      addCultureToFazenda(dataToSend)
        .then(res => {
          setSnackMessage({
            isError: false,
            message: res.data?.msg || 'Cultura adicionada com sucesso!',
          });
          modalHandleClose();
        })
        .catch(erro => {
          setSnackMessage({
            isError: true,
            message: erro.msg || 'Lamentamos, ocorreu uma falha',
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError(
        new Error(
          'Lamentamos, ocorreu um erro a carregar as informacões da cooperativa!'
        )
      );
    }
  });

  if (loading) return <Loading />;

  if (culturasType === undefined)
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
      {error && (
        <Alert severity="warning" style={{ marginBottom: '10px' }}>
          {' '}
          <Typography>{error.message}</Typography>
        </Alert>
      )}
      {snackMessage && (
        <SnackMessage
          snackMessage={snackMessage}
          handleClose={() => {
            setSnackMessage(null);
          }}
        />
      )}
      <Grid container spacing={2}>
        {producers && (
          <Grid item xs={12} sm={12} md={fazendas ? 6 : 12}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <InputLabel id="tipo-label">Produtor</InputLabel>
              <Select
                labelId="tipo-label"
                id="tipo"
                onChange={handleChangeProducer}
                fullWidth
                label="Produtor"
                name="produtor"
                placeholder="Tipo"
                inputRef={register()}
                variant="outlined"
              >
                <MenuItem value={undefined} key={v4()}>
                  Selecione um produtor
                </MenuItem>
                {producers.map(produtorItem => {
                  return (
                    <MenuItem value={produtorItem[Producer.Id]} key={v4()}>
                      {`${produtorItem[Producer.User][User.FirstName]} ${
                        produtorItem[Producer.User][User.LastName]
                      }`}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        )}
        {fazendas && (
          <Grid item xs={12} sm={12} md={6}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <InputLabel id="tipo-label">Fazenda</InputLabel>
              <Select
                labelId="tipo-label"
                id="tipo"
                onChange={handleChangeFazenda}
                fullWidth
                label="Tipo"
                name={Culture.Fazenda}
                placeholder="Tipo"
                inputRef={register()}
                variant="outlined"
              >
                <MenuItem key={v4()}>Selecionar uma opção</MenuItem>
                {fazendas.map(cultureItem => {
                  return (
                    <MenuItem value={cultureItem[CultureType.Id]} key={v4()}>
                      {cultureItem[CultureType.Description]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        )}
        {culturasType && (
          <Grid item xs={12} sm={12}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <InputLabel id="tipo-label">Tipo</InputLabel>
              <Select
                labelId="tipo-label"
                id="tipo"
                onChange={handleChangeCultura}
                fullWidth
                label="Tipo"
                name={Culture.Type}
                placeholder="Tipo"
                inputRef={register()}
                variant="outlined"
              >
                <MenuItem key={v4()}>Selecionar uma opção</MenuItem>
                {culturasType.map(cultureItem => {
                  return (
                    <MenuItem value={cultureItem[CultureType.Id]} key={v4()}>
                      {cultureItem[CultureType.Description]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        )}

        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" style={{ width: '100%' }}>
            <InputLabel id="irrigacao-label">Irrigação</InputLabel>
            <Select
              labelId="irrigacao-label"
              id="county"
              value={irrigacao}
              onChange={handleChangeIrrigacao}
              fullWidth
              label="Tipo"
              name={Culture.Irrigacao}
              inputRef={register()}
              variant="outlined"
            >
              <MenuItem key={v4()}>Selecionar uma opção</MenuItem>
              <MenuItem value="Irrigada" key={v4()}>
                Irrigada
              </MenuItem>
              <MenuItem value="Parcialmente irrigada" key={v4()}>
                Parcialmente irrigada
              </MenuItem>
              <MenuItem value="Sequeiro" key={v4()}>
                Sequeiro
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Area"
            name={Culture.Ha}
            inputRef={register()}
            error={!!errors[Culture.Ha]}
            helperText={errors[Culture.Ha]?.message}
            type="number"
            defaultValue="0"
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Produção"
            name={Culture.Producao}
            inputRef={register()}
            error={!!errors[Culture.Producao]}
            helperText={errors[Culture.Producao]?.message}
            type="number"
            defaultValue="0"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Data de sementeira"
            name={Culture.DataSementeira}
            inputRef={register()}
            error={!!errors[Culture.DataSementeira]}
            helperText={errors[Culture.DataSementeira]?.message}
            type="date"
            required
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Data de colheita"
            name={Culture.DataColheita}
            inputRef={register()}
            error={!!errors[Culture.DataColheita]}
            helperText={errors[Culture.DataColheita]?.message}
            type="date"
            required
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Ano agricola"
            name={Culture.AgriculturalYear}
            inputRef={register()}
            error={!!errors[Culture.AgriculturalYear]}
            helperText={errors[Culture.AgriculturalYear]?.message}
            type="date"
            required
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Space direction="vertical" size={12}>
          <RangePicker
            picker="year"
            id={{
              start: 'startInput',
              end: 'endInput',
            }}
            onFocus={(_, info) => {
              console.log('Focus:', info.range);
            }}
            onBlur={(_, info) => {
              console.log('Blur:', info.range);
            }}
          />
        </Space>

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
export default CreateCultura;
