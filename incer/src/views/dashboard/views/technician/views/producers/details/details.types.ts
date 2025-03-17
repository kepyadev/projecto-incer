import { ICell } from '../../../../../../../components/generic-table/table.types';
import { Fazenda, Producer } from '../../../../../../../constants/entities';
import { User } from '../../../../../../../constants/user';
import { IProducer } from '../../../../../../../types/producer';

export const getFields = (producer: IProducer) => {
  return [
    {
      label: 'Nome',
      value: `${producer[Producer.User][User.FirstName]} ${
        producer[Producer.User][User.LastName]
      }`,
    },
    //  { label: 'Nº bilhete de identidade', value: producer[Producer.Bi] },
    { label: 'Nº de idenficação fiscal', value: producer[Producer.Nif] },
    { label: 'Telefone', value: producer[Producer.User][User.Phone] },
    { label: 'Email', value: producer[Producer.User][User.Email] },
  ];
};

export const cells: ICell[] = [
  { id: Fazenda.Descricao, label: 'Descrição', numeric: false },
  { id: Fazenda.Gerencia, label: 'Pessoa de contacto', numeric: false },
];
