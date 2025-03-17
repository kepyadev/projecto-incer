import { owner } from '../constants';
import { MeioEstacionario } from '../constants/meio-estacionario';

export interface IMeioEstacionario {
  [MeioEstacionario.Id]: string;
  [MeioEstacionario.Type]: IMeioEstacionario;
  [MeioEstacionario.Quantity]: string;
  [MeioEstacionario.PowerValue]: string;
}

export interface MeioEstacionarioDTO {
  [MeioEstacionario.Quantity]: string;
  [MeioEstacionario.Fazenda]: string;
  [MeioEstacionario.Type]: string;
  [MeioEstacionario.PowerValue]: string;
  [owner]: string;
}

export const MeioEstacionarioRequiredFields = [
  MeioEstacionario.Quantity,
  MeioEstacionario.Type,
  MeioEstacionario.Fazenda,
  MeioEstacionario.PowerValue,
];
export const MeioEstacionarioFields = [
  MeioEstacionario.Quantity,
  MeioEstacionario.Type,
  MeioEstacionario.Fazenda,
  MeioEstacionario.PowerValue,
];
