import { Culture, CultureType } from '../constants/entities';
import { IFazenda } from './fazenda';
import { IUser } from './user';

export interface ICultureTypeData {
  [CultureType.Description]: string;
}

export type ICultureType = ICultureTypeData & { [CultureType.Id]: string };

export interface ICultureData {
  [Culture.Type]: ICultureTypeData;
  [Culture.Fazenda]: string;
  [Culture.AgriculturalYear]: string;
  [Culture.DataColheita]: string;
  [Culture.DataSementeira]: string;
  [Culture.Ha]: number;
}

export type IIrrigacao = 'Sequeiro' | 'Irrigada' | 'Parcialmente irrigada';

export interface ICulture {
  [Culture.Id]: string;
  [Culture.Type]: ICultureType;
  [Culture.Fazenda]?: IFazenda;
  [Culture.AgriculturalYear]: string;
  [Culture.DataSementeira]?: string;
  [Culture.DataColheita]?: string;
  [Culture.Ha]?: number;
  [Culture.Insumos]?: string[];
  [Culture.User]?: IUser;
  [Culture.Irrigacao]: IIrrigacao;
  [Culture.Producao]: number;
  [Culture.Fazenda]?: IFazenda;
}

export interface CultureDTO {
  [Culture.Type]: string;
  [Culture.AgriculturalYear]: string;
  [Culture.DataSementeira]: string;
  [Culture.DataColheita]?: string;
  [Culture.Ha]?: number;
  [Culture.Fazenda]: string;
  [Culture.Irrigacao]: string;
  [Culture.Cooperative]?: string;
}
