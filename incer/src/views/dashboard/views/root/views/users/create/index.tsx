import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import SnackMessage from '../../../../../../../components/snack-message';
import { User } from '../../../../../../../constants/user';
import useAsyncState from '../../../../../../../hooks/use-async-state';
import { createAdmin } from '../../../../../../../services/admin';
import { adminDTO } from '../../../../../../../types/user';
import { createAdminProps } from './create.types';
import validationSchema from './create.validation';

const CreateAdminView: FC<createAdminProps> = ({ onClose }) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { snackMessage, setSnackMessage } = useAsyncState();

  const onChange = (value: any) => {
    console.log(value);
  };
  const onSubmit = handleSubmit(data => {
    const user: adminDTO = {
      [User.FirstName]: data[User.FirstName],
      [User.LastName]: data[User.LastName],
      [User.Email]: data[User.Email],
      [User.Phone]: data[User.Phone]! as unknown as number,
    };

    createAdmin(user)
      .then(response => {
        setSnackMessage({
          isError: false,
          message: `Administrador ${response.data?.payload[User.FirstName]} ${
            response.data?.payload[User.LastName]
          } cadastrado`,
        });
        onClose();
      })
      .catch((error: Error) => {
        console.log(JSON.stringify(error.stack));
        setSnackMessage({
          isError: true,
          message: error.message,
        });
      })
      .finally();
  });

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
            variant="outlined"
            fullWidth
            inputRef={register()}
            name={User.LastName}
            required
            error={!!errors[User.LastName]}
            helperText={errors[User.LastName]?.message}
          />
        </Grid>
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
            type="tel" // Melhor opção para números de telefone
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

export default CreateAdminView;
