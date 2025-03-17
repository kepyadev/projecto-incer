import APIROUTES from '../../constants/api-routes';
import {
  INationalMarketPrices,
  INationalMarketPricesData,
} from '../../types/NationalMarketPrices';
import { MsgData } from '../../types/services';
import { formatQuery } from '../service-helper';
import { AllowedQueryKeys, HttpResponse, ListDataResponse } from '../services.types';
import { deleteRequest, getRequest, patchRequest, postRequest } from '../utils';

export const getAllNationalMarketPrices = (
  params: AllowedQueryKeys = {}
): Promise<
  HttpResponse<MsgData<ListDataResponse<ReadonlyArray<INationalMarketPrices>>>>
> =>
  // Promise.resolve(apiListResponse([cultureMock]));
  getRequest(`${APIROUTES.MARKET_PRICES}?${formatQuery(params)}`);

export const getAllNationalMarketPricesById = (
  id: string
): Promise<HttpResponse<MsgData<INationalMarketPrices>>> =>
  getRequest(`${APIROUTES.MARKET_PRICES}/${id}`);

export const CreateNationalMarketPrices = (data: INationalMarketPricesData) =>
  postRequest(APIROUTES.MARKET_PRICES, data);

export const CreateManyNationalMarketPrices = (
  data: Record<string, unknown>[]
): Promise<
  HttpResponse<MsgData<ListDataResponse<ReadonlyArray<INationalMarketPrices>>>>
> => postRequest(`${APIROUTES.MARKET_PRICES}/many`, data);

export const UpdateNationalMarketPrices = (
  data: INationalMarketPricesData,
  id: string
) => patchRequest(`${APIROUTES.MARKET_PRICES}/${id}`, data);

export const DeleteNationalMarketPrices = (id: string | number) =>
  deleteRequest(`${APIROUTES.MARKET_PRICES}/${id}`);
