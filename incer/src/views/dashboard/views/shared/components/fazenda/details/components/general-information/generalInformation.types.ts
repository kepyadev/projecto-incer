import { InfoField } from '../../../../../../../../../components/info-detail/infoDetail.types';
import {
  County,
  Fazenda,
  Province,
} from '../../../../../../../../../constants/entities';
import { Geo, Ground } from '../../../../../../../../../constants/sub-entites';
import { IFazenda } from '../../../../../../../../../types/fazenda';

// eslint-disable-next-line import/prefer-default-export
export const getFieldsLocalization = (fazenda: IFazenda): InfoField[] => [
  {
    label: 'Província',
    value: fazenda[Fazenda.County][County.Province]![Province.Description],
  },
  {
    label: 'Município',
    value: fazenda[Fazenda.County][County.Description],
  },
  {
    label: 'Endereço',
    value: fazenda[Fazenda.Address],
  },
  {
    label: 'Estrada Nacional mais próxima',
    value: fazenda[Fazenda.Estradanacional],
  },
  {
    label: 'Distância à estrada nacional',
    value: `${fazenda[Fazenda.DistanciaEstrada]} Km`,
  },
  {
    label: 'Distância à sede municipal',
    value: fazenda[Fazenda.Address],
  },
  {
    label: 'Latitude',
    value: `${fazenda[Fazenda.Geo][Geo.Latitude]}`,
  },
  {
    label: 'Longitude',
    value: `${fazenda[Fazenda.Geo][Geo.Longitude]}`,
  },
];

export const getFieldsGround = (fazenda: IFazenda): InfoField[] => [
  {
    label: 'Altitude média',
    value: `${fazenda[Fazenda.Ground][Ground.AltitudeMedia]}m`,
  },
  {
    label: 'Orografia',
    value: fazenda[Fazenda.Ground][Ground.Orografia],
  },
  {
    label: 'Propriedades Fisicas',
    value: fazenda[Fazenda.Ground][Ground.PropriedadesFisicas],
  },
  {
    label: 'PH médio',
    value: `${fazenda[Fazenda.Ground][Ground.PhMedio] ?? '-'}`,
  },
  {
    label: 'Area corrigida',
    value: `${fazenda[Fazenda.Ground][Ground.AreaCorrigida]} Km`,
  },
  {
    label: 'Soma das bases',
    value: `${fazenda[Fazenda.Ground][Ground.SomaBases] ?? ''}%`,
  },
  { label: 'CTC', value: `${fazenda[Fazenda.Ground][Ground.ctc] ?? ''} cmolc/dm3` },
  {
    label: 'Índice alumínio',
    value: `${fazenda[Fazenda.Ground][Ground.indiceALuminio] ?? ''} cmolc/dm3`,
  },
  {
    label: 'Índice de sódio',
    value: `${fazenda[Fazenda.Ground][Ground.indiceSodio] ?? ''}%`,
  },
];
