import { ICell } from '../../../../../../../components/generic-table/table.types';
import { Producer } from '../../../../../../../constants/entities';
import { ContactInformation } from '../../../../../../../constants/sub-entites';
import { User } from '../../../../../../../constants/user';
import { Entity } from '../../../../../../../types';
import { IProducer } from '../../../../../../../types/producer';

export const cellsProducer: ICell[] = [
  { id: 'producer', label: 'Nome', numeric: false },
  { id: ContactInformation.Phone, label: 'Telefone', numeric: false },
  { id: ContactInformation.Email, label: 'E-mail', numeric: false },
];
export const dataModifierProducer = (data: ReadonlyArray<Entity> | undefined) => {
  return (data as unknown as IProducer[])?.map(producer => ({
    ...producer,
    producer: `${producer[Producer.User][User.FirstName]} ${
      producer[Producer.User][User.FirstName]
    }`,
    [ContactInformation.Phone]: producer[Producer.User][User.Phone],
    [ContactInformation.Email]: producer[Producer.User][User.Email],
  }));
};

export const cellsProducersDesvinculados: ICell[] = [
  { id: 'name', label: 'Nome', numeric: false },
];

export const dataModifierProducerDesvinculados = (
  data: ReadonlyArray<IProducer> | undefined
) => {
  return (data as unknown as IProducer[])?.map(producer => ({
    ...producer,
    name: `${producer[Producer.User][User.FirstName]} ${
      producer[Producer.User][User.LastName]
    }`,
  }));
};
