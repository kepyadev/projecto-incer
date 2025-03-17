import provinceModel from '../../entities/province.model';
import { ProvinceDTO } from '../../types/province';

export const getAllProvince = async () => {
  const data = await provinceModel
    .aggregate([
      {
        $lookup: {
          from: 'counties',
          localField: '_id',
          foreignField: 'province',
          as: 'countys',
        },
      },
      {
        $sort: {
          description: 1,
        },
      },
    ])
    .exec();

  return { data, count: data.length };
};

export const getProvinceById = async (id: string) => {
  const data = await provinceModel.findById(id);

  return data;
};
export const createProvince = (province: ProvinceDTO) => provinceModel.create(province);
