import { Document } from 'mongoose';

import { User } from '../constants';
import { ICounty } from './County';
import { IProvince } from './province';

export type UserRole = 'producer' | 'cooperative' | 'admin' | 'technician' | 'root';
export interface IUser extends Document {
  [User.firstName]: string;
  [User.lastName]: string;
  [User.email]?: string;
  [User.emailCode]: string;
  [User.mobileCode]: string;
  [User.phoneNumber]: string;
  [User.lastLoginDate]: Date;
  [User.password]: string;
  [User.shortCode]: string;
  [User.role]: UserRole;
  [User.permitions]: string[];
  [User.county]?: ICounty;
  [User.province]?: IProvince;
  [User.token]?: string;
  [User.imageUrl]?: [];
}

export interface userDTO {
  [User.firstName]: string;
  [User.lastName]: string;
  [User.phoneNumber]: string;
  [User.password]: string;
  [User.role]: UserRole;
  [User.email]?: string;
  [User.emailCode]?: string;
  [User.mobileCode]?: string;
  [User.lastLoginDate]?: Date;
  [User.status]?: boolean;
  [User.county]?: string;
  [User.shortCode]?: string;
  [User.province]?: string;
  [User.imageUrl]?: [];
}

export const UserRequiredFields = [
  User.firstName,
  User.lastName,
  User.password,
  User.role,
  User.phoneNumber,
];

export const UserAcceptableFields = [
  User.firstName,
  User.lastName,
  User.phoneNumber,
  User.password,
  User.role,
  User.email,
  User.emailCode,
  User.mobileCode,
  User.lastLoginDate,
  User.status,
];
