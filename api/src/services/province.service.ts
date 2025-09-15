import mongoose from 'mongoose';

import { getAllProvince, getProvinceById, createProvince } from '../repositories/NoSql/province.repository';
import { ProvinceDTO } from '../types/province';
import countryModel from '../entities/country.model';

export const getAllProvinceService = () => getAllProvince();

export const getProvinceByIdService = (id: string) => getProvinceById(id);

export const createProvinceService = async (provinceData: ProvinceDTO, user: any) => {
  let countryId = provinceData.country;
  
  // If country is not a valid ObjectId, find or create Angola
  if (!mongoose.Types.ObjectId.isValid(countryId)) {
    let country = await countryModel.findOne({ description: 'Angola' });
    if (!country) {
      country = await countryModel.create({ 
        description: 'Angola',
        owner: user._id || user.id 
      });
    }
    countryId = country._id.toString();
  }
  
  return createProvince({ 
    ...provinceData, 
    country: countryId,
    owner: user._id || user.id 
  });
};
