import { ICell } from '../../../../../../../../../components/generic-table/table.types';
import { Culture } from '../../../../../../../../../constants/entities';
import { Entity } from '../../../../../../../../../types';
import { ICulture } from '../../../../../../../../../types/culture';
import { formatDate, formatNumberDecimal } from '../../../../../../../../../utils';

export const cells: ICell[] = [
  { id: Culture.Type, label: 'Tipo', numeric: false },
  { id: Culture.Ha, label: 'Area', numeric: false },
  { id: Culture.Producao, label: 'Produção', numeric: false },
  { id: Culture.Irrigacao, label: 'Irrigação', numeric: false },
  { id: Culture.DataSementeira, label: 'Sementeira', numeric: false },
  { id: Culture.DataColheita, label: 'Collheita', numeric: false },
  { id: Culture.AgriculturalYear, label: 'Ano agricola', numeric: false },
];

export const dataModifier = (data: ReadonlyArray<Entity>) => {
  return (data as unknown as ICulture[]).map(culture => {
    return {
      ...culture,
      [Culture.Id]: culture[Culture.Id],
      [Culture.Type]: culture[Culture.Type].description,
      [Culture.DataSementeira]: culture[Culture.DataSementeira]
        ? formatDate(culture[Culture.DataSementeira])
        : '',
      [Culture.DataColheita]: culture[Culture.DataColheita]
        ? formatDate(culture[Culture.DataColheita])
        : '',
      [Culture.Producao]: `${formatNumberDecimal(culture[Culture.Producao])} t`,
      [Culture.Ha]: `${formatNumberDecimal(culture[Culture.Ha] || 0)} ha`,
    };
  });
};

export interface CulturasProp {
  culturas?: ICulture[];
  cooperativeId?: string;
}
