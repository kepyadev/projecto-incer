import {
  createCounty,
  getAllCounty,
  getCountyByid,
} from '../repositories/NoSql/county.repository.';
import { CountyDTO } from '../types/County';

export const getAllCountyService = () => getAllCounty();

export const getCountyByIdService = (id: string) => getCountyByid(id);

export const createCountyService = (countyData: CountyDTO, user: any) => 
  createCounty({ ...countyData, owner: user._id || user.id });
