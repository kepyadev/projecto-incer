import APIROUTES from '../../constants/api-routes';
import { IProducer, ProducerDTO } from '../../types/producer';
import { MsgData } from '../../types/services';
import { ITechnician, IUser, techinicianDTO } from '../../types/user';
import { formatQuery } from '../service-helper';
import { AllowedQueryKeys, ListDataResponse } from '../services.types';
import { getRequest, postRequest } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllTechnician = (params: AllowedQueryKeys = {}) =>
  getRequest<MsgData<ListDataResponse<ITechnician[]>>>(
    `${APIROUTES.TECHNICIAN}?${formatQuery(params)}`
  );

export const createTechnician = (data: techinicianDTO) =>
  postRequest<MsgData<IUser>>(APIROUTES.TECHNICIAN, data);

export const addNewProducerWithCooperativeTechnician = (data: ProducerDTO) =>
  postRequest<MsgData<IProducer>>(`${APIROUTES.TECHNICIAN}/producer`, data);

export const addNewProducerWithoutCooperativeTechnician = (data: ProducerDTO) =>
  postRequest<MsgData<IProducer>>(
    `${APIROUTES.TECHNICIAN}/producer/without-cooperative`,
    data
  );

export const getTechnicianResume = () =>
  getRequest<any>(`${APIROUTES.TECHNICIAN}/resume`);
