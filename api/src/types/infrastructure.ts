import { owner } from '../constants';
import { Infrastructure } from '../constants/infrastructure';
import { IInfrastructureType } from './infrastructure-type';

export interface IInfrastructure {
  [Infrastructure.Id]: String;
  [Infrastructure.Type]: IInfrastructureType;
  [Infrastructure.Quantity]: number;
  [Infrastructure.Capacidade]: string;
  [Infrastructure.Unidade]: String;
  [Infrastructure.Fazenda]: String;
}

export interface InfrastructureDTO {
  [Infrastructure.Type]: string;
  [Infrastructure.Quantity]: number;
  [Infrastructure.Capacidade]: string;
  [Infrastructure.Unidade]: String;
  [Infrastructure.Fazenda]: String;
  [owner]: string;
}
