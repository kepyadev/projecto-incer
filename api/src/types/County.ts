import { County } from '../constants/county';
import { IProvince } from './province';

export interface ICounty {
  [County.Description]: string;
  [County.ProvinceId]: IProvince;
}

export interface CountyDTO {
  [County.Description]: string;
  [County.ProvinceId]: string;
}
