import {
  ICell,
  IFilterFieldLabel,
} from '../../../../../../components/generic-table/table.types';
import { Cooperative, County, Province } from '../../../../../../constants/entities';
import {
  ContactInformation,
  Localization,
} from '../../../../../../constants/sub-entites';
import { Entity } from '../../../../../../types';
import { ICooperative } from '../../../../../../types/cooperative';

export const cells: ICell[] = [
  { id: Cooperative.Description, label: 'Descrição', numeric: false },
  { id: Cooperative.isCooperative, label: 'Tipo', numeric: false },
  { id: Cooperative.Contact, label: 'Telefone', numeric: false },
  { id: Cooperative.Presindet, label: 'Presidente', numeric: false },
  { id: Localization.Province, label: 'Província', numeric: false },
  { id: Localization.County, label: 'Município', numeric: false },
];

export const dataModifier = (data: ReadonlyArray<Entity>) => {
  return (data as unknown as ICooperative[]).map(cooperative => {
    return {
      ...cooperative,
      [Cooperative.Contact]: cooperative[Cooperative.Contact]
        ? `${cooperative[Cooperative.Contact][ContactInformation.Phone]}`
        : '-',

      [Cooperative.isCooperative]:
        cooperative[Cooperative.isCooperative] === true
          ? 'Cooperativa'
          : 'Associação',
      [Localization.Province]: cooperative[Cooperative.County][County.Province]
        ? cooperative[Cooperative.County][County.Province]![Province.Description]
        : '',
      [Localization.County]: cooperative[Cooperative.County][County.Description],
    };
  });
};

export const cooperativeFilterFilterTranslation: IFilterFieldLabel = {
  name: 'Nome',
  president: 'Presidente',
  province: 'Província',
  county: 'Município',
};
