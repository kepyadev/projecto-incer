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
import { formatNumberDecimal } from '../../../../../../utils';

// eslint-disable-next-line import/prefer-default-export
export const cells: ICell[] = [
  { id: Fazenda.Descricao, label: 'Fazenda', numeric: false },
  { id: Fazenda.Extension, label: 'Extensão', numeric: false },
  { id: Fazenda.Producer, label: 'Produtor', numeric: false },
  { id: 'province', label: 'Província', numeric: false },
  { id: Fazenda.County, label: 'Município', numeric: false },
];

export const dataModifier = (data: ReadonlyArray<Entity>) => {
  return (data as unknown as IFazenda[]).map(fazenda => ({
    ...fazenda,
    [Fazenda.Producer]: fazenda[Fazenda.Producer]
      ? fazenda[Fazenda.Producer][Producer.User][User.FirstName]
      : '-',
    [Fazenda.Extension]: fazenda[Fazenda.Extension]
      ? `${formatNumberDecimal(fazenda[Fazenda.Extension])} ha`
      : '-',
    province:
      fazenda[Fazenda.County] && fazenda[Fazenda.County][County.Province]
        ? fazenda[Fazenda.County]![County.Province]![Province.Description]
        : '-',
    [Fazenda.County]: fazenda[Fazenda.County]
      ? fazenda[Fazenda.County]![County.Description]
      : '-',
  }));
};

export const filterFazendalabel = {
  producer: 'Produtor',
  province: 'Provincia',
  description: 'Descrição',
  county: 'Município',
};
