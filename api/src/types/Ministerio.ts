import { Ministerio } from '../constants';

export interface IMinisterio {
  [Ministerio.Id]: string;
  [Ministerio.Name]: string;
}

export interface MinisterioDTO {
  [Ministerio.Id]: string;
  [Ministerio.Name]: string;
}
