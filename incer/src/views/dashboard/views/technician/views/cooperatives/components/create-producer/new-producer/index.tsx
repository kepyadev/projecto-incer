import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Loading from '../../../../../../../../../components/Loading';
import ProvinceComponent from '../../../../../../../../../components/province';
import SnackMessage from '../../../../../../../../../components/snack-message';
import { County, Producer } from '../../../../../../../../../constants/entities';
import { User } from '../../../../../../../../../constants/user';
import useAsyncState from '../../../../../../../../../hooks/use-async-state';
import getAllProvinces from '../../../../../../../../../services/province';
import { addNewProducerWithCooperativeTechnician } from '../../../../../../../../../services/technician';
import { IProvince } from '../../../../../../../../../types';
import { ProducerDTO } from '../../../../../../../../../types/producer';
import { UserRole } from '../../../../../../../../../types/user';
import validationSchema from './producer.validation';

interface IAddNewProducerTechnician {
  cooperativeId: string | null;
  modalHandleClose: () => void;
}
const AddNewProducerOnCooperativeTechnician: FC<IAddNewProducerTechnician> = ({
  cooperativeId,
  modalHandleClose,
}) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { setSnackMessage, snackMessage, loading, setLoading } = useAsyncState();
  const [provinces, setProvinces] = useState<IProvince[]>();
  const [county, setCounty] = useState<string>();
  // const { user } = useContext(AuthContext) as AuthContextData;
  const handleChangeProvince = (_value: string) => {};

  const handleChangeCounty = (value: string) => {
    setCounty(value);
  };

  useEffect(() => {
    setLoading(true);
    getAllProvinces()
      .then(response => [setProvinces(response.data?.payload.data)])
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (value: any) => {
    console.log(value);
  };
  const onSubmit = handleSubmit(data => {
    setLoading(true);
    if (!county) {
      setSnackMessage({
        isError: true,
        message: 'Por favor, selecione um municipio!',
      });
      return null;
    }

    const producerData: ProducerDTO = {
      [Producer.Nif]: data[Producer.Nif],
      [Producer.CompanyName]: data[Producer.CompanyName],
      [Producer.isProducer]: data[Producer.isProducer],
      [Producer.County]: county,
      [Producer.Cooperative]: cooperativeId || '',
      [Producer.User]: {
        [User.FirstName]: data[User.FirstName],
        [User.LastName]: data[User.LastName],
        [User.Email]: data[User.Email],
        [User.Phone]: data[User.Phone]! as unknown as number,
        [User.Role]: UserRole.Producer,
      },
    };

    addNewProducerWithCooperativeTechnician(producerData)
      .then(_response => {
        setSnackMessage({
          isError: false,
          message: `Produtor foi vinculado a cooperativa`,
        });
        modalHandleClose();
      })
      .catch((error: Error) => {
        setSnackMessage({
          isError: true,
          message: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });

    return null;
  });

  if (loading) return <Loading />;

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
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            placeholder="Primeiro nome"
            variant="outlined"
            required
            fullWidth
            inputRef={register()}
            name={User.FirstName}
            error={!!errors[User.FirstName]}
            helperText={errors[User.FirstName]?.message}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            placeholder="Último nome"
            required
            variant="outlined"
            fullWidth
            inputRef={register()}
            name={User.LastName}
            error={!!errors[User.LastName]}
            helperText={errors[User.LastName]?.message}
          />
        </Grid>
        {/* <Grid item md={6} sm={12} xs={12}>
            <TextField
              placeholder="Nº de bilhete de indentidade"
              variant="outlined"
              fullWidth
              inputRef={register()}
              name={Producer.Bi}
              error={!!errors[Producer.Bi]}
              helperText={errors[Producer.Bi]?.message}
            />
          </Grid> */}
        <Grid item md={12} sm={12} xs={12}>
          <TextField
            placeholder="Nº de identificação fiscal"
            variant="outlined"
            fullWidth
            inputRef={register()}
            name={Producer.Nif}
            error={!!errors[Producer.Nif]}
            helperText={errors[Producer.Nif]?.message}
          />
        </Grid>
        <ProvinceComponent
          provinces={provinces}
          handleChangeOfProvince={handleChangeProvince}
          handleChangeOfCounty={handleChangeCounty}
          lg={6}
          md={6}
          returnOfCounty={County.Id}
        />
        <Grid item md={12} sm={12} xs={12}>
          <TextField
            placeholder="E-mail"
            variant="outlined"
            fullWidth
            inputRef={register()}
            name={User.Email}
            error={!!errors[User.Email]}
            helperText={errors[User.Email]?.message}
            type="email"
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <TextField
            placeholder="Telefone"
            variant="outlined"
            fullWidth
            name={User.Phone}
            error={!!errors[User.Phone]}
            helperText={errors[User.Phone]?.message}
            type="tel"
            InputProps={{
              inputProps: {
                maxLength: 9,
              }, // Limite máximo para navegadores que suportam
            }}
            onChange={e => {
              const newValue = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
              if (newValue.length <= 9) {
                onChange(newValue); // Permite apenas até 9 números
              }
            }}
            inputRef={register({ maxLength: 9 })}
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
            {/* <Button
              variant="text"
              color="primary"
              onClick={() => {
                modalHandleClose();
              }}
            >
              Cancelar
            </Button> */}
            <Button variant="contained" color="primary" type="submit">
              Salvar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddNewProducerOnCooperativeTechnician;
