import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
// import { CloudUploadOutlined } from '@material-ui/icons';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';
// import { Upload } from 'antd';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import Loading from '../../../../../../components/Loading';
import SnackMessage from '../../../../../../components/snack-message';
import {
  Cooperative,
  County,
  Producer,
  Province,
} from '../../../../../../constants/entities';
import { ContactInformation } from '../../../../../../constants/sub-entites';
import { User } from '../../../../../../constants/user';
import { AuthContext, AuthContextData } from '../../../../../../context/auth';
import useAsyncState from '../../../../../../hooks/use-async-state';
import getAllProvinces from '../../../../../../services/province';
import { updateUserById } from '../../../../../../services/users';
import { ICounty, IProvince } from '../../../../../../types';
import { UserRole } from '../../../../../../types/user';
import validationSchema from './add-new.validation';

interface IAddNewProducer {
  modalHandleClose: () => void;
}

const UpdateUserInfo: FC<IAddNewProducer> = ({ modalHandleClose }) => {
  const { user } = useContext(AuthContext) as AuthContextData;

  const { errors, register, handleSubmit, watch } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      [User.Role]: user?.[User.Role],
      [User.FirstName]: user?.[User.FirstName] || '',
      [User.LastName]: user?.[User.LastName] || '',
      [User.Email]: user?.[User.Email] || '',
      [User.Phone]: user?.[User.Phone] || '',
      [Producer.Nif]: user?.[User.Nif] || '', // Foto do usuário
      [User.Photo]: user?.[User.Photo] || '', // Foto do usuário
      [User.President]: user?.[User.President] || '', // Foto do usuário
    },
  });

  const { setSnackMessage, snackMessage, loading, setLoading, setError } =
    useAsyncState();
  const [provinces, setProvinces] = useState<IProvince[]>();
  const [countys, setCountys] = useState<ICounty[]>();

  const [province, setProvince] = useState<string>();
  const [county, setCounty] = useState<string>();
  const producerType = watch(Producer.isProducer);
  // const [imageUrl, setImageUrl] = useState<string | undefined>(user?.photo);

  /*   const handleImageChange = (info: any) => {
    if (info.file.status === 'done') {
      setImageUrl(info.file.response?.payload); // Supondo que a resposta tenha a URL da imagem
      setValue('photo', info.file.response?.url); // Atualiza o campo 'photo' com a URL da imagem
    } else if (info.file.status === 'error') {
      setSnackMessage({
        isError: true,
        message: 'Erro ao fazer upload da imagem',
      });
    }
  };
 */
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoading(true);
        const response = await getAllProvinces();
        setProvinces(response.data?.payload.data);

        if (user) {
          const selectedProvinceId =
            user?.[User.County][County.Province]![Province.Id];
          const selectedCountyId = user?.[User.County][County.Id];

          setProvince(selectedProvinceId);
          const provinceData = findProvince(
            response.data?.payload.data,
            selectedProvinceId
          );
          setCountys(provinceData?.countys);

          setCounty(selectedCountyId);
        }
      } catch {
        setError(new Error('Lamentamos, ocorreu um erro ao carregar os dados!'));
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const findProvince = (
    allProvinces: IProvince[] | undefined,
    provinceId: string
  ): IProvince | undefined => {
    return allProvinces?.filter(provinceItem => {
      return provinceItem[Province.Id] === provinceId;
    })[0];
  };

  const findCounty = (
    allCountys: ICounty[] | undefined,
    countyId: string
  ): ICounty | undefined => {
    return allCountys?.filter(countyItem => {
      return countyItem[County.Id] === countyId;
    })[0];
  };

  const handleChangeProvince = (value: any) => {
    setProvince(value.target.value);
    const pro = findProvince(provinces, value.target.value);
    setCountys(pro?.countys);
  };
  const handleChangeCounty = (value: any) => {
    // const coun = findCounty(countys, value.target.value);
    setCounty(value.target.value);
  };

  const onSubmit = async (data: any) => {
    if (!county) {
      return;
    }
    const selectedProvince = findProvince(provinces!, province!);
    const selectedCounty = findCounty(selectedProvince?.countys, county!);

    if (!selectedCounty || selectedCounty === undefined) {
      setCounty('');
      // eslint-disable-next-line consistent-return
      return;
    }

    /*   const fazendaLocalization = {
      localtizacao: {
        province: selectedProvince,
        county: selectedCounty,
      },
    };
    console.log(fazendaLocalization);
 */
    try {
      const especificInformation =
        user?.role === UserRole.Producer
          ? {
              [Producer.Nif]: data[Producer.Nif],
              [Producer.CompanyName]: data[Producer.CompanyName],
              [Producer.County]: selectedCounty,
            }
          : {
              [Cooperative.Contact]: {
                [ContactInformation.Phone]: data[User.Phone],
                [ContactInformation.Email]: data[User.Email],
              },
              [Cooperative.Nif]: data[Producer.Nif],
              [Cooperative.Description]: data[User.FirstName],
              [Cooperative.County]: selectedCounty,
              [Cooperative.Presindet]: data[Cooperative.Presindet],
            };
      const updated = {
        user: {
          [User.FirstName]: data[User.FirstName],
          [User.LastName]: data[User.LastName] || data[User.FirstName],
          [User.Email]: data[User.Email],
          [User.Phone]: data[User.Phone],
          [User.Password]: data[User.Password],
          [User.Role]: user?.role, // Garante que o 'topo singular' seja usado
          [User.County]: selectedCounty![County.Id],
          // [User.ImageUrl]: imageUrl,
        },
        especific_information: especificInformation,
      };

      updateUserById(user?.[User.Id]!, updated);
      modalHandleClose();
    } catch (error: any) {
      setSnackMessage({
        isError: true,
        message: error.message || 'Erro ao vincular produtor',
      });
    } finally {
      setLoading(false);
    }
  };

  const getNIFPlaceholder = () => {
    switch (producerType) {
      case 'business':
        return 'NIF Empresa (10 dígitos)';
      case 'foreign':
        return 'NIF Estrangeiro (9 dígitos)';
      default:
        return 'NIF Individual (formato: 000181960LA019)';
    }
  };

  if (loading) return <Loading />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {snackMessage && (
        <SnackMessage
          snackMessage={snackMessage}
          handleClose={() => setSnackMessage(null)}
        />
      )}

      <Grid container spacing={2}>
        {/* Company Name - Only for Business */}
        {producerType === 'business' && (
          <Grid item xs={12}>
            <TextField
              name={Producer.CompanyName}
              placeholder="Nome da empresa"
              variant="outlined"
              fullWidth
              inputRef={register}
              error={!!errors[Producer.CompanyName]}
              helperText={errors[Producer.CompanyName]?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        )}

        {/* Personal Information */}
        <Grid item xs={12} md={6}>
          <TextField
            name={User.FirstName}
            placeholder="Primeiro nome"
            variant="outlined"
            fullWidth
            inputRef={register}
            error={!!errors[User.FirstName]}
            helperText={errors[User.FirstName]?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            name={User.LastName}
            placeholder="Último nome"
            variant="outlined"
            fullWidth
            inputRef={register}
            error={!!errors[User.LastName]}
            helperText={errors[User.LastName]?.message}
          />
        </Grid>

        {/* NIF Field */}
        <Grid item xs={12}>
          <TextField
            name={Producer.Nif}
            placeholder={getNIFPlaceholder()}
            variant="outlined"
            fullWidth
            inputRef={register}
            error={!!errors[Producer.Nif]}
            helperText={errors[Producer.Nif]?.message}
          />
        </Grid>

        <Grid item md={6} sm={6} xs={12}>
          <FormControl variant="outlined" style={{ width: '100%' }}>
            <InputLabel id="province-label">Província</InputLabel>
            <Select
              name="province 3333"
              labelId="province-label"
              id="province"
              onChange={handleChangeProvince}
              fullWidth
              label="Província"
              defaultValue={province}
            >
              <MenuItem value={undefined} key={v4()}>
                Selecione uma provínvia
              </MenuItem>
              {provinces &&
                provinces.map(provinceItem => {
                  return (
                    <MenuItem value={provinceItem[Province.Id]} key={v4()}>
                      {provinceItem[Province.Description]}
                    </MenuItem>
                  );
                })}
            </Select>
            {!province && (
              <FormHelperText style={{ color: '#ff0000' }}>
                Por favor selecione uma província
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <FormControl variant="outlined" style={{ width: '100%' }}>
            <InputLabel id="county-label">Município</InputLabel>
            <Select
              labelId="county-label"
              id="county"
              defaultValue={county}
              onChange={handleChangeCounty}
              fullWidth
              label="Município"
              name="municipio"
              disabled={!countys}
            >
              <MenuItem value={undefined} key={v4()}>
                Selecione um município
              </MenuItem>
              {countys &&
                countys.map(countyItem => {
                  return (
                    <MenuItem value={countyItem[County.Id]} key={v4()}>
                      {countyItem[County.Description]}
                    </MenuItem>
                  );
                })}
            </Select>
            {!county && (
              <FormHelperText style={{ color: '#ff0000' }}>
                Por favor selecione um município
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        {/* Contact Information */}
        <Grid item xs={6}>
          <TextField
            name={User.Email}
            placeholder="E-mail"
            type="email"
            variant="outlined"
            fullWidth
            inputRef={register}
            error={!!errors[User.Email]}
            helperText={errors[User.Email]?.message}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            name={User.Phone}
            placeholder="Telefone"
            type="tel"
            variant="outlined"
            fullWidth
            inputRef={register}
            error={!!errors[User.Phone]}
            helperText={errors[User.Phone]?.message}
            inputProps={{
              maxLength: 9,
            }}
          />
        </Grid>
        {user?.role === UserRole.Cooperative && (
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              name={Cooperative.Presindet}
              placeholder="Presidente"
              variant="outlined"
              inputRef={register()}
              fullWidth
              required
              error={!!errors[Cooperative.Presindet]}
              helperText={errors[Cooperative.Presindet]?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        )}

        {/* Photo Upload */}
        {/*   <Grid item xs={12}>
          <Upload
            name="photo"
            showUploadList={false}
            action={`${process.env.REACT_APP_API_URL}users/${
              user?.[User.Id]
            }/upload`} // Substitua pelo endpoint do servidor de upload de imagens
            onChange={handleImageChange}
          >
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<CloudUploadOutlined />}
              fullWidth
            >
              {imageUrl ? 'Alterar Foto' : 'Carregar Foto'}
            </Button>
          </Upload>
        </Grid> */}

        {/* Submit Button */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default UpdateUserInfo;
