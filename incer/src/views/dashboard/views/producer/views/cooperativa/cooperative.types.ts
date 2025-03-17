import { ICell } from '../../../../../../components/generic-table/table.types';
import { Culture } from '../../../../../../constants/entities';
import { ICulture } from '../../../../../../types/culture';
import { formatDate } from '../../../../../../utils';

export const dataModifier = (data: ReadonlyArray<ICulture>) => {
  return data.map(culture => {
    return {
      ...culture,
      [Culture.Id]: culture[Culture.Id],
      [Culture.Type]: culture[Culture.Type].description,
      [Culture.DataColheita]: formatDate(culture[Culture.DataColheita]),
      [Culture.Producao]: `${culture[Culture.Producao]} t`,
    };
  });
};

export const tableCells: ICell[] = [
  { id: Culture.Id, label: '#', numeric: true },
  { id: Culture.Type, label: 'Tipo', numeric: false },
  { id: Culture.Producao, label: 'Produção', numeric: false },
  { id: Culture.DataColheita, label: 'Sementeira', numeric: false },
];
