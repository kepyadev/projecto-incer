import { User } from '../constants';

export const signupFields = [
  User.firstName,
  User.lastName,
  User.email,
  User.password,
  User.phoneNumber,
  User.role,
  User.county,
];
export const signupRequiredFields = [
  User.firstName,
  User.lastName,
  User.password,
  User.phoneNumber,
  User.role,
  User.county,
];

export const signinFields = [User.email, User.password];
