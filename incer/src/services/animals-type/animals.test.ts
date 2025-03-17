import { animalTypeMock } from '../../__mocks__/entiteis';
import { HTTP } from '../../constants';
import APIROUTES from '../../constants/api-routes';
import { getRequest } from '../utils';
import { getAllAnimalsTypes } from '.';

jest.mock('../utils');
describe('ANIMALS SERVICE', () => {
  it('Should call getRequest for get all animals', async () => {
    (getRequest as jest.Mock).mockResolvedValue({
      status: HTTP.SUCCESS,
      data: { payload: animalTypeMock },
    });
    const response = await getAllAnimalsTypes();

    expect(getRequest).toBeCalledWith(`${APIROUTES.ANIMALS_TYPE}`);
    expect(response).toStrictEqual({
      status: HTTP.SUCCESS,
      data: { payload: animalTypeMock },
    });
  });
});
