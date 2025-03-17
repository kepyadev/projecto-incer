import { ICell } from '../../../../../../../components/generic-table/table.types';
import { CultureType } from '../../../../../../../constants/entities';
import { Entity } from '../../../../../../../types';
import { ICultureType } from '../../../../../../../types/culture';

// eslint-disable-next-line import/prefer-default-export
export const cells: ICell[] = [
  { id: CultureType.Description, label: 'Descrição', numeric: false },
];

export const dataModifier = (data: ReadonlyArray<Entity> | undefined) => {
  return (data as unknown as ICultureType[])?.map(culture => ({
    ...culture,
    [CultureType.Description]: culture[CultureType.Description],
  }));
};
