import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  TextField,
} from '@material-ui/core';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import ErrorFail from '../../../../../../../components/error-fail';
import Loading from '../../../../../../../components/Loading';
import SnackMessage from '../../../../../../../components/snack-message';
import { Partner } from '../../../../../../../constants/entities';
import { User } from '../../../../../../../constants/user';
import useAsyncState from '../../../../../../../hooks/use-async-state';
import { createPartner } from '../../../../../../../services/partner';
import { partnerDTO, UserRole } from '../../../../../../../types/user';
import { getSelectedPermitions, permitions } from './create.types';
import validationSchema from './create.validation';

interface ICreatePartnerView {
  close: () => void;
}
const CreatePartnerView: FC<ICreatePartnerView> = ({ close }) => {
  const { snackMessage, setSnackMessage, error, loading } = useAsyncState();

  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onChange = (value: any) => {
    console.log(value);
  };
  const onSubmit = handleSubmit(data => {
    console.log('DDDATA', data);
    const permitionsIn = getSelectedPermitions(permitions, data);

    // console.log('DATA', data);
    if (permitionsIn.length === 0) {
      setSnackMessage({
        isError: true,
        message: 'Selecione pelo menos uma permissāo',
      });
      return;
    }

    const partner: partnerDTO = {
      [Partner.MinisterioName]: data[Partner.MinisterioName],
      [Partner.User]: {
        [User.FirstName]: data[User.FirstName],
        [User.LastName]: data[User.LastName],
        [User.Email]: data[User.Email],
        [User.Phone]: data[User.Phone]! as unknown as number,
        [User.Role]: UserRole.GeneralAnalitic,
        [User.Permitions]: permitionsIn,
      },
    };

    createPartner(partner)
      .then(() => {
        setSnackMessage({
          isError: false,
          message: `Parceiro cadastrado`,
        });
        close();
      })
      .catch((erro: Error) => {
        setSnackMessage({
          isError: true,
          message: erro.message,
        });
      })
      .finally();
  });

  if (loading)
    return (
      <>
        <Loading />
      </>
    );

  if (error)
    return (
      <>
        <ErrorFail text={error.message} />
      </>
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
        <Grid item md={12} sm={12} xs={12}>
          <TextField
            placeholder="Ministério"
            variant="outlined"
            fullWidth
            inputRef={register()}
            name={Partner.MinisterioName}
            error={!!errors[Partner.MinisterioName]}
            helperText={errors[Partner.MinisterioName]?.message}
          />
        </Grid>
        <Grid item md={6} sm={6} xs={6}>
          <TextField
            placeholder="Parceiro"
            variant="outlined"
            fullWidth
            inputRef={register()}
            name={User.FirstName}
            error={!!errors[User.FirstName]}
            helperText={errors[User.FirstName]?.message}
          />
        </Grid>
        <Grid item md={6} sm={6} xs={6}>
          <TextField
            placeholder="Parceiro"
            variant="outlined"
            fullWidth
            inputRef={register()}
            name={User.LastName}
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
        <Grid item xs={12} style={{ textAlign: 'center', marginTop: '20px' }}>
          {/* <Chip label="Permissões" color="primary" variant="outlined" /> */}
          Permissões
          <hr />
        </Grid>
        <Divider />
        {permitions.map(permition => {
          const key = `permition.${Object.keys(permition)[0].slice(1)}`;
          // console.log('PERMITION1', Object.keys(permition));
          // console.log('PERMITION', Object.keys(permition)[0].slice(1));
          const value = Object.values(permition)[0];
          // console.log('PER', value);

          return (
            <Grid item md={3} sm={12} key={v4()}>
              <FormControlLabel
                control={
                  <Checkbox
                    inputRef={register()}
                    name={key}
                    onChange={() => {
                      // // console.log(key, 'SELECTED');
                      // console.log(e.target.value, 'CHECKED');
                      // sele.filter((ele, index) => {
                      //   console.log(
                      //     '-----------------------------------------------------'
                      //   );
                      //   // console.log('EEEEL', ele);
                      //   console.log('EHHEL', index);
                      //   console.log(`${ele}!==${key}`);
                      //   console.log('EHOOOL', ele !== key);
                      //   return ele !== key;
                      // });
                      // if (!sele.includes(key)) {
                      //   sele.push(key);
                      // } else {
                      //   // delete sele[key];
                      // }
                      // console.log(sele, 'SELECTEDDDDD');
                    }}
                  />
                }
                label={value}
              />
            </Grid>
          );
        })}
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

export default CreatePartnerView;
