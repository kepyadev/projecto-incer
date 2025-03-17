import {
  ICell,
  IFilterFieldLabel,
} from '../../../../../../components/generic-table/table.types';
import {
  County,
  Culture,
  CultureType,
  Fazenda,
  Province,
} from '../../../../../../constants/entities';
import { Entity } from '../../../../../../types';
import { formatDate, formatNumberDecimal } from '../../../../../../utils';

export const cells: ICell[] = [
  { id: CultureType.Description, label: 'Descrição', numeric: false },
  { id: Culture.Fazenda, label: 'Fazenda', numeric: false },
  { id: Culture.Ha, label: 'Área', numeric: false },
  { id: Culture.Producao, label: 'Produção', numeric: false },
  { id: Culture.Irrigacao, label: 'Irrigação', numeric: false },
  { id: Culture.DataSementeira, label: 'Sementeira', numeric: false },
  { id: Culture.DataColheita, label: 'Colheita', numeric: false },
  { id: Culture.AgriculturalYear, label: 'Ano agricola', numeric: false },
  { id: 'province', label: 'Província', numeric: false },
  { id: 'county', label: 'Municipio', numeric: false },
];

export const dataModifier = (data: ReadonlyArray<Entity>) => {
  return (data as any).map((culture: any) => ({
    ...culture,
    [CultureType.Description]: culture[Culture.Type][CultureType.Description],
    [Culture.Fazenda]: culture[Culture.Fazenda]![Fazenda.Descricao],
    [Culture.Ha]: `${formatNumberDecimal(culture[Culture.Ha] || 0)} ha`,
    [Culture.Producao]: `${formatNumberDecimal(culture[Culture.Producao])} t`,
    [Culture.DataSementeira]: formatDate(culture[Culture.DataSementeira]),
    [Culture.DataColheita]: formatDate(culture[Culture.DataColheita]) || '-',
    province:
      culture[Culture.Fazenda][Fazenda.County][County.Province] &&
      culture[Culture.Fazenda][Fazenda.County]
        ? culture[Culture.Fazenda][Fazenda.County][County.Province][
            Province.Description
          ]
        : '-',
    county: culture[Culture.Fazenda][Fazenda.County]
      ? culture[Culture.Fazenda][Fazenda.County][County.Description]
      : '-',
  }));
};

export const filterLabel: IFilterFieldLabel = {
  province: 'Província',
  county: 'Município',
  description: 'Cultura',
  fazenda: 'Fazenda',
};
