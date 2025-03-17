import {
  ICell,
  IDataModifier,
} from '../../../../../../components/generic-table/table.types';
import {
  Cooperative,
  County,
  Producer,
  Province,
} from '../../../../../../constants/entities';
import { ContactInformation } from '../../../../../../constants/sub-entites';
import { User } from '../../../../../../constants/user';
import { Entity } from '../../../../../../types';
import { IProducer } from '../../../../../../types/producer';

// Função para condicionar a exibição do campo "Empresa"
const getCells = (isProducer: string): ICell[] => [
  ...(isProducer === 'bussiness'
    ? [{ id: 'company_name', label: 'Empresa', numeric: false }]
    : []),
  { id: 'name', label: 'Nome', numeric: false },
  // { id: 'cooperative', label: 'Cooperativa', numeric: false },
  { id: ContactInformation.Phone, label: 'Telefone', numeric: false },
  { id: ContactInformation.Email, label: 'E-mail', numeric: false },
  { id: 'province', label: 'Província', numeric: false },
  { id: 'county', label: 'Município', numeric: false },
];

// Exemplo de como usar a função getCells em algum ponto do código
export const cells: ICell[] = getCells('bussiness'); // Substitua por uma variável real

export const dataModifier: IDataModifier = (
  data: ReadonlyArray<Entity> | undefined
) => {
  return (data as unknown as IProducer[])?.map(producer => ({
    ...producer,
    name: `${producer[Producer.User][User.FirstName]} ${
      producer[Producer.User][User.LastName]
    }`,
    [ContactInformation.Phone]: producer[Producer.User][User.Phone],
    [ContactInformation.Email]: producer[Producer.User][User.Email] ?? '-',
    cooperative: producer[Producer.Cooperative]
      ? producer[Producer.Cooperative]![Cooperative.Description]
      : 'Desvinculado',
    province:
      producer[Producer.User] && producer[Producer.User][User.County]
        ? producer[Producer.User]![User.County][County.Province]![
            Province.Description
          ]
        : '-',
    county:
      producer[Producer.User] && producer[Producer.User][User.County]
        ? producer[Producer.User]![User.County][County.Description]
        : '-',
  }));
};
