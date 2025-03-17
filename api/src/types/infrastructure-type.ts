import { owner } from '../constants';
import { InfrastructureType } from '../constants/infrastructure-type';

export interface IInfrastructureType {
  [InfrastructureType.Id]: string;
  [InfrastructureType.Description]: string;
}

export interface InfrastructureTypeDTO {
  [InfrastructureType.Description]: string;
  [owner]: string;
}

export const InfrastrutureTypeRequiredFields = [InfrastructureType.Description];
export const InfrastrutureTypeFields = [InfrastructureType.Description];
