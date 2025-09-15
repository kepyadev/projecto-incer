import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ErrorFail from '../../../../../../../components/error-fail';
import ProvinceComponent from '../../../../../../../components/province';
import SnackMessage from '../../../../../../../components/snack-message';
import { County, Province } from '../../../../../../../constants/entities';
import { User } from '../../../../../../../constants/user';
import useAsyncState from '../../../../../../../hooks/use-async-state';
import getAllProvinces from '../../../../../../../services/province';
import { createTechnician } from '../../../../../../../services/technician';
import { IProvince } from '../../../../../../../types';
import { techinicianDTO, UserRole } from '../../../../../../../types/user';
import validationSchema from './create.validation';

interface ICreateTechnicianView {
  onClose: () => void;
}
const CreateTechnicianView: FC<ICreateTechnicianView> = ({ onClose }) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { snackMessage, setSnackMessage, error, setError, setLoading } =
    useAsyncState();
  const [provinces, setProvinces] = useState<IProvince[]>();
  const [_province, setProvince] = useState<string>();

  const [selectedCounty, setSelectdCounty] = useState<string>();

  useEffect(() => {
    setLoading(true);
    getAllProvinces()
      .then(response => {
        setProvinces(response.data?.payload.data);
      })
      .catch(() => {
        setError(
          Error('Lamentamos, ocorreu um erro ao carregar as províncias e município')
        );
      })
      .finally(() => {
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeProvince = (value: string) => {
    setProvince(value);
  };

  const handleChangeCounty = (value: string) => {
    setSelectdCounty(value);
  };

  const onChange = (value: any) => {
    console.log(value);
  };
  const onSubmit = handleSubmit(data => {
    setLoading(true);
    if (!selectedCounty) {
      setSnackMessage({
        isError: true,
        message: 'Por favor selecione uma província e município',
      });
      setError(Error('Por favor selecione uma província e município'));
      return null;
    }

    const user: techinicianDTO = {
      // [User.ImageUrl]: data[User.ImageUrl],
      [User.FirstName]: data[User.FirstName],
      [User.LastName]: data[User.LastName],
      [User.Email]: data[User.Email],
      [User.Phone]: data[User.Phone] as unknown as number,
      [User.Role]: UserRole.Technician,
      [User.County]: selectedCounty!,
    };

    try {
      createTechnician(user)
        .then(response => {
          setSnackMessage({
            isError: false,
            message: `Técnico ${response.data?.payload[User.FirstName]} ${
              response.data?.payload[User.LastName]
            } cadastrado`,
          });
          onClose();
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
    } catch (erro) {
      setError(
        new Error('lamentamos, ocorreu algum erro! Por favortente novamente.')
      );
    }

    return true;
  });

  if (error) <ErrorFail text={error.message} />;

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
            fullWidth
            inputRef={register()}
            required
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
        <Grid item md={6} sm={12} xs={12}>
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
        <Grid item md={6} sm={12} xs={12}>
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
        <ProvinceComponent
          xs={12}
          md={6}
          provinces={provinces}
          withCounty
          handleChangeOfProvince={handleChangeProvince}
          handleChangeOfCounty={handleChangeCounty}
          returnOfProvince={Province.Id}
          returnOfCounty={County.Id}
        />

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
            {/* <Button variant="text" color="primary" type="submit">
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

export default CreateTechnicianView;
