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

import Loading from '../../../../../../../components/Loading';
import SnackMessage from '../../../../../../../components/snack-message';
import {
  Culture,
  CultureType,
  Fazenda,
  Producer,
} from '../../../../../../../constants/entities';
import { Animal, AnimalType } from '../../../../../../../constants/sub-entites';
import { User } from '../../../../../../../constants/user';
import useAsyncState from '../../../../../../../hooks/use-async-state';
import { getAllCulturasTypes } from '../../../../../../../services/culturas_type';
import {
  addCultureToFazenda,
  getAllFazendaByProducerId,
} from '../../../../../../../services/fazenda';
import { getAllProducers } from '../../../../../../../services/producer';
import {
  CultureDTO,
  ICultureType,
  IIrrigacao,
} from '../../../../../../../types/culture';
import { IFazenda } from '../../../../../../../types/fazenda';
import { IProducer } from '../../../../../../../types/producer';
import validationSchema from './create.validation';

interface ICreateCulturaTechnician {
  modalHandleClose: () => void;
}
const CreateCulturaTechnician: FC<ICreateCulturaTechnician> = ({
  modalHandleClose,
}) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [culturas, setCulturas] = useState<ReadonlyArray<ICultureType>>();
  const [cultura, setCultura] = useState<string>();
  const [fazenda, setFazenda] = useState<string>();
  const [fazendas, setFazendas] = useState<IFazenda[]>();
  const [_producer, setProducer] = useState<string>();
  const [producers, setProducers] = useState<IProducer[]>();
  const [cooperative, setCooperative] = useState<string>();
  const [irrigacao, setIrrigacao] = useState<IIrrigacao>('Irrigada');
  const { snackMessage, setSnackMessage, loading, setLoading } = useAsyncState();
  const [noFazendas, setNoFazendas] = useState(false);
  useEffect(() => {
    setLoading(true);
    getAllCulturasTypes()
      .then(res => {
        setCulturas(res.data?.payload.data);
        if (culturas) setCultura(culturas[0][CultureType.Id]);
      })
      .catch((erro: Error) => {
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

  useEffect(() => {
    setLoading(true);
    getAllProducers()
      .then(response => {
        setProducers(response.data?.payload.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChangeProducer = (e: any) => {
    const producerId = e.target.value;
    setProducer(producerId);

    getAllFazendaByProducerId(producerId)().then(response => {
      setFazendas(response.data?.payload.data);
      if (response.data?.payload.count === 0) setNoFazendas(true);
      else setNoFazendas(false);
    });
  };

  const handleChangeCultura = (e: any) => {
    setCultura(e.target.value);
  };

  const handleChangeFazenda = (e: any) => {
    setFazenda(e.target.value);

    const f = fazendas?.find(element => {
      return element[Fazenda.Id] === e.target.value;
    });

    setCooperative(f![Fazenda.Cooperative]);
  };

  // const findProducer = (producerId: string): IProducer | undefined => {
  //   return producers?.filter(producerItem => {
  //     return producerItem[Producer.Id] === producerId;
  //   })[0];
  // };

  const handleChangeIrrigacao = (e: any) => {
    setIrrigacao(e.target.value);
  };
  const onSubmit = handleSubmit(data => {
    const dataToSend: CultureDTO = {
      ...data,
      [Culture.Type]: cultura!,
      [Culture.Irrigacao]: irrigacao,
      [Culture.Fazenda]: fazenda!,
      [Culture.DataColheita]: data[Culture.DataColheita],
      [Culture.DataSementeira]: data[Culture.DataSementeira],
      [Culture.AgriculturalYear]: data[Culture.AgriculturalYear],
      [Culture.Cooperative]: cooperative,
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
      });
  });

  if (loading) return <Loading />;

  if (culturas === undefined || !producers)
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
      {noFazendas && (
        <Alert severity="warning">
          {' '}
          <Typography>
            Lamentamos, o produtor deve ter no minímo uma fazenda cadastrada!
          </Typography>
        </Alert>
      )}
      <Grid container spacing={2}>
        {culturas && (
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <InputLabel id="tipo-label">Tipo</InputLabel>
              <Select
                labelId="tipo-label"
                id="tipo"
                value={cultura}
                onChange={handleChangeCultura}
                fullWidth
                label="Tipo"
                name={Animal.Type}
                placeholder="Tipo"
                inputRef={register()}
                variant="outlined"
              >
                <MenuItem key={v4()}>Selecionar uma opção</MenuItem>

                {culturas.map(animalItem => {
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
        <Grid item xs={12} sm={12} md={6}>
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
            type="text"
            placeholder="Ex: 2024"
            required
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {producers && (
          <Grid item xs={12} sm={12}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <InputLabel id="producer-label">Produtor</InputLabel>
              <Select
                labelId="producer-label"
                id="producer"
                onChange={handleChangeProducer}
                fullWidth
                label="Produtor"
                name={Fazenda.Producer}
                placeholder="Produtor"
                inputRef={register()}
                variant="outlined"
              >
                <MenuItem value={undefined} key={v4()}>
                  Selecione um produtor
                </MenuItem>
                {producers.map(producerItem => {
                  return (
                    <MenuItem value={producerItem[Producer.Id]} key={v4()}>
                      {`${producerItem[Producer.User][User.FirstName]} ${
                        producerItem[Producer.User][User.LastName]
                      }`}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        )}
        {fazendas && (
          <Grid item xs={12} sm={12}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <InputLabel id="fazenda-label">Fazenda</InputLabel>
              <Select
                labelId="fazenda-label"
                id="fazendas"
                onChange={handleChangeFazenda}
                fullWidth
                label="Fazenda"
                name={Fazenda.Producer}
                placeholder="Fazenda"
                inputRef={register()}
                variant="outlined"
              >
                <MenuItem key={v4()}>Selecionar uma opção</MenuItem>

                {fazendas.map(fazendaItem => {
                  return (
                    <MenuItem value={fazendaItem[Fazenda.Id]} key={v4()}>
                      {fazendaItem[Fazenda.Descricao]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
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
export default CreateCulturaTechnician;
