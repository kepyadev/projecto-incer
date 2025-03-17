import { Cooperative } from '../constants';
import { IContactInformation } from '.';
import { ICounty } from './County';
import { IUser } from './user';

export interface ICooperative {
  [Cooperative.id]: string;
  [Cooperative.name]: string;
  [Cooperative.nif]: string;
  [Cooperative.contact]: IContactInformation;
  [Cooperative.county]: ICounty;
  [Cooperative.owner]: IUser;
  [Cooperative.userId]: IUser;
  [Cooperative.isCooperative]: boolean;
  [Cooperative.desvinculados]: string[];
  [Cooperative.president]: string;
  [Cooperative.CreatedAt]: Date;
  [Cooperative.UpdatedAt]: Date;
}
export interface CooperativeDTO {
  [Cooperative.name]: string;
  [Cooperative.contact]: IContactInformation;
  [Cooperative.county]: string;
  [Cooperative.nif]: string;
  [Cooperative.owner]: string;
  [Cooperative.isCooperative]: boolean;
  [Cooperative.userId]: string;
  [Cooperative.desvinculados]: string[];
  [Cooperative.president]: string;
  [Cooperative.isCooperative]: boolean;
}

export const CooperativerRequiredFields = [
  Cooperative.name,
  Cooperative.county,
  Cooperative.president,
  Cooperative.contact,
  Cooperative.isCooperative,
];

export const CooperativeAcceptableFields = [
  Cooperative.name,
  Cooperative.contact,
  Cooperative.county,
  Cooperative.president,
  Cooperative.nif,
  Cooperative.address,
  Cooperative.isCooperative,
];
