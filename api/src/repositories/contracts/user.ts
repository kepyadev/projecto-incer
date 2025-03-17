import { IUser, userDTO } from '../../types/user';

export type createUserRepository = (data: userDTO) => Promise<IUser>;
