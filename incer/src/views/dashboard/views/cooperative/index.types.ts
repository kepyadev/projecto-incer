import { formatNumber } from 'accounting';

import {
  ICell,
  IDataModifier,
} from '../../../../components/generic-table/table.types';
import {
  Culture,
  CultureType,
  Fazenda,
  Producer,
} from '../../../../constants/entities';
import { ContactInformation } from '../../../../constants/sub-entites';
import { User } from '../../../../constants/user';
import { Entity } from '../../../../types';
import { ICulture } from '../../../../types/culture';
import { IProducer } from '../../../../types/producer';
import { formatDate } from '../../../../utils';

// eslint-disable-next-line import/prefer-default-export
export const dataModifier: IDataModifier = (
  data: ReadonlyArray<Entity> | undefined
) => {
  return (data as unknown as IProducer[])?.map(producer => ({
    ...producer,
    producer: producer[Producer.User][User.Name],
    [ContactInformation.Phone]: producer[Producer.User][User.Phone],
    [ContactInformation.Email]: producer[Producer.User][User.Email],
  }));
};

export const cellsCultures: ICell[] = [
  { id: Culture.Type, label: 'Tipo', numeric: false },
  { id: Culture.Fazenda, label: 'Fazenda', numeric: false },
  { id: Culture.Producao, label: 'Quantidade', numeric: false },
  { id: Culture.DataColheita, label: 'Data de colheita', numeric: false },
  { id: Culture.AgriculturalYear, label: 'Ano agricola', numeric: false },
];

export const dataModifierCultures = (data: ReadonlyArray<Entity> | undefined) => {
  return (data as unknown as ICulture[])?.map(culture => ({
    ...culture,
    [Culture.Type]: culture[Culture.Type][CultureType.Description],
    [Culture.DataColheita]: formatDate(culture[Culture.DataColheita]),
    [Culture.DataSementeira]: formatDate(culture[Culture.DataSementeira]),
    [Culture.Fazenda]: culture[Culture.Fazenda]
      ? culture[Culture.Fazenda]![Fazenda.Descricao]
      : '-',
    [Culture.Producao]: `${formatNumber(culture[Culture.Producao])} t`,
  }));
};
