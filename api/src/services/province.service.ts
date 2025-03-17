import { getAllProvince, getProvinceById } from '../repositories/NoSql/province.repository';

// eslint-disable-next-line import/prefer-default-export
export const getAllProvinceService = () => getAllProvince();

export const getProvinceByIdService = (id: string) => getProvinceById(id);
