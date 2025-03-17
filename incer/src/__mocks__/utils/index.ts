/* eslint-disable func-names */

import { HttpResponse, ListDataResponse } from '../../services/services.types';
import { MsgData } from '../../types/services';

// eslint-disable-next-line import/prefer-default-export
export const fakeLocalStorage = (function () {
  let store: any = {};

  return {
    getItem(key: any) {
      return store[key] || null;
    },
    setItem(key: any, value: any) {
      store[key] = value.toString();
    },
    removeItem(key: any) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

export const apiResponse = <T>(
  data: T,
  status: number = 200
): HttpResponse<MsgData<T>> => {
  return { status, data: { payload: data, msg: 'sucess' } };
};

export const apiListResponse = <T>(
  payload: T,
  status: number = 200,
  msg: string = ''
): HttpResponse<MsgData<ListDataResponse<T>>> => {
  return {
    status,
    data: { payload: { data: payload, count: 1 }, msg },
  };
};
