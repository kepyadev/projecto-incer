import APIROUTES from '../../constants/api-routes';
import { IMeioEstacionario } from '../../types';
import { MsgData } from '../../types/services';
import { formatQuery } from '../service-helper';
import { AllowedQueryKeys, ListDataResponse } from '../services.types';
import { getRequest } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const getMeioEstacionarioByFazenda =
  (fazendaId: string) =>
  (params: AllowedQueryKeys = {}) =>
    getRequest<MsgData<ListDataResponse<IMeioEstacionario[]>>>(
      `${APIROUTES.MEIO_ESTACIONARIO}/fazenda/${fazendaId}?${formatQuery(params)}`
    );
