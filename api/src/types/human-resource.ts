import { HumanResource } from '../constants/human-resource';
import { IHumanResourceType } from './human-resource-type';

export interface IHumanResource {
  [HumanResource.Id]: string;
  [HumanResource.Quantity]: number;
  [HumanResource.Type]: IHumanResourceType;
}

export interface HumanResourceDTO {
  [HumanResource.Quantity]: number;
  [HumanResource.Type]: string;
}
