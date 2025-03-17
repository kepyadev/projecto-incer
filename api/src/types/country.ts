import { Country } from '../constants';

export interface ICountry {
  [Country.Id]: string;
  [Country.Description]: string;
}

export interface CountryDTO {
  [Country.Description]: string;
  [Country.Provinces]?: string[];
}
