import { Equipamento } from '../constants/equipamento';
import { IEquipamentoType } from './equipamento-type';

export interface IEquipamento {
  [Equipamento.Id]: String;
  [Equipamento.Type]: IEquipamentoType;
  [Equipamento.Quantity]: number;
  [Equipamento.Caracteristic]: string;
}

export interface EquipamentoDTO {
  [Equipamento.Type]: IEquipamentoType;
  [Equipamento.Quantity]: number;
  [Equipamento.Caracteristic]: string;
  [Equipamento.Fazenda]: string;
}

export const EquipamentoRequiredFields = [
  Equipamento.Fazenda,
  Equipamento.Type,
  Equipamento.Quantity,
];

export const EquipamentoFields = [
  Equipamento.Fazenda,
  Equipamento.Type,
  Equipamento.Quantity,
  Equipamento.Caracteristic,
];
