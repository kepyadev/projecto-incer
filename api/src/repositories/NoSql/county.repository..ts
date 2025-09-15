import { County, province } from '../../constants';
import countyModel from '../../entities/county.model';
import { CountyDTO } from '../../types/County';

export const getAllCounty = async () => {
  const data = await countyModel
    .find()
    .populate({
      path: County.ProvinceId,
      populate: { path: province.Country },
    })
    .exec();

  return { data, count: data.length };
};

export const getCountyByid = (id: string) =>
  countyModel.findById(id).populate({ path: County.ProvinceId }).exec();

export const createCounty = (county: CountyDTO) => countyModel.create(county);

export const deleteCounty = (id: string) => countyModel.findByIdAndDelete(id);
