import { Partner } from '../constants/entities';
import { IUser } from './user';

export interface IPartner {
  [Partner.Id]: string;
  [Partner.MinisterioName]: String;
  [Partner.User]: IUser;
}
