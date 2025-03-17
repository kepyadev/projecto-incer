import APIROUTES from '../../constants/api-routes';
import { Producer } from '../../constants/entities';
import { ICooperative, ICooperativeDTO } from '../../types/cooperative';
import { IProducer, ProducerDTO } from '../../types/producer';
import { MsgData } from '../../types/services';
import { formatQuery } from '../service-helper';
// import { formatQuery } from '../service-helper';
import { AllowedQueryKeys, HttpResponse, ListDataResponse } from '../services.types';
import { getRequest, patchRequest, postRequest } from '../utils';

/**
 *
 * @param _params fetch object {limit: number, page: number} for pagination
 * @returns all cooperatives, only for this ROLES [Technician, Admin]
 */
export const getAllCooperative = (
  params: AllowedQueryKeys & { entity?: number } = {}
): Promise<HttpResponse<MsgData<ListDataResponse<ICooperative[]>>>> =>
  // Promise.resolve(apiListResponse<ICooperative[]>([cooperativeMock]));
  getRequest(`${APIROUTES.COOPERATIVE}?${formatQuery(params)}`);

export const getCooperativeResume = () =>
  getRequest<any>(`${APIROUTES.COOPERATIVE}/resume`);

/**
 *
 * @param _params fetch object {limit: number, page: number} for pagination
 * @returns all producers of logged cooperative
 */
export const getAllProducersByCooperative = (
  params: AllowedQueryKeys = {}
): Promise<HttpResponse<MsgData<ListDataResponse<IProducer[]>>>> =>
  getRequest(`${APIROUTES.COOPERATIVE}/producer?${formatQuery(params)}`);

export const getCooperativeById = (
  id: string
): Promise<HttpResponse<MsgData<ICooperative>>> =>
  getRequest(`${APIROUTES.COOPERATIVE}/${id}`);

export const addExistentProducer = (data: {
  [Producer.Id]: string;
  [Producer.Cooperative]: string;
}) =>
  patchRequest<MsgData<IProducer>>(
    `${APIROUTES.COOPERATIVE_ADD_EXISTENT_PRODUCER}`,
    data
  );

export const addNewProducer = (data: ProducerDTO, cooperative: string) =>
  postRequest<MsgData<IProducer>>(
    `${APIROUTES.COOPERATIVE}/${cooperative}/producer`,
    data
  );

export const unlinkProducer = (data: { producer: string }) =>
  patchRequest(`${APIROUTES.PRODUCER}/unlink-with-cooperative`, {
    producer: data.producer,
  });

export const createCooperative = (data: ICooperativeDTO) =>
  postRequest(APIROUTES.COOPERATIVE, data);
