import {
  HumanResource,
  HumanResourceType,
} from '../../../../../../../../../constants/sub-entites';
import { Entity, IHumanResource } from '../../../../../../../../../types';
import { formatNumberDecimal } from '../../../../../../../../../utils';

export interface HumanResourceProps {
  fazendaId: string;
}

export const humanResourceModifier = (data: ReadonlyArray<Entity>) => {
  return (data as unknown as IHumanResource[]).map(humanResource => {
    return {
      ...humanResource,
      [HumanResource.Type]:
        humanResource[HumanResource.Type][HumanResourceType.Description],
      [HumanResource.Quantity]: formatNumberDecimal(
        humanResource[HumanResource.Quantity]
      ),
    };
  });
};
