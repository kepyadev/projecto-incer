import { CulturaType, owner } from '../constants';

export interface ICulturaType {
  [CulturaType.id]: string;
  [CulturaType.description]: string;
}

export interface CulturaTypeDTO {
  [CulturaType.description]: string;
  [owner]: string;
}

export const CulturaTypeFields = [CulturaType.description];
export const CulturaTypeRequiredFields = [CulturaType.description];
