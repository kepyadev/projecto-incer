import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { FC } from 'react';

import InfoDetail from '../../../../../../../../../components/info-detail';
import { InfoField } from '../../../../../../../../../components/info-detail/infoDetail.types';
import Loading from '../../../../../../../../../components/Loading';
import {
  County,
  Fazenda,
  Producer,
} from '../../../../../../../../../constants/entities';
import { Geo, Ground } from '../../../../../../../../../constants/sub-entites';
import useAsyncState from '../../../../../../../../../hooks/use-async-state';
// import useAsyncState from '../../../../../../../../../hooks/use-async-state';
import {
  createFazenda,
  updateFazenda,
} from '../../../../../../../../../services/fazenda';
import { IFazendaData } from '../../../../../../../../../types/fazenda';
import { ConfirmationProps } from './confirmation.types';

const Confirmation: FC<ConfirmationProps> = ({
  onReset,
  setSnackMessage,
  fazenda: fazendaEdit,
  onClose,
}) => {
  const { loading, setLoading } = useAsyncState();
  const identification = localStorage.getItem('fazenda');
  const localization = localStorage.getItem('location');
  const ground = localStorage.getItem('ground');

  if (identification && localization && ground) {
    const idValues = JSON.parse(identification);
    const fields: InfoField[] = [
      { label: 'Descrição', value: idValues[Fazenda.Descricao] },
      { label: 'Nif', value: idValues[Fazenda.Nif] },
      { label: 'Gerencia', value: idValues[Fazenda.Gerencia] },
      { label: 'Telefone', value: idValues[Fazenda.Contact].phone },
      { label: 'E-mail', value: idValues[Fazenda.Contact].email },
    ];

    const localizationValues = JSON.parse(localization);
    const fieldsLocalization: InfoField[] = [
      {
        label: 'Provincia',
        value: localizationValues.localization.province.description,
      },
      {
        label: 'Municipio',
        value: localizationValues.localization.county.description,
      },
      {
        label: 'Estrada nacional mais próxima',
        value: localizationValues[Fazenda.Estradanacional],
      },
      {
        label: 'Distancia da estrada nacional',
        value: `${localizationValues[Fazenda.DistanciaEstrada]} Km`,
      },
    ];

    const groundValues = JSON.parse(ground);
    const fieldsGround: InfoField[] = [
      { label: 'Extensão', value: groundValues[Ground.extension] },
      { label: 'Altitude média', value: groundValues[Ground.AltitudeMedia] },
      { label: 'Orografia', value: groundValues[Ground.Orografia] },
      {
        label: 'Propriedades físicas',
        value: groundValues[Ground.PropriedadesFisicas],
      },
      { label: 'Area corrigida', value: groundValues[Ground.AreaCorrigida] },
      { label: 'pH médio', value: groundValues[Ground.PhMedio] },
      { label: 'Soma das bases', value: groundValues[Ground.SomaBases] },
      { label: 'Ctc', value: groundValues[Ground.ctc] },
      { label: 'Índice de alumínio', value: groundValues[Ground.indiceALuminio] },
      { label: 'Índice de sódio', value: groundValues[Ground.indiceSodio] },
      { label: 'Data de análise', value: groundValues[Ground.dataAnalise] },
    ];
    const resetLocalStorageData = () => {
      localStorage.removeItem('fazenda');
      localStorage.removeItem('location');
      localStorage.removeItem('ground');
    };
    const extension = groundValues[Ground.extension];

    const handleSubmit = () => {
      // setLoading(true);
      delete groundValues[Ground.extension];

      const fazenda: IFazendaData = {
        ...idValues,
        distancia_estrada: localizationValues.distancia_estrada,
        estrada_nacional: localizationValues.estrada_nacional,
        county: localizationValues.localization.county[County.Id],
        [Fazenda.Extension]: extension,
        [Fazenda.Ground]: { ...groundValues },
        [Fazenda.Geo]: {
          [Geo.Latitude]: localizationValues[Fazenda.Geo][Geo.Latitude],
          [Geo.Longitude]: localizationValues[Fazenda.Geo][Geo.Longitude],
        },
      };

      createFazenda(fazenda)
        .then(data => {
          setSnackMessage({
            isError: false,
            message: data.data?.msg || 'Fazenda cadastrada',
          });
          resetLocalStorageData();
          onClose();
        })
        .catch(erro => {
          setSnackMessage({
            isError: true,
            message: erro.msg || erro.message,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const handleEdit = () => {
      if (fazendaEdit) {
        const fazenda: IFazendaData = {
          ...idValues,
          distancia_estrada: localizationValues.distancia_estrada,
          estrada_nacional: localizationValues.estrada_nacional,
          [Fazenda.Geo]: {
            [Geo.Latitude]: localizationValues[Fazenda.Geo][Geo.Latitude],
            [Geo.Longitude]: localizationValues[Fazenda.Geo][Geo.Longitude],
          },
          [Fazenda.Extension]: extension,
          [Fazenda.County]: localizationValues.localization.county[County.Id],
          [Fazenda.Ground]: { ...groundValues },
          [Fazenda.Producer]: fazendaEdit[Fazenda.Producer][Producer.Id],
        };
        updateFazenda(fazendaEdit[Fazenda.Id], fazenda)
          .then(res => {
            setSnackMessage({
              isError: false,
              message: res.data?.msg || 'Fazenda editada',
            });
            resetLocalStorageData();
          })
          .catch(erro => {
            setSnackMessage({
              isError: true,
              message: erro.msg || erro.message,
            });
          });
      }
    };
    return (
      <Grid container>
        <h1>Confirmação</h1>
        <Box>
          <Typography
            variant="body2"
            style={{ marginBottom: '8px', fontWeight: 'bold' }}
          >
            {' '}
            Identificação
          </Typography>
          <InfoDetail fields={fields} />
          <Typography
            variant="body2"
            style={{ marginBottom: '8px', marginTop: '24px', fontWeight: 'bold' }}
          >
            {' '}
            Localização
          </Typography>
          <InfoDetail fields={fieldsLocalization} />
          <Typography
            variant="body2"
            style={{ marginBottom: '8px', marginTop: '24px', fontWeight: 'bold' }}
          >
            {' '}
            Solo
          </Typography>
          <InfoDetail fields={fieldsGround} />
        </Box>
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
            {!fazendaEdit ? (
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                {!loading ? 'Salvar' : <Loading />}
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleEdit}>
                {!loading ? 'Confirmar Edição' : <Loading />}
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      style={{ justifyContent: 'space-between', minHeight: '140px' }}
    >
      <Alert severity="error">
        Lamentamos, não foram fornecidas informações suficientes para completar este
        processo
      </Alert>
      <Box display="flex" flexDirection="row" justifyContent="flex-end">
        <Button variant="contained" color="secondary" onClick={onReset}>
          Tentar Novamente
        </Button>
      </Box>
    </Box>
  );
};

export default Confirmation;
