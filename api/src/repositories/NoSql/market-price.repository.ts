import { FilterQuery } from 'mongoose';

import { NationalMarketPricesTypes } from '../../constants';
import nationalMarketPricesModel from '../../entities/market-prices.model';
import { NationalMarketPricesDTO } from '../../types/market-prices';
import { deleteEntity, getAllItens, updateGeneric } from './repository-helper';
// eslint-disable-next-line import/prefer-default-export

export const getAllNationalMarketPrices = () => getAllItens(nationalMarketPricesModel);

export const getNationalMarketPricesById = (id: string) =>
  nationalMarketPricesModel
    .findOne({
      [NationalMarketPricesTypes.Id]: id,
    } as FilterQuery<NationalMarketPricesDTO>)
    .exec();

export const CreateNationalMarketPrices = (infrastruture: NationalMarketPricesDTO) =>
  nationalMarketPricesModel.create(infrastruture);

export const DeleteNationalMarketPrices = (id: string) =>
  deleteEntity<NationalMarketPricesDTO>(nationalMarketPricesModel, {
    [NationalMarketPricesTypes.Id]: id,
  } as FilterQuery<NationalMarketPricesDTO>);

export const UpdateNationalMarketPrices = (id: string, data: NationalMarketPricesDTO) =>
  updateGeneric(nationalMarketPricesModel, id, data);
