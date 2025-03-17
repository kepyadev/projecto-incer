import bcrypt from 'bcrypt';

import { User, UserRole } from '../../constants';
import userModel from '../../entities/user.model';
import { IUser, userDTO } from '../../types/user';
import { createUserRepository } from '../contracts/user';
import { getAllItens } from './repository-helper';

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  const user = await userModel.findOne({ email });
  return user || null;
};

export const findUserByPhone = async (phoneNumber: string): Promise<IUser | null> => {
  const user = await userModel.findOne({ [User.phoneNumber]: phoneNumber });
  return user;
};

export const findAllUsers = async () =>
  getAllItens(userModel, undefined, { role: { $ne: UserRole.SuperAdmin } });

export const DwUserCooperativeCountyProvince = async (): Promise<any[]> =>
  userModel.aggregate([
    [
      {
        $lookup: {
          from: 'counties',
          localField: 'county',
          foreignField: '_id',
          as: 'county',
        },
      },
      {
        $unwind: {
          path: '$county',
        },
      },
      {
        $lookup: {
          from: 'provinces',
          localField: 'county.province',
          foreignField: '_id',
          as: 'province',
        },
      },
      {
        $unwind: {
          path: '$province',
        },
      },
    ],
  ]);

export const findAllTechnician = async () =>
  getAllItens(userModel, undefined, { role: UserRole.Technician }, undefined, false, {
    path: 'county',
  });

export const createUser: createUserRepository = async (user: userDTO) => {
  if (user[User.email] === '' || !user[User.email] || user[User.email] === undefined) {
    delete user[User.email];
  }
  return userModel.create(user);
};

export const setToken = async (email: string, token: string) => {
  const user = await findUserByEmail(email);

  return user?.update({ token });
};

export const updatePassword = async (id: string, password: string) => {
  const user = await userModel.findById(id);

  await user?.updateOne({ password: await bcrypt.hash(password, 10) });
  return user?.updateOne({ $unset: { token: '' } });
};

export const updateUser = async (id: string, data: any) => {
  const user = await userModel.findById(id);

  if (data[User.email] && data[User.email] !== user?.email) {
    const existingUser = await userModel.findOne({ email: data[User.email] });
    if (existingUser) {
      console.error('Email já está em uso');
      throw new Error('Este email já está em uso.');
    }
  }

  await user?.updateOne({
    first_name: data[User.firstName],
    last_name: data[User.lastName],
    email: data[User.email],
    phone_number: data[User.phoneNumber],
    image_url: data[User.imageUrl],
  });

  return user?.updateOne({ $unset: { token: '' } });
};

export const findUserByTokenReset = async (token: string) => userModel.find({ token });

export const deleteUser = (id: string) => userModel.deleteOne({ _id: id });
