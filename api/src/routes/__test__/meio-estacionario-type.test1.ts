// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';

import app from '../../app';
import { HTTP, ROUTES } from '../../constants/index';
import { validateToken } from '../../controllers/auth-helper';
import { getAllMeioEstacionarioTypeService } from '../../services/meio-estacionario-type.service';
import { IMeioEstacionarioType } from '../../types/meio-estacionario-type';

jest.mock('../../controllers/auth-helper');
jest.mock('../../services/meio-estacionario-type.service');

describe('READ ALL MEIO ESTACIONARIO TYPE CONTROLLER', () => {
  const makeSut = () =>
    request(app)
      .get(`/api/${ROUTES.meioEstacionarioType}`)
      .set({ Authorization: 'tokenype token' });

  beforeEach(() => {
    (validateToken as jest.Mock).mockReturnValue({
      user: { _id: '9987', name: 'Zebedeu', role: 'admin' },
    });
  });

  it('Should return a array with all meio estacionario', async () => {
    const allMeioEstacionarioType: Array<IMeioEstacionarioType> = [];
    (getAllMeioEstacionarioTypeService as jest.Mock).mockResolvedValue({
      data: allMeioEstacionarioType,
      count: 0,
    });
    const response = await makeSut().send();

    expect(response.statusCode).toBe(HTTP.SUCCESS);
    expect(response.body).toStrictEqual({
      msg: '',
      payload: { count: 0, data: allMeioEstacionarioType },
    });
  });
});
