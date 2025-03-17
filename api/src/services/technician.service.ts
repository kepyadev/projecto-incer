import { createUser, findAllTechnician } from '../repositories/NoSql/user.repository';
import { userDTO } from '../types/user';

export const getAllTechnicianService = () => findAllTechnician();

export const CreateTechnicianService = (data: userDTO) => createUser(data);
