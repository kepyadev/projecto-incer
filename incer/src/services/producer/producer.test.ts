import { cooperativeMock, producerMockList } from '../../__mocks__/entiteis';
import { apiListResponse } from '../../__mocks__/utils';
import { HTTP } from '../../constants';
import APIROUTES from '../../constants/api-routes';
import { getRequest } from '../utils';
import { getAllProducers, getMyCooperative } from '.';

jest.mock('../utils');

describe('PRODUCER SERVICE', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Should get all producers', async () => {
    (getRequest as jest.Mock).mockResolvedValue(apiListResponse(producerMockList));

    const response = await getAllProducers({ limit: 2 });

    expect(getRequest).toBeCalledWith(`${APIROUTES.PRODUCER}?limit=2`);
    expect(response).toStrictEqual(apiListResponse(producerMockList));
  });

  it('Should  get the cooperative of logged producer', async () => {
    (getRequest as jest.Mock).mockResolvedValue({
      status: HTTP.SUCCESS,
      data: { payload: cooperativeMock },
    });
    const response = await getMyCooperative();

    expect(getRequest).toBeCalledWith(`${APIROUTES.PRODUCER}/my-cooperative`);
    expect(response).toStrictEqual({
      status: HTTP.SUCCESS,
      data: { payload: cooperativeMock },
    });
  });
});
