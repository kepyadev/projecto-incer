import { fazendasMock } from '../../__mocks__/entiteis';
import { HTTP } from '../../constants';
import APIROUTES from '../../constants/api-routes';
import { IFazenda } from '../../types/fazenda';
import { MsgData } from '../../types/services';
import { HttpResponse, ListDataResponse } from '../services.types';
import { deleteRequest, getRequest, patchRequest, postRequest } from '../utils';
import {
  createFazenda,
  deleteFazenda,
  getAllFazenda,
  getAllFazendaProducer,
  getFazendaById,
  updateFazenda,
} from '.';

jest.mock('../utils');
describe('Fazenda by producer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should get all fazendas', async () => {
    const response: HttpResponse<ListDataResponse<ReadonlyArray<IFazenda>>> = {
      status: 200,
      data: {
        count: 3,
        data: [fazendasMock],
      },
    };
    (getRequest as jest.Mock).mockResolvedValue(response);
    const responseFinal = await getAllFazendaProducer({ page: 1 });

    expect(getRequest).toBeCalledWith(`${APIROUTES.FAZENDA}/my?page=1`);
    expect(responseFinal).toBe(response);
  });

  it('Should get fazenda by id', async () => {
    (getRequest as jest.Mock).mockResolvedValue({
      status: HTTP.SUCCESS,
      data: { payload: fazendasMock },
    });

    const id = '97afaa';
    const response = await getFazendaById(id);

    expect(getRequest).toBeCalledWith(`${APIROUTES.FAZENDA}/${id}`);
    expect(response).toStrictEqual({
      status: HTTP.SUCCESS,
      data: { payload: fazendasMock },
    });
  });

  it('Should create fazenda', async () => {
    (postRequest as jest.Mock).mockResolvedValue({
      payload: fazendasMock,
      msg: 'afaf',
    });
    const response = await createFazenda(fazendasMock);

    expect(postRequest).toBeCalledWith(APIROUTES.FAZENDA, fazendasMock);
    expect(response).toStrictEqual({ msg: 'afaf', payload: fazendasMock });
  });

  it('Should delete fazenda with rigth params', async () => {
    (deleteRequest as jest.Mock).mockResolvedValue({
      status: 200,
      data: { payload: fazendasMock },
    });

    const id = 'oeiwiw8';
    const response = await deleteFazenda(id);

    expect(deleteRequest).toBeCalledWith(`${APIROUTES.FAZENDA}?id=${id}`);
    expect(response).toStrictEqual({
      status: HTTP.SUCCESS,
      data: { payload: fazendasMock },
    });
  });

  it('Should update fazenda', async () => {
    (patchRequest as jest.Mock).mockResolvedValue({
      status: HTTP.SUCCESS,
      data: { payload: fazendasMock },
    });

    const id = '283973';

    const response = await updateFazenda(id, fazendasMock);

    expect(patchRequest).toBeCalledWith(`${APIROUTES.FAZENDA}/${id}`, fazendasMock);
    expect(response).toStrictEqual({
      status: HTTP.SUCCESS,
      data: { payload: fazendasMock },
    });
  });
});

describe('Fazenda by technician', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should get all fazenda with rigth params', async () => {
    const responseFinal: MsgData<ListDataResponse<ReadonlyArray<IFazenda>>> = {
      payload: { data: [fazendasMock], count: 1 },
      msg: 'afaf',
    };
    (getRequest as jest.Mock).mockResolvedValue(responseFinal);
    const response = await getAllFazenda({ limit: 1 });

    expect(getRequest).toBeCalledWith(`${APIROUTES.FAZENDA}?limit=1`);
    expect(response).toStrictEqual(responseFinal);
  });
});
