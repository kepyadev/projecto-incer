import {
  ContactInformation,
  Country,
  County,
  Geo,
  Ground,
  Localization,
  province,
} from '../constants';

export interface IFetchParams {
  page: number;
  limit: number;
  entity?: number;
}

export type Entity = Record<string, unknown> & { id: string };

export interface IGeo {
  [Geo.Latitude]: number;
  [Geo.Longitude]: number;
}

export interface IGround {
  [Ground.AltitudeMedia]: number;
  [Ground.Orografia]: string;
  [Ground.PropriedadesFisicas]: string;
  [Ground.PhMedio]: number;
  [Ground.AreaCorrigida]: number;
}

export interface ICountry {
  [Country.Id]: string;
  [Country.Description]: string;
}

export interface IProvince {
  [province.Id]: string;
  [province.Description]: string;
  [province.Country]: ICountry;
}

export interface ICounty {
  [County.Id]: string;
  [County.Description]: string;
}

export interface ILocalization {
  [Localization.Comuna]: ICounty;
}

export interface IContactInformation {
  [ContactInformation.Phone]: string;
  [ContactInformation.Email]: string;
}
