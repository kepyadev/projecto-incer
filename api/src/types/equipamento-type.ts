import { owner } from '../constants';
import { EquipamentoType } from '../constants/equipamento-type';

export interface EquipamentoTypeDTO {
  [EquipamentoType.Description]: String;
  [owner]: string;
}

export interface IEquipamentoType {
  [EquipamentoType.Id]: String;
  [EquipamentoType.Description]: String;
}

export const EquipamentoTypeRequiredFields = [EquipamentoType.Description];
export const EquipamentoTypeFields = [EquipamentoType.Description];
