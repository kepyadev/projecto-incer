import { cultureMock } from '../../__mocks__/entiteis';
import { apiListResponse } from '../../__mocks__/utils';
import { HTTP } from '../../constants';
import APIROUTES from '../../constants/api-routes';
import { getRequest } from '../utils';
import { getAllCulture, getAllCultureCooperative } from '.';

jest.mock('../utils');
describe('CULTURE SERVICE', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Should call getRequest for get all culture', async () => {
    (getRequest as jest.Mock).mockResolvedValue({
      status: HTTP.SUCCESS,
      data: { payload: [cultureMock] },
    });
    const cooperativeId = '0000';
    const response = await getAllCultureCooperative(cooperativeId)();

    expect(getRequest).toBeCalledWith(
      `${APIROUTES.COOPERATIVE}/${cooperativeId}/culture?`
    );
    expect(response).toStrictEqual({
      status: HTTP.SUCCESS,
      data: { payload: [cultureMock] },
    });
  });

  it('Should get all cultures', async () => {
    (getRequest as jest.Mock).mockResolvedValue(apiListResponse([cultureMock]));
    const response = await getAllCulture({ limit: 1 });

    expect(getRequest).toBeCalledWith(`${APIROUTES.CULTURE}?limit=1`);
    expect(response).toStrictEqual(apiListResponse([cultureMock]));
  });
});
