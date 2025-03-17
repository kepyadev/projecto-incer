import APIROUTES from '../../constants/api-routes';
import { AnimalTypeDTO, IAnimal, IAnimalType } from '../../types';
import { MsgData } from '../../types/services';
import { formatQuery } from '../service-helper';
import { AllowedQueryKeys, HttpResponse, ListDataResponse } from '../services.types';
import { deleteRequest, getRequest, patchRequest, postRequest } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllAnimalsTypes = (): Promise<
  HttpResponse<MsgData<ListDataResponse<IAnimalType[]>>>
> => getRequest(APIROUTES.ANIMALS_TYPE);

export const getOneAnimalType = (
  id: string
): Promise<HttpResponse<MsgData<IAnimalType>>> =>
  getRequest(`${APIROUTES.ANIMALS_TYPE}/${id}`);

export const getAnimalByFazenda =
  (fazendaId: string) =>
  (params: AllowedQueryKeys = {}) =>
    getRequest<MsgData<ListDataResponse<IAnimal[]>>>(
      `${APIROUTES.ANIMALS}/fazenda/${fazendaId}?${formatQuery(params)}`
    );

export const createAnimalType = (data: AnimalTypeDTO) =>
  postRequest(APIROUTES.ANIMALS_TYPE, data);

export const createManyAnimalType = (
  data: Record<string, unknown>[]
): Promise<HttpResponse<MsgData<ListDataResponse<ReadonlyArray<IAnimalType[]>>>>> =>
  postRequest(`${APIROUTES.ANIMALS_TYPE}/many`, data);

export const updateAnimalType = (data: AnimalTypeDTO, id: string) =>
  patchRequest(`${APIROUTES.ANIMALS_TYPE}/${id}`, data);

export const deleteAnimalType = (id: string | number) =>
  deleteRequest(`${APIROUTES.ANIMALS_TYPE}/${id}`);
