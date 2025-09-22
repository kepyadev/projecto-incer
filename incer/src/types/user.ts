import { Partner } from '../constants/entities';
import { User } from '../constants/user';
import { ICounty } from '.';

export enum UserRole {
  Producer = 'producer',
  Cooperative = 'cooperative',
  Technician = 'technician',
  Admin = 'admin',
  Root = 'root',
  GeneralAnalitic = 'analitic',
}
interface IRole {
  label: string;
  value: UserRole;
}

export const Roles: IRole[] = [
  { label: 'Produtor', value: UserRole.Producer },
  { label: 'Entidade', value: UserRole.Cooperative },
];

export interface IUser {
  [User.Id]: string;
  [User.ShortCode]?: string;
  [User.Nif]?: string;
  [User.Name]?: string;
  [User.FirstName]: string;
  [User.LastName]: string;
  [User.Email]?: string;
  [User.Phone]: number;
  [User.Role]: UserRole;
  [User.Password]?: string;
  [User.Photo]?: string;
  [User.Permitions]?: string[];
  [User.County]: ICounty;
  [User.IsCooperative]?: string;
  [User.President]?: string;
  [User.President]?: string;
  [User.ImageUrl]?: string;
}

export interface ITechnician extends IUser {}
export interface UserDTO {
  [User.User]: {
    [User.FirstName]: string;
    [User.LastName]: string;
    [User.ShortCode]?: string;
    [User.Email]?: string;
    [User.Phone]: number;
    [User.Role]: UserRole;
    [User.Password]?: string;
    [User.Photo]?: string;
    [User.IsCooperative]?: string;
    [User.Permitions]?: string[];
    [User.County]: string;
    [User.President]?: string;
    [User.ImageUrl]?: string;
  };
  // eslint-disable-next-line camelcase
  [User.EspecificInformation]: any;
}

export interface techinicianDTO {
  [User.FirstName]: string;
  [User.LastName]: string;
  [User.ShortCode]?: string;
  [User.Email]?: string;
  [User.Phone]: number;
  [User.Role]: UserRole;
  [User.Password]?: string;
  [User.Photo]?: string;
  [User.County]: string;
  [User.President]?: string;
  [User.ImageUrl]?: string;
}
export interface adminDTO {
  [User.FirstName]: string;
  [User.LastName]: string;
  [User.Email]?: string;
  [User.Phone]: number;
}
export interface partnerDTO {
  [Partner.MinisterioName]: string;
  [Partner.User]: {
    [User.FirstName]: string;
    [User.LastName]: string;
    [User.Email]?: string;
    [User.Phone]: number;
    [User.Role]: UserRole;
    [User.Password]?: string;
    [User.Photo]?: string;
    [User.Permitions]?: string[];
  };
}

export interface ICredentials {
  [User.Email]: string;
  [User.Password]: string;
}
