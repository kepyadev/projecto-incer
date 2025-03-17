/* eslint-disable import/prefer-default-export */
import APIROUTES from '../../constants/api-routes';
import { ILog } from '../../types/logs';
import { MsgData } from '../../types/services';
import { formatQuery } from '../service-helper';
import { AllowedQueryKeys, HttpResponse, ListDataResponse } from '../services.types';
import { getRequest } from '../utils';

export const getAllLogs = (
  params: AllowedQueryKeys = {}
): Promise<HttpResponse<MsgData<ListDataResponse<ILog>>>> =>
  getRequest(`${APIROUTES.LOGS}?${formatQuery(params)}`);
