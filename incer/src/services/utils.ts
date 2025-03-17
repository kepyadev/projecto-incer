import { ApiRequestMethod, HttpResponse } from './services.types';

const BASE_API_URL = process.env.REACT_APP_API_URL;

export const makeRequest =
  (method: ApiRequestMethod) =>
  async <T>(endpoint: string, data?: Object): Promise<HttpResponse<any>> => {
    const response = await fetch(`${BASE_API_URL}${endpoint}`, {
      method,
      mode: 'cors',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getTokenFromLocalStorage()?.token || '',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (response.status < 200 || response.status > 299)
      throw new Error(responseData.msg);

    return {
      status: response.status,
      data: responseData as T,
    };
  };

export const postRequest = makeRequest('POST');
export const getRequest = makeRequest('GET');
export const deleteRequest = makeRequest('DELETE');
export const patchRequest = makeRequest('PATCH');

export const getTokenFromLocalStorage = () => {
  const auth = localStorage.getItem('auth');
  if (auth) {
    const { token, user } = JSON.parse(auth);
    if (token && user) return { token, user };
  }

  return null;
};
