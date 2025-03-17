import {
  CreateNationalMarketPrices,
  DeleteNationalMarketPrices,
  getAllNationalMarketPrices,
  getNationalMarketPricesById,
  UpdateNationalMarketPrices,
} from '../repositories/NoSql/market-price.repository';
import { NationalMarketPricesDTO } from '../types/market-prices';

export const getAllNationalMarketService = () => getAllNationalMarketPrices();

export const getNationalMarketServiceById = (id: string) => getNationalMarketPricesById(id);

export const CreateNationalMarketService = (data: NationalMarketPricesDTO) => {
  console.log(data);
  return CreateNationalMarketPrices(data);
};

export const DeleteNationalMarketService = (id: string) => DeleteNationalMarketPrices(id);

export const UpdateNationalMarketServiceService = (id: string, data: NationalMarketPricesDTO) =>
  UpdateNationalMarketPrices(id, data);
