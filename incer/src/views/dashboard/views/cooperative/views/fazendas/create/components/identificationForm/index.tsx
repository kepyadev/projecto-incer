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
import React, { FC, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import Loading from '../../../../../../../../../components/Loading';
import { Fazenda, Producer } from '../../../../../../../../../constants/entities';
import { ContactInformation } from '../../../../../../../../../constants/sub-entites';
import { User } from '../../../../../../../../../constants/user';
import {
  AuthContext,
  AuthContextData,
} from '../../../../../../../../../context/auth';
import useAsyncState from '../../../../../../../../../hooks/use-async-state';
import { getAllProducersByCooperative } from '../../../../../../../../../services/cooperative';
import { IProducer } from '../../../../../../../../../types/producer';
import { UserRole } from '../../../../../../../../../types/user';
import { FormStepProps } from '../../create.types';
import validationSchema from './identification.validation';

export type IndetificationProps = FormStepProps & { producerIn?: IProducer };

const IdentificationForm: FC<IndetificationProps> = ({
  onNext = () => {},
  // onClose,
  fazenda: fazendaEdit,
  producerIn,
}) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [producers, setProducers] = useState<IProducer[] | undefined>();
  const [producer, setProducer] = useState<string>();
  const { user } = useContext(AuthContext) as AuthContextData;
  const { error, setError, loading, setLoading } = useAsyncState();

  useEffect(() => {
    setLoading(true);
    getAllProducersByCooperative()
      .then(response => {
        setProducers(response.data?.payload.data);
      })
      .catch(() => {
        setError(new Error('Lamentamos, ocorreu algum erro!'));
      })
      .finally(() => {
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = handleSubmit(data => {
    if (producer === undefined) {
      return;
    }
    const fazenda = {
      [Fazenda.Descricao]: data[Fazenda.Descricao],
      [Fazenda.Nif]: data[Fazenda.Nif],
      [Fazenda.Gerencia]: data[Fazenda.Gerencia],
      [Fazenda.Contact]: {
        [ContactInformation.Phone]: data[ContactInformation.Phone],
        [ContactInformation.Email]: data[ContactInformation.Email],
      },
      [Fazenda.Producer]: producer,
    };
    localStorage.setItem('fazenda', JSON.stringify(fazenda));

    onNext();
  });

  const handleChangeProducer = (event: any) => {
    setProducer(event.target.value);
  };

  if (error)
    return (
      <Alert severity="warning">
        {' '}
        <Typography>{error.message}</Typography>
      </Alert>
    );

  if (loading) return <Loading />;

  if (!producers && !producer)
    return (
      <Alert severity="warning">
        {' '}
        <Typography>
          Não existem produtores cadastrados, deste modo não é possível cadastrar
          fazendas
        </Typography>
      </Alert>
    );

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            name={Fazenda.Descricao}
            label="Nome/Descrição"
            variant="outlined"
            fullWidth
            inputRef={register()}
            defaultValue={(fazendaEdit && fazendaEdit[Fazenda.Descricao]) || ''}
            error={!!errors[Fazenda.Descricao]}
            helperText={errors[Fazenda.Descricao]?.message}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            name={Fazenda.Nif}
            label="NIF"
            variant="outlined"
            fullWidth
            inputRef={register()}
            defaultValue={(fazendaEdit && fazendaEdit[Fazenda.Nif]) || ''}
            error={!!errors[Fazenda.Nif]}
            helperText={errors[Fazenda.Nif]?.message}
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <TextField
            name={Fazenda.Gerencia}
            label="Gerencia"
            variant="outlined"
            fullWidth
            inputRef={register()}
            defaultValue={(fazendaEdit && fazendaEdit[Fazenda.Gerencia]) || ''}
            error={!!errors[Fazenda.Gerencia]}
            helperText={errors[Fazenda.Gerencia]?.message}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            name={ContactInformation.Phone}
            label="Telefone"
            variant="outlined"
            type="number"
            fullWidth
            inputRef={register()}
            defaultValue={
              (fazendaEdit &&
                fazendaEdit[Fazenda.Contact][ContactInformation.Phone]) ||
              ''
            }
            error={!!errors[ContactInformation.Phone]}
            helperText={errors[ContactInformation.Phone]?.message}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            name={ContactInformation.Email}
            label="E-mail"
            variant="outlined"
            fullWidth
            inputRef={register()}
            defaultValue={
              (fazendaEdit &&
                fazendaEdit[Fazenda.Contact][ContactInformation.Email]) ||
              ''
            }
            error={!!errors[ContactInformation.Email]}
            helperText={errors[ContactInformation.Email]?.message}
          />
        </Grid>
        {!fazendaEdit &&
          !producerIn &&
          user !== null &&
          user[User.Role] !== UserRole.Producer && (
            <FormControl
              variant="outlined"
              style={{ width: '100%' }}
              error={!!errors.producer} // Adicionado para exibir erro
            >
              <InputLabel id="producer-label">Produtor</InputLabel>
              <Select
                labelId="producer-label"
                id="producer"
                value={producer}
                onChange={handleChangeProducer}
                fullWidth
                label="Produtor"
                name="producer"
                inputRef={register()} // Já pega o ref do react-hook-form
              >
                <MenuItem value={undefined} key={v4()}>
                  Selecione um produtor
                </MenuItem>
                {producers &&
                  producers.map(prod => {
                    return (
                      <MenuItem value={prod[Producer.Id]} key={v4()}>
                        {prod[Producer.User][User.Name] ||
                          `${prod[Producer.User][User.FirstName]} ${
                            prod[Producer.User][User.LastName]
                          }`}
                      </MenuItem>
                    );
                  })}
              </Select>
              {!producer && (
                <FormHelperText style={{ color: '#ff0000' }}>
                  Por favor selecione um produtor
                </FormHelperText>
              )}
            </FormControl>
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
              Próximo
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default IdentificationForm;
