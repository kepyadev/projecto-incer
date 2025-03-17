import APIROUTES from '../../constants/api-routes';
import { IInfraestrutura } from '../../types';
import { MsgData } from '../../types/services';
import { formatQuery } from '../service-helper';
import { AllowedQueryKeys, ListDataResponse } from '../services.types';
import { getRequest } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const getInfraestruturaByFazenda =
  (fazendaId: string) =>
  (params: AllowedQueryKeys = {}) =>
    getRequest<MsgData<ListDataResponse<IInfraestrutura[]>>>(
      `${APIROUTES.INFRAESTRUTURA}/fazenda/${fazendaId}?${formatQuery(params)}`
    );
