import { ICell } from '../../../../../../../components/generic-table/table.types';
import { Alfaia } from '../../../../../../../constants/sub-entites';
import { Entity, IMachineType } from '../../../../../../../types';

// eslint-disable-next-line import/prefer-default-export
export const cells: ICell[] = [
  { id: Alfaia.Description, label: 'Descrição', numeric: false },
];

export const dataModifier = (data: ReadonlyArray<Entity> | undefined) => {
  return (data as unknown as IMachineType[])?.map(culture => ({
    ...culture,
    [Alfaia.Description]: culture[Alfaia.Description],
  }));
};
