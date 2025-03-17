import { ICell } from '../../../../../../../components/generic-table/table.types';
import { MachineType } from '../../../../../../../constants/sub-entites';
import { Entity, IMachineType } from '../../../../../../../types';

// eslint-disable-next-line import/prefer-default-export
export const cells: ICell[] = [
  { id: MachineType.Description, label: 'Descrição', numeric: false },
];

export const dataModifier = (data: ReadonlyArray<Entity> | undefined) => {
  return (data as unknown as IMachineType[])?.map(culture => ({
    ...culture,
    [MachineType.Description]: culture[MachineType.Description],
  }));
};
