import {
  ICell,
  IFilterFieldLabel,
} from '../../../../../../components/generic-table/table.types';
import { Cooperative } from '../../../../../../constants/entities';
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
  { id: Cooperative.Presindet, label: 'Responsável', numeric: false },
  { id: Localization.Province, label: 'Província', numeric: false },
  { id: Localization.County, label: 'Município', numeric: false },
];

export const dataModifier = (data: ReadonlyArray<Entity>) => {
  return (data as unknown as ICooperative[]).map(cooperative => ({
    ...cooperative,
    [Cooperative.Contact]: cooperative[Cooperative.Contact]
      ? cooperative[Cooperative.Contact][ContactInformation.Phone]
      : '-',

    [Cooperative.isCooperative]: cooperative[Cooperative.isCooperative]
      ? 'Cooperativa'
      : 'Associação',
    [Localization.Province]:
      cooperative.county.province && cooperative.county
        ? cooperative.county.province?.description
        : '-',
    [Localization.County]: cooperative.county ? cooperative.county.description : '-',
  }));
};

export const cooperativeFilterFilterTranslation: IFilterFieldLabel = {
  name: 'Nome',
  president: 'Presidente',
  province: 'Província',
  county: 'Município',
};
