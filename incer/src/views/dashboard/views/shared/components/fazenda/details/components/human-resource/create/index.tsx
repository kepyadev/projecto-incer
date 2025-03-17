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
  HumanResource,
  HumanResourceType,
} from '../../../../../../../../../../constants/sub-entites';
import useAsyncState from '../../../../../../../../../../hooks/use-async-state';
import { addHumanResource } from '../../../../../../../../../../services/fazenda';
import { getAllHumanResourcesType } from '../../../../../../../../../../services/human-resource-type';
import {
  HumanResourceDTO,
  IHumanResourceType,
} from '../../../../../../../../../../types';
import { CreateHumanResourceProps } from './create.types';
import validationSchema from './create.validation';

const CreateHumanResource: FC<CreateHumanResourceProps> = ({
  fazendaId,
  onClose,
}) => {
  const [humanResources, setHumanResources] = useState<IHumanResourceType[]>();
  const [humanResourceType, setHumanResourceType] = useState<string>();
  const { snackMessage, setSnackMessage, loading, setLoading } = useAsyncState();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setLoading(true);
    getAllHumanResourcesType()
      .then(res => {
        setHumanResources(res.data?.payload.data);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = handleSubmit(data => {
    setLoading(true);

    const dataToSend: HumanResourceDTO = {
      ...data,
      [HumanResource.FazendaId]: fazendaId,
      [HumanResource.Type]: humanResourceType!,
    };

    addHumanResource(dataToSend)
      .then(response => {
        setSnackMessage({
          isError: false,
          message: response.data?.msg || 'Recurso humano cadastrado com sucesso',
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

  const handleChangeHumanResourceType = (e: any) => {
    setHumanResourceType(e.target.value);
  };

  if (loading) return <Loading />;

  if (humanResources === undefined && !loading)
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
        {humanResources && (
          <Grid item xs={12}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <InputLabel id="tipo-label">Função</InputLabel>
              <Select
                labelId="tipo-label"
                id="tipo"
                value={humanResourceType}
                onChange={handleChangeHumanResourceType}
                fullWidth
                label="Tipo"
                name={HumanResource.Type}
                placeholder="Tipo"
                variant="outlined"
              >
                <MenuItem key={v4()}>Selecionar uma opção</MenuItem>
                {humanResources.map(humanResourceTypeItem => {
                  return (
                    <MenuItem
                      value={humanResourceTypeItem[HumanResourceType.Id]}
                      key={v4()}
                    >
                      {humanResourceTypeItem[HumanResourceType.Description]}
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
            name={HumanResource.Quantity}
            inputRef={register()}
            error={!!errors[HumanResource.Quantity]}
            helperText={errors[HumanResource.Quantity]?.message}
            type="number"
            defaultValue="0"
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
  );
};

export default CreateHumanResource;
