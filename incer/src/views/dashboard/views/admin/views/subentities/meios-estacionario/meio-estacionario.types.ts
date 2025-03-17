import { ICell } from '../../../../../../../components/generic-table/table.types';
import { MeioEstacionarioType } from '../../../../../../../constants/sub-entites';
import { Entity, IMeioEstacionarioType } from '../../../../../../../types';

// eslint-disable-next-line import/prefer-default-export
export const cells: ICell[] = [
  { id: MeioEstacionarioType.Description, label: 'Descrição', numeric: false },
];

export const dataModifier = (data: ReadonlyArray<Entity> | undefined) => {
  return (data as unknown as IMeioEstacionarioType[])?.map(culture => ({
    ...culture,
    [MeioEstacionarioType.Description]: culture[MeioEstacionarioType.Description],
  }));
};
