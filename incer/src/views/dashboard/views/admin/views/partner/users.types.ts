import { ICell } from '../../../../../../components/generic-table/table.types';
import { Partner } from '../../../../../../constants/entities';
import { User } from '../../../../../../constants/user';
import { Entity } from '../../../../../../types';
import { IPartner } from '../../../../../../types/partner';

export const cells: ICell[] = [
  { id: 'name', label: 'Nome', numeric: false },
  { id: Partner.MinisterioName, label: 'Ministério', numeric: false },
  { id: 'permitions', label: 'Permissões', numeric: false },
];

const manipulatePermitions = (permitions: string[]) => {
  const newPermitions = permitions.map(value => {
    return value.replace('/', '');
  });

  return newPermitions.join(' | ');
};

export const dataModifier = (data: ReadonlyArray<Entity>): readonly Entity[] => {
  return (data as unknown as IPartner[]).map(partner => ({
    ...partner,
    name: `${partner[Partner.User]?.[User.FirstName] || 'N/A'}`, // Valor padrão "N/A"
    permitions: manipulatePermitions(partner[Partner.User]?.[User.Permitions] ?? []),
  }));
};
