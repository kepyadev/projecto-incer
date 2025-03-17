import { Cooperative, County } from '../../constants';
import cooperativeModel from '../../entities/cooperative.model';
import { IFetchParams } from '../../types';
import { getAllItens } from './repository-helper';

const getAllCooperativeByAssoc = (fetchParams: IFetchParams & Record<string, any>) =>
  getAllItens(
    cooperativeModel,
    fetchParams,
    {
      [Cooperative.isCooperative]: false,
    },

    { [Cooperative.userId]: false },
    false,
    [
      { path: Cooperative.userId },
      {
        path: Cooperative.county,
        select: '-createdAt -updatedAt -__v',
        populate: { path: County.ProvinceId, select: '-createdAt -updatedAt -__v' },
      },
    ]
  );

export default getAllCooperativeByAssoc;
