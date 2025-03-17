import { cultureTypeMock } from '../../__mocks__/entiteis';
import { HTTP } from '../../constants';
import APIROUTES from '../../constants/api-routes';
import { getRequest } from '../utils';
import { getAllCulturasTypes } from '.';

jest.mock('../utils');
describe('CULTURE TYPE SERVICES', () => {
  it('Should call getRequest for get all culture types', async () => {
    (getRequest as jest.Mock).mockResolvedValue({
      status: HTTP.SUCCESS,
      data: { payload: [cultureTypeMock] },
    });
    const response = await getAllCulturasTypes();

    expect(getRequest).toBeCalledWith(`${APIROUTES.CULTURE_TYPE}`);
    expect(response).toStrictEqual({
      status: HTTP.SUCCESS,
      data: { payload: [cultureTypeMock] },
    });
  });
});
