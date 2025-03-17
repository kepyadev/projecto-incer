import { ICell } from '../../../../../../components/generic-table/table.types';
import { User } from '../../../../../../constants/user';
import { Entity } from '../../../../../../types';
import { IUser } from '../../../../../../types/user';

export const cells: ICell[] = [
  { id: User.Name, label: 'Nome', numeric: false },
  { id: User.Role, label: 'Papel', numeric: false },
];

export const dataModifier = (data: ReadonlyArray<Entity>) => {
  return (data as unknown as IUser[]).map(user => ({
    ...user,
    [User.Name]: `${user[User.FirstName]} ${user[User.LastName]}`,
    [User.Role]: `${user[User.Role]}`,
  }));
};
