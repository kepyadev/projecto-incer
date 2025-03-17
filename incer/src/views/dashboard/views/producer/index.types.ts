import { formatNumber } from 'accounting';

import { ICell } from '../../../../components/generic-table/table.types';
import { Culture, CultureType, Fazenda } from '../../../../constants/entities';
import { Animal, AnimalType } from '../../../../constants/sub-entites';
import { Entity, IAnimal } from '../../../../types';
import { ICulture } from '../../../../types/culture';
import { formatDate } from '../../../../utils';

export const cellsCultures: ICell[] = [
  { id: Culture.Type, label: 'Tipo', numeric: false },
  { id: Culture.Fazenda, label: 'Fazenda', numeric: false },
  { id: Culture.Producao, label: 'Quantidade', numeric: false },
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

export const cellsAnimals: ICell[] = [
  { id: Animal.Type, label: 'Tipo', numeric: false },
  { id: Animal.EfectivoTotal, label: 'Efectivo', numeric: false },
  { id: Animal.Matrizes, label: 'Matrizes', numeric: false },
];

export const dataModifierAnimals = (data: ReadonlyArray<Entity> | undefined) => {
  return (data as unknown as IAnimal[])?.map(culture => ({
    ...culture,
    [Animal.Type]: culture[Animal.Type][AnimalType.Description],
  }));
};
