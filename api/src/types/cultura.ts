import { owner } from '../constants';
import { Cultura } from '../constants/cultura';
import { ICulturaType } from './cultura-type';

export type IIrrigacao = 'irrigada' | 'sequeiro' | 'parcialmente irrigada';

export interface ICultura {
  [Cultura.id]: string;
  [Cultura.type]: ICulturaType;
  [Cultura.irrigacao]: IIrrigacao;
  [Cultura.quantity]: number;
  [Cultura.agriculturalYear]: number;
  [Cultura.area]: number;
  [Cultura.dataSementeira]: Date;
  [Cultura.dataColheita]: Date;
  [Cultura.fazendaId]: string;
}

export interface ICulturaDTO {
  [Cultura.type]: string;
  [Cultura.irrigacao]: IIrrigacao;
  [Cultura.quantity]: number;
  [Cultura.agriculturalYear]: number;
  [Cultura.area]: number;
  [Cultura.dataSementeira]: Date;
  [Cultura.dataColheita]: Date;
  [Cultura.fazendaId]: string;
  [Cultura.cooperative]: string;
  [owner]: string;
}

export const culturaRequiredFields = [
  Cultura.type,
  Cultura.irrigacao,
  Cultura.agriculturalYear,
  Cultura.quantity,
  Cultura.fazendaId,
  Cultura.area,
  Cultura.dataColheita,
  Cultura.dataSementeira,
];

export const culturaAcceptableFields = [
  Cultura.type,
  Cultura.irrigacao,
  Cultura.agriculturalYear,
  Cultura.quantity,
  Cultura.fazendaId,
  Cultura.cooperative,
  Cultura.area,
  Cultura.dataColheita,
  Cultura.dataSementeira,
];
