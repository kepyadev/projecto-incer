import APIROUTES from '../../constants/api-routes';
import { IEquipamento } from '../../types';
import { MsgData } from '../../types/services';
import { formatQuery } from '../service-helper';
import { AllowedQueryKeys, ListDataResponse } from '../services.types';
import { getRequest } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const getHumanResourceByFazenda =
  (fazendaId: string) =>
  (params: AllowedQueryKeys = {}) =>
    getRequest<MsgData<ListDataResponse<IEquipamento[]>>>(
      `${APIROUTES.HUMAN_RESOURCE}/fazenda/${fazendaId}?${formatQuery(params)}`
    );
