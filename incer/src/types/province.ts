import { ICounty } from './county';

export interface IProvince {
  _id: string;
  description: string;
  country: string;
  owner: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  countys: ICounty[];
}

export interface IProvinceWithCountry {
  _id: string;
  description: string;
  country: {
    _id: string;
    description: string;
  };
  owner: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  countys: ICounty[];
}
