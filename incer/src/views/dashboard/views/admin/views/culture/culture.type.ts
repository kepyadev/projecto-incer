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
import { ICulture } from '../../../../../../types/culture';
import { formatDate, formatNumberDecimal } from '../../../../../../utils';

export const cells: ICell[] = [
  { id: CultureType.Description, label: 'Descrição', numeric: false },
  { id: Culture.Fazenda, label: 'Fazenda', numeric: false },
  { id: Culture.Ha, label: 'Área', numeric: false },
  { id: Culture.Producao, label: 'Produção', numeric: false },
  { id: Culture.Irrigacao, label: 'Irrigação', numeric: false },
  { id: County.Province, label: 'Provincia', numeric: false },
  { id: Fazenda.County, label: 'Municipio', numeric: false },
  { id: Culture.DataSementeira, label: 'Sementeira', numeric: false },
  { id: Culture.DataColheita, label: 'Colheita', numeric: false },
  { id: Culture.AgriculturalYear, label: 'Ano agricola', numeric: false },
];

export const dataModifier = (data: ReadonlyArray<Entity>) => {
  return (data as unknown as ICulture[]).map(culture => ({
    ...culture,
    [CultureType.Description]: culture[Culture.Type][CultureType.Description],
    [Culture.Fazenda]: culture[Culture.Fazenda]![Fazenda.Descricao],
    [Culture.Ha]: `${formatNumberDecimal(culture[Culture.Ha] || 0)} ha`,
    [Culture.Producao]: `${formatNumberDecimal(culture[Culture.Producao])} t`,
    [Culture.DataSementeira]: formatDate(culture[Culture.DataSementeira]),
    [Culture.DataColheita]: formatDate(culture[Culture.DataColheita]) || '-',
    province:
      culture[Culture.Fazenda] &&
      culture[Culture.Fazenda]![Fazenda.County] &&
      culture[Culture.Fazenda]![Fazenda.County][County.Province]
        ? culture[Culture.Fazenda]![Fazenda.County]![County.Province]![
            Province.Description
          ]
        : '-',
    county:
      culture[Culture.Fazenda] && culture[Culture.Fazenda]![Fazenda.County]
        ? culture[Culture.Fazenda]![Fazenda.County]![County.Description]
        : '-',
  }));
};

export const filterField: IFilterFieldLabel = {
  culture: 'Cultura',
  fazenda: 'Fazenda',
  province: 'Province',
  county: 'Municipio',
};
