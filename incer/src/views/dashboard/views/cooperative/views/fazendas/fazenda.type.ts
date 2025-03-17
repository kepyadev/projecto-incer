import { ICell } from '../../../../../../components/generic-table/table.types';
import {
  County,
  Fazenda,
  Producer,
  Province,
} from '../../../../../../constants/entities';
import { User } from '../../../../../../constants/user';
import { Entity } from '../../../../../../types';
import { IFazenda } from '../../../../../../types/fazenda';

// eslint-disable-next-line import/prefer-default-export
export const cells: ICell[] = [
  { id: Fazenda.Descricao, label: 'Fazenda', numeric: false },
  { id: Fazenda.Extension, label: 'Extensao', numeric: false },
  { id: Fazenda.Producer, label: 'Produtor', numeric: false },
  { id: 'province', label: 'Província', numeric: false },
  { id: Fazenda.County, label: 'Município', numeric: false },
];

export const dataModifier = (data: ReadonlyArray<Entity> | undefined) => {
  return (data as unknown as IFazenda[])?.map(fazenda => ({
    ...fazenda,
    [Fazenda.Producer]: `${
      fazenda[Fazenda.Producer][Producer.User][User.FirstName]
    } ${fazenda[Fazenda.Producer][Producer.User][User.LastName]}`,
    [Fazenda.Extension]: fazenda[Fazenda.Extension]
      ? `${fazenda[Fazenda.Extension]} ha`
      : '',
    province:
      fazenda[Fazenda.County] && fazenda[Fazenda.County][County.Province]
        ? fazenda[Fazenda.County]![County.Province]![Province.Description]
        : '-',
    [Fazenda.County]: fazenda[Fazenda.County]
      ? fazenda[Fazenda.County][County.Description]
      : '-',
  }));
};
