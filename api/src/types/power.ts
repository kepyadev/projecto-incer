import { Power } from '../constants/power';

// export type PowerUnity = 'pH' | 'Watts';
export enum PowerUnity {
  Hp = 'pH',
  Watts = 'Watts',
}
export interface IPower {
  [Power.Value]: number;
  [Power.Unity]: PowerUnity;
}
