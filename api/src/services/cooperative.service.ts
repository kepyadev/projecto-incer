import { ContactInformation, Cooperative, User, UserRole } from '../constants';
import {
  createCooperative,
  findCooperativeByUser,
  getAllCooperative,
  getCooperativeById,
} from '../repositories/NoSql/cooperative.repository';
import { createUser } from '../repositories/NoSql/user.repository';
import { IFetchParams } from '../types';
import { CooperativeDTO } from '../types/cooperative';
import { userDTO } from '../types/user';

export const getCooperativeByIdService = (id: string) => getCooperativeById(id);

export const getAllCooperativeService = (fetchParams?: IFetchParams) =>
  getAllCooperative(fetchParams as any);

export const getCooperativeByUserService = (userId: string) => findCooperativeByUser(userId);

export const createCooperativeService = async (cooperative: CooperativeDTO) => {
  const user: userDTO = {
    [User.firstName]: cooperative[Cooperative.name],
    [User.lastName]: cooperative[Cooperative.name],
    [User.phoneNumber]: cooperative[Cooperative.contact][ContactInformation.Phone],
    [User.email]: cooperative[Cooperative.contact][ContactInformation.Email],
    [User.password]: process.env.DEFAULT_USER_PASSWORD ?? '',
    [User.status]: false,
    [User.role]: UserRole.Cooperative,
  };

  if (!user[User.email]) delete user[User.email];

  const userResponse = await createUser(user);
  return createCooperative({ ...cooperative, [Cooperative.userId]: userResponse[User.id] });
};
