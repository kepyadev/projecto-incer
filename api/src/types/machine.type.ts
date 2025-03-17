import { Machine } from '../constants/machine';
import { IMachineType } from './machine-type.type';
import { IPower } from './power';

export interface IMachine {
  [Machine.Id]: string;
  [Machine.Quantity]: number;
  [Machine.Type]: IMachineType;
  [Machine.Power]: IPower;
}

export interface MachineDTO {
  [Machine.Quantity]: number;
  [Machine.Power]: IPower;
  [Machine.Type]: IMachineType;
  [Machine.fazenda]: string;
}

export const machineRequiredFields = [
  Machine.Power,
  Machine.Quantity,
  Machine.Type,
  Machine.fazenda,
];

export const machineAcceptableFields = [
  Machine.Power,
  Machine.Quantity,
  Machine.Type,
  Machine.fazenda,
];
