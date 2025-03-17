import { owner } from '../constants';
import { MeioEstacionarioType } from '../constants/meio-estacionario-type';

export interface IMeioEstacionarioType {
  [MeioEstacionarioType.Id]: string;
  [MeioEstacionarioType.Description]: string;
}

export interface MeioEstacionarioTypeDTO {
  [MeioEstacionarioType.Description]: string;
  [owner]: string;
}

export const MeioEstacionarioTypeRequiredFields = [MeioEstacionarioType.Description];
export const MeioEstacionarioTypeFields = [MeioEstacionarioType.Description];
