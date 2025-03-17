/* eslint-disable import/prefer-default-export */
import { IMinisterio } from '../../types/ministerio';
import { MsgData } from '../../types/services';
import { AllowedQueryKeys, HttpResponse, ListDataResponse } from '../services.types';

export const getAllMinisterios = (
  _params: AllowedQueryKeys = {}
): Promise<HttpResponse<MsgData<ListDataResponse<IMinisterio[]>>>> =>
  Promise.resolve({
    status: 201,
    data: {
      msg: 'ueq',
      payload: {
        count: 0,
        data: [{ _id: 'eqq787', name: 'MEP' }],
      },
    },
  });
