import { ICell } from '../../../../../../components/generic-table/table.types';
import {
  Cooperative,
  County,
  Producer,
  Province,
} from '../../../../../../constants/entities';
import { User } from '../../../../../../constants/user';
import { Entity } from '../../../../../../types';

export const cells: ICell[] = [
  { id: Cooperative.Province, label: 'Provincia', numeric: false },
  { id: Cooperative.County, label: 'Municipio', numeric: false },
];

export const dataModifier = (data: ReadonlyArray<Entity>) => {
  return (data as unknown as any).map((producer: any) => ({
    [Cooperative.Province]:
      producer[Producer.User][User.County] &&
      producer[Producer.User][User.County][County.Province]
        ? producer[Producer.User][User.County][County.Province][Province.Description]
        : '-',
    [Cooperative.County]: producer[Producer.User][User.County]
      ? producer[Producer.User][User.County][County.Description]
      : '-',
    [Producer.Cooperative]: producer[Producer.Cooperative]
      ? producer[Producer.Cooperative][Cooperative.Description]
      : '-',
  }));
};
