import { owner } from '../constants';
import { MachineType } from '../constants/machine';

export interface IMachineType {
  [MachineType.Id]: string;
  [MachineType.Description]: string;
}

export interface MachineTypeDTO {
  [MachineType.Description]: string;
  [owner]: string;
}

export const MachineTypeFields = [MachineType.Description];
export const MachineTypeRequiredFields = [MachineType.Description];
