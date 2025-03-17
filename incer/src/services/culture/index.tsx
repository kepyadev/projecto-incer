import APIROUTES from '../../constants/api-routes';
import { Culture } from '../../constants/entities';
import { ICulture } from '../../types/culture';
import { MsgData } from '../../types/services';
import { formatQuery } from '../service-helper';
import { AllowedQueryKeys, HttpResponse, ListDataResponse } from '../services.types';
import { getRequest } from '../utils';

export const getAllCulture = (
  params: AllowedQueryKeys = {}
): Promise<HttpResponse<MsgData<ListDataResponse<ReadonlyArray<ICulture>>>>> =>
  // Promise.resolve(apiListResponse([cultureMock]));
  getRequest(`${APIROUTES.CULTURE}?${formatQuery(params)}`);

export const getAllCultureCooperative =
  (id: string) =>
  (params: AllowedQueryKeys = { page: 1, limit: 4 }) =>
    getRequest<MsgData<ListDataResponse<ICulture[]>>>(
      `${APIROUTES.COOPERATIVE}/${id}/culture?${formatQuery(params)}`
    );

export const getCultureByFazenda =
  (fazendaId: string) =>
  (params: AllowedQueryKeys = {}) =>
    getRequest<MsgData<ListDataResponse<Culture[]>>>(
      `${APIROUTES.CULTURE}/fazenda/${fazendaId}?${formatQuery(params)}`
    );
