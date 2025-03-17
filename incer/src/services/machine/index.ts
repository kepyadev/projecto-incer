import APIROUTES from '../../constants/api-routes';
import { IMachine } from '../../types';
import { MsgData } from '../../types/services';
import { formatQuery } from '../service-helper';
import { AllowedQueryKeys, ListDataResponse } from '../services.types';
import { getRequest } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const getMachineByFazenda =
  (fazendaId: string) =>
  (params: AllowedQueryKeys = {}) =>
    getRequest<MsgData<ListDataResponse<IMachine[]>>>(
      `${APIROUTES.MACHINE}/fazenda/${fazendaId}?${formatQuery(params)}`
    );
