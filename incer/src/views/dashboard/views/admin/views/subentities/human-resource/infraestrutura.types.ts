import { ICell } from '../../../../../../../components/generic-table/table.types';
import { InfraestruturaType } from '../../../../../../../constants/sub-entites';
import { Entity, IInfraestruturaType } from '../../../../../../../types';

// eslint-disable-next-line import/prefer-default-export
export const cells: ICell[] = [
  { id: InfraestruturaType.Description, label: 'Descrição', numeric: false },
];
export const dataModifier = (data: ReadonlyArray<Entity> | undefined) => {
  return (data as unknown as IInfraestruturaType[])?.map(culture => ({
    ...culture,
    [InfraestruturaType.Description]: culture[InfraestruturaType.Description],
  }));
};
