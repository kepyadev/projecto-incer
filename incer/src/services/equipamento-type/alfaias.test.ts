import { equipamentoMock } from '../../__mocks__/entiteis';
import { HTTP } from '../../constants';
import APIROUTES from '../../constants/api-routes';
import { getRequest } from '../utils';
import { getAllEquipamentosType } from '.';

jest.mock('../utils');
describe('ALFAIAS SERVICES', () => {
  it('Should call getRequest for get all equipamentos ', async () => {
    (getRequest as jest.Mock).mockResolvedValue({
      status: HTTP.SUCCESS,
      data: { payload: equipamentoMock },
    });
    const response = await getAllEquipamentosType();

    expect(getRequest).toBeCalledWith(`${APIROUTES.EQUIPAMENTO_TYPE}`);
    expect(response).toStrictEqual({
      status: HTTP.SUCCESS,
      data: { payload: equipamentoMock },
    });
  });
});
