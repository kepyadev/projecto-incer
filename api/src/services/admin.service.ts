import { createUser } from '../repositories/NoSql/user.repository';
import { userDTO } from '../types/user';

// eslint-disable-next-line import/prefer-default-export
export const CreateAdminService = (data: userDTO) => createUser(data);
