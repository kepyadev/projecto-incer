import { ICell } from '../../../../../../components/generic-table/table.types';
import { Culture, CultureType, Fazenda } from '../../../../../../constants/entities';
import { Entity } from '../../../../../../types';
import { ICulture } from '../../../../../../types/culture';
import { formatDate, formatNumberDecimal } from '../../../../../../utils';

export const cells: ICell[] = [
  { id: Culture.Type, label: 'Tipo', numeric: false },
  { id: Culture.Fazenda, label: 'Fazenda', numeric: false },
  { id: Culture.Producao, label: 'Quantidade', numeric: false },
  { id: Culture.DataSementeira, label: 'Data de sementeira', numeric: false },
  { id: Culture.DataColheita, label: 'Data de colheita', numeric: false },
  { id: Culture.AgriculturalYear, label: 'Ano agricola', numeric: false },
];

export const dataModifier = (data: ReadonlyArray<Entity> | undefined) => {
  return (data as unknown as ICulture[])?.map(culture => ({
    ...culture,
    [Culture.Type]: culture[Culture.Type][CultureType.Description],
    [Culture.DataColheita]: formatDate(culture[Culture.DataColheita]),
    [Culture.DataSementeira]: formatDate(culture[Culture.DataSementeira]),
    [Culture.Fazenda]: culture[Culture.Fazenda]
      ? culture[Culture.Fazenda]![Fazenda.Descricao]
      : '-',
    [Culture.Producao]: `${formatNumberDecimal(culture[Culture.Producao])} t`,
  }));
};
