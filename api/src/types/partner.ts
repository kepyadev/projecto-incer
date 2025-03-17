import { owner, Partner } from '../constants';
import { IUser, userDTO } from './user';

export interface IPartner {
  [Partner.Id]: String;
  [Partner.Ministerio]: String;
  [Partner.User]: IUser;
}
export interface partnerDTORepository {
  [Partner.Ministerio]: String;
  [Partner.User]: string;
  [owner]: String;
}

export interface PartnerDTO {
  [Partner.Ministerio]: String;
  [Partner.User]: userDTO;
  [owner]: string;
}

export const PartnerRequiredFields = [Partner.Ministerio, Partner.User, owner];

export const PartnerFields = [Partner.Ministerio, Partner.User, owner];
