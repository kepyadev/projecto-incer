import { Fazenda } from '../../../../../../constants/entities';
import { ContactInformation } from '../../../../../../constants/sub-entites';
import { Entity } from '../../../../../../types';
import { IFazenda } from '../../../../../../types/fazenda';
import { formatNumberDecimal } from '../../../../../../utils';

// eslint-disable-next-line import/prefer-default-export
export const cells = [
  // {
  //   id: '_id',
  //   label: 'ID',
  //   numeric: false,
  // },
  {
    id: Fazenda.Descricao,
    label: 'Nome',
    numeric: false,
  },
  {
    id: Fazenda.Nif,
    label: 'Nif',
    numeric: false,
  },
  {
    id: Fazenda.Gerencia,
    label: 'Gerente',
    numeric: false,
  },
  {
    id: ContactInformation.Phone,
    label: 'Telefone',
    numeric: false,
  },
  {
    id: ContactInformation.Email,
    label: 'E-mail',
    numeric: false,
  },
];

// export const dataModifier = (data: ReadonlyArray<Entity>) =>
//   (data as unknown as IFazenda[]).map(fazenda => ({
//     ...fazenda,
//     [ContactInformation.Phone]: fazenda.contact.phone,
//     [ContactInformation.Email]: fazenda.contact.email,
//   }));

export const dataModifier = (data: ReadonlyArray<Entity>) => {
  return (data as unknown as IFazenda[]).map(fazenda => ({
    ...fazenda,
    [ContactInformation.Phone]: fazenda.contact.phone,
    [ContactInformation.Email]: fazenda.contact.email,
    [Fazenda.Extension]: fazenda[Fazenda.Extension]
      ? `${formatNumberDecimal(fazenda[Fazenda.Extension])} ha`
      : '-',
  }));
};
