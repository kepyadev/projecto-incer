import { ICell } from '../../../../../../components/generic-table/table.types';
import { Cooperative, Producer } from '../../../../../../constants/entities';
import { User } from '../../../../../../constants/user';
import { Entity } from '../../../../../../types';
import { IProducer } from '../../../../../../types/producer';

export const cells: ICell[] = [
  { id: Producer.CompanyName, label: 'Empresa', numeric: false },
  { id: User.Name, label: 'Nome', numeric: false },
  { id: User.Phone, label: 'Telefone', numeric: false },
  { id: User.Email, label: 'E-mail', numeric: false },
  { id: Producer.Cooperative, label: 'Cooperativa', numeric: false },
  { id: 'province', label: 'Provincia', numeric: false },
  { id: 'county', label: 'Municipio', numeric: false },
];

export const dataModifier = (data: ReadonlyArray<Entity>) => {
  return (data as unknown as IProducer[]).map(producer => ({
    ...producer,
    [Producer.CompanyName]: producer[Producer.CompanyName]
      ? producer[Producer.CompanyName]
      : 'Particular',
    [User.Name]: producer[Producer.User]
      ? `${producer[Producer.User]![User.FirstName]} ${
          producer[Producer.User]![User.LastName]
        }`
      : '-',
    [User.Phone]: producer[Producer.User]
      ? producer[Producer.User]![User.Phone]
      : '-',
    [User.Email]: producer[Producer.User]
      ? producer[Producer.User]![User.Email]
      : '-',
    [Producer.Cooperative]: producer[Producer.Cooperative]
      ? producer[Producer.Cooperative]![Cooperative.Description]
      : 'Desvinculado',
    county:
      producer.user.county && producer.user ? producer.user.county.description : '-',
    province:
      producer.user.county && producer.user
        ? producer.user.county.province?.description
        : '-',
  }));
};
