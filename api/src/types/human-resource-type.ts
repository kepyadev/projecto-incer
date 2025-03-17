import { HumanResourceType } from '../constants/human-resource-type';

export interface IHumanResourceType {
  [HumanResourceType.Id]: string;
  [HumanResourceType.Description]: string;
}

export interface HumanResourceTypeDTO {
  [HumanResourceType.Description]: string;
}

export const HumanResourceTypeFields = [HumanResourceType.Description];
export const HumanResourceTypeRequiredFields = [HumanResourceType.Description];
