import { Ministerio } from '../constants/entities';

export interface IMinisterio {
  [Ministerio.Id]: string;
  [Ministerio.Name]: string;
}

export interface MinisterioDTO {
  [Ministerio.Name]: string;
}
