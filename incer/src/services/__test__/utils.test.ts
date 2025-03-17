/* eslint-disable func-names */
import { fakeLocalStorage } from '../../__mocks__/utils';
import {
  deleteRequest,
  getRequest,
  getTokenFromLocalStorage,
  patchRequest,
  postRequest,
} from '../utils';

describe('UTILS', () => {
  describe('MAKE REQUEST', () => {
    it('Should make GET request', async () => {
      const method = 'GET';
      const data = [{ name: 'user', email: 'user@laminin.com' }];
      global.fetch = jest.fn(
        () =>
          Promise.resolve({
            json: () => Promise.resolve(data),
            status: 200,
          }) as any
      );

      const url = 'user/password';
      const response = await getRequest(url);

      expect(fetch).toHaveBeenCalledWith(`${process.env.PUBLIC_API_URL}${url}`, {
        method,
        mode: 'cors',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json',
          Authorization: '',
        },
        body: undefined,
      });

      expect(response).toEqual({ data, status: 200 });
    });

    it('Should make POST request', async () => {
      const method = 'POST';
      const data = [{ name: 'user', email: 'user@laminin.com' }];
      global.fetch = jest.fn(
        () =>
          Promise.resolve({
            json: () => Promise.resolve(data),
            status: 200,
          }) as any
      );

      const url = 'user/password';
      const body = { name: 'Zebedeu' };
      const response = await postRequest(url, body);

      expect(fetch).toHaveBeenCalledWith(`${process.env.PUBLIC_API_URL}${url}`, {
        method,
        mode: 'cors',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json',
          Authorization: '',
        },
        body: JSON.stringify(body),
      });

      expect(response).toEqual({ data, status: 200 });
    });

    it('Should make PATCH request', async () => {
      const method = 'PATCH';
      const data = [{ name: 'user', email: 'user@laminin.com' }];
      global.fetch = jest.fn(
        () =>
          Promise.resolve({
            json: () => Promise.resolve(data),
            status: 200,
          }) as any
      );

      const url = 'user/password';
      const body = { name: 'Zebedeu' };
      const response = await patchRequest(url, body);

      expect(fetch).toHaveBeenCalledWith(`${process.env.PUBLIC_API_URL}${url}`, {
        method,
        mode: 'cors',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json',
          Authorization: '',
        },
        body: JSON.stringify(body),
      });

      expect(response).toEqual({ data, status: 200 });
    });

    it('Should make DELETE request', async () => {
      const method = 'DELETE';
      const data = [{ name: 'user', email: 'user@laminin.com' }];
      global.fetch = jest.fn(
        () =>
          Promise.resolve({
            json: () => Promise.resolve(data),
            status: 200,
          }) as any
      );

      const url = 'user/password';
      const response = await deleteRequest(url);

      expect(fetch).toHaveBeenCalledWith(`${process.env.PUBLIC_API_URL}${url}`, {
        method,
        mode: 'cors',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json',
          Authorization: '',
        },
        body: undefined,
      });

      expect(response).toEqual({ data, status: 200 });
    });

    it('SHould throw an exception when response give a code status outside 200', async () => {
      const errorResponse = {
        msg: {
          i18nCode: 'E-1002',
          defaultValue: 'Ocorreu um erro',
        },
        error: {
          statusCode: 400,
          name: 'ERROR',
          type: 'EMAIL_ERROR',
          message: 'Falha',
          i18nCode: 'E-1002',
          stack: 'Error at query',
          details: { key: 'valor' },
        },
      };
      global.fetch = jest.fn(
        () =>
          Promise.resolve({
            json: () => Promise.reject(errorResponse),
            status: 401,
          }) as any
      );
      try {
        const url = 'user/password';
        await getRequest(url);
      } catch (error) {
        expect(error.msg).toBe(errorResponse.msg);
      }
    });
  });

  describe(`${getTokenFromLocalStorage.name}`, () => {
    beforeAll(() => {
      Object.defineProperty(window, 'localStorage', {
        value: fakeLocalStorage,
      });
    });
    it('Should return AUTH Object if Token and User are seted on Local Storage', () => {
      const auth = { user: { name: 'Zebedeu' }, token: 'token' };
      window.localStorage.setItem('auth', JSON.stringify(auth));

      expect(getTokenFromLocalStorage()).toStrictEqual(auth);
    });

    it('Should return NULL if Token OR User are no seted on Local Storage', () => {
      const auth = { user: { name: 'Zebedeu' } };
      window.localStorage.setItem('auth', JSON.stringify(auth));

      expect(getTokenFromLocalStorage()).toStrictEqual(null);

      const auth2 = { token: 'token' };
      window.localStorage.setItem('auth', JSON.stringify(auth2));

      expect(getTokenFromLocalStorage()).toStrictEqual(null);
    });
  });
});
