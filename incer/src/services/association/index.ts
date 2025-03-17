import APIROUTES from '../../constants/api-routes';
import { ICooperative } from '../../types/cooperative';
import { MsgData } from '../../types/services';
import { formatQuery } from '../service-helper';
// import { formatQuery } from '../service-helper';
import { AllowedQueryKeys, HttpResponse, ListDataResponse } from '../services.types';
import { getRequest } from '../utils';

/**
 *
 * @param _params fetch object {limit: number, page: number} for pagination
 * @returns all cooperatives, only for this ROLES [Technician, Admin]
 */
const getAllAssociation = (
  params: AllowedQueryKeys & { entity?: number } = {}
): Promise<HttpResponse<MsgData<ListDataResponse<ICooperative[]>>>> =>
  getRequest(`${APIROUTES.ASSOCIATION}?${formatQuery(params)}`);

export default getAllAssociation;
