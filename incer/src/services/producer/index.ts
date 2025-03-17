import APIROUTES from '../../constants/api-routes';
import { IAnimal } from '../../types';
import { ICooperative } from '../../types/cooperative';
import { ICulture } from '../../types/culture';
import { IProducer } from '../../types/producer';
import { MsgData } from '../../types/services';
import { formatQuery } from '../service-helper';
// import { formatQuery } from '../service-helper';
import { AllowedQueryKeys, HttpResponse, ListDataResponse } from '../services.types';
import { getRequest } from '../utils';

/**
 *
 * @param params fetch params
 * @returns all producers ROLES [Technician, Admin]
 */
export const getAllProducers = (
  params: AllowedQueryKeys = {}
): Promise<HttpResponse<MsgData<ListDataResponse<IProducer[]>>>> =>
  getRequest<MsgData<ListDataResponse<IProducer[]>>>(
    `${APIROUTES.PRODUCER}?${formatQuery(params)}`
  );

export const getAllProducersWithCooperative = (
  params: AllowedQueryKeys = {}
): Promise<HttpResponse<MsgData<ListDataResponse<IProducer[]>>>> =>
  getRequest<MsgData<ListDataResponse<IProducer[]>>>(
    `${APIROUTES.PRODUCER}/with-cooperative?${formatQuery(params)}`
  );

export const getAllProducersByCooperativeId =
  (id: string) =>
  (
    params: AllowedQueryKeys = {}
  ): Promise<HttpResponse<MsgData<ListDataResponse<IProducer[]>>>> =>
    getRequest(`${APIROUTES.COOPERATIVE}/${id}/producer?${formatQuery(params)}`);

export const getProducerResume = () =>
  getRequest<any>(`${APIROUTES.PRODUCER}/resume`);

/**
 *
 * @param _id producer id
 * @returns one producer of logged cooperative
 */
export const getOneProducerByCooperative = (
  producerId: string,
  cooperativeId: string
): Promise<HttpResponse<MsgData<IProducer>>> =>
  getRequest(`${APIROUTES.COOPERATIVE}/${cooperativeId}/producer/${producerId}`);

/**
 *
 * @param _id user id
 * @returns producer from user id
 */
export const getOneProducerByUserId = (
  id: string
): Promise<HttpResponse<MsgData<IProducer>>> =>
  getRequest(`${APIROUTES.PRODUCER}/user/${id}`);
// Promise.resolve({
//   status: 200,
//   data: { msg: '', payload: withFazendas(producerMock) as unknown as IProducer },
// });

export const getProducerById = (
  id: string
): Promise<HttpResponse<MsgData<IProducer>>> =>
  getRequest(`${APIROUTES.PRODUCER}/${id}`);

/**
 *
 * @returns cooperative of logged producer
 */
export const getMyCooperative = () =>
  getRequest<MsgData<ICooperative | undefined>>(
    `${APIROUTES.PRODUCER}/my-cooperative`
  );

export const getCultureByProducer = (
  params: AllowedQueryKeys = { page: 1, limit: 4 }
) =>
  getRequest<MsgData<ListDataResponse<ICulture[]>>>(
    `${APIROUTES.PRODUCER}/my-cultures?${formatQuery(params)}`
  );

export const getAnimalsByProducer = (
  params: AllowedQueryKeys = { page: 1, limit: 4 }
) =>
  getRequest<MsgData<ListDataResponse<IAnimal[]>>>(
    `${APIROUTES.PRODUCER}/my-animals?${formatQuery(params)}`
  );
