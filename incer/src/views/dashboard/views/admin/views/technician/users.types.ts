import { ICell } from '../../../../../../components/generic-table/table.types';
import { County } from '../../../../../../constants/entities';
import { User } from '../../../../../../constants/user';
import { Entity } from '../../../../../../types';
import { ITechnician } from '../../../../../../types/user';

export const cells: ICell[] = [
  { id: User.Name, label: 'Nome', numeric: false },
  { id: User.Email, label: 'E-mail', numeric: false },
  { id: User.Phone, label: 'Telefone', numeric: false },
  { id: User.County, label: 'Província', numeric: false },
];

export const dataModifier = (data: ReadonlyArray<Entity>) => {
  return (data as unknown as ITechnician[]).map(user => ({
    ...user,
    [User.Name]: `${user[User.FirstName]} ${user[User.LastName]}`,
    [User.Phone]: user[User.Phone],
    [User.County]: user[User.County][County.Description] || '-',
  }));
};
