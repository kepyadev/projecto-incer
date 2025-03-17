import { province } from '../constants';
import { ICountry } from './country';

export interface IProvince {
  [province.Description]: string;
  [province.Country]: ICountry;
}

export interface ProvinceDTO {
  [province.Description]: string;
  [province.Country]: string;
}
