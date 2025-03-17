// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';

import app from '../../app';
import { HTTP, Producer, User } from '../../constants';
import {
  generateAccessToken,
  isAllGivenFieldAcceptedForEntity,
  isPasswordMatching,
  isPresentAllRequiredFieldOnBody,
} from '../../controllers/auth-helper';
import { createProducer } from '../../repositories/NoSql/producer.repository';
import { createUser, findUserByEmail } from '../../repositories/NoSql/user.repository';
import { isValidEmail } from '../../utils/regex';

jest.mock('../../repositories/NoSql/user.repository', () => ({
  __esModule: true,
  createUser: jest.fn(),
  findUserByEmail: jest.fn(),
}));

jest.mock('../../repositories/NoSql/producer.repository');
jest.mock('bcrypt');
jest.mock('../../controllers/auth-helper');
jest.mock('../../utils/regex');

describe('SIGNIN ENDPOINT', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  const makeSut = () => request(app).post('/api/auth/login');

  it(`/api/auth/login should return user, token and status ${HTTP.SUCCESS} when credential is rigth`, async () => {
    (isValidEmail as jest.Mock).mockReturnValue(true);
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(true);
    (findUserByEmail as jest.Mock).mockResolvedValueOnce({
      [User.firstName]: 'Zebedeu',
      [User.lastName]: 'Marcio',
      [User.role]: 'producer',
      [User.email]: 'it@laminin.co.ao',
    });
    (isPasswordMatching as jest.Mock).mockResolvedValue(true);
    (generateAccessToken as jest.Mock).mockReturnValue('token');

    const response = await makeSut().send({
      [User.email]: 'it@laminin.co.ao',
      [User.password]: '1234',
    });

    expect(response.status).toBe(HTTP.SUCCESS);
    expect(response.body).toStrictEqual({
      msg: 'Bem-vindo',
      payload: {
        user: { first_name: 'Zebedeu', name: 'Zebedeu Marcio', role: 'producer' },
        token: 'token',
      },
    });
  });

  it(`/api/auth/login should return ${HTTP.BAD_REQUEST} for request whitout email`, async () => {
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(false);
    const response = await makeSut().send({ [User.password]: '1234' });

    expect(response.status).toBe(HTTP.BAD_REQUEST);
    expect(response.body).toHaveProperty('msg');
    expect(response.body).toHaveProperty('translation_key');
  });

  it(`/api/auth/login should return ${HTTP.BAD_REQUEST} for request whit invalid email`, async () => {
    (isValidEmail as jest.Mock).mockReturnValue(false);
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(true);
    const response = await makeSut().send({ [User.password]: '1234' });

    expect(response.status).toBe(HTTP.NOT_ACCEPTED);
    expect(response.body).toHaveProperty('msg');
    expect(response.body).toHaveProperty('translation_key');
  });

  it(`/api/auth/login should return ${HTTP.BAD_REQUEST} for request whitout password`, async () => {
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(false);
    const response = await makeSut().send({ [User.email]: 'it@laminin.co.ao' });

    expect(response.status).toBe(HTTP.BAD_REQUEST);
    expect(response.body).toHaveProperty('msg');
    expect(response.body).toHaveProperty('translation_key');
  });

  it(`/api/auth/login should return ${HTTP.UNAUTHORIZED} for request whit unknow email`, async () => {
    (isValidEmail as jest.Mock).mockReturnValue(true);
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(true);
    (findUserByEmail as jest.Mock).mockResolvedValue(null);

    const response = await makeSut().send({
      [User.email]: 'it@laminin.co.ao',
      [User.password]: '1234',
    });

    expect(response.status).toBe(HTTP.UNAUTHORIZED);
    expect(response.body).toHaveProperty('msg');
    expect(response.body).toHaveProperty('translation_key');
  });

  it(`/api/auth/login should return ${HTTP.UNAUTHORIZED} for request whit wrong password`, async () => {
    (isValidEmail as jest.Mock).mockReturnValue(true);
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(true);
    (findUserByEmail as jest.Mock).mockResolvedValue({
      first_name: 'Zebedeu',
      last_name: 'Marcio',
    });
    (isPasswordMatching as jest.Mock).mockResolvedValue(false);

    const response = await makeSut().send({
      [User.email]: 'it@laminin.co.ao',
      [User.password]: '1234',
    });

    expect(response.status).toBe(HTTP.UNAUTHORIZED);
    expect(response.body).toHaveProperty('msg');
    expect(response.body).toHaveProperty('translation_key');
  });

  it(`/api/auth/login should return ${HTTP.INTERNAL_SERVER_ERROR}`, async () => {
    (isValidEmail as jest.Mock).mockReturnValue(true);
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(true);
    (findUserByEmail as jest.Mock).mockRejectedValue({ error: 'fail' });

    const response = await makeSut().send({
      [User.email]: 'it@laminin.co.ao',
      [User.password]: '1234',
    });

    expect(response.status).toBe(HTTP.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('msg');
    expect(response.body).toHaveProperty('translation_key');
  });
});

describe('SIGNUP ENDPOINT', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  const makeSut = () => request(app).post('/api/auth/register');

  it('Should create producer user for request with right fields', async () => {
    (isValidEmail as jest.Mock).mockReturnValue(true);
    (isAllGivenFieldAcceptedForEntity as jest.Mock).mockReturnValue(true);
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(true);
    (createProducer as jest.Mock).mockResolvedValue({});
    (createUser as jest.Mock).mockResolvedValue({
      [User.firstName]: 'Zebedeu',
      [User.lastName]: 'Marcio',
      [User.email]: 'it@laminin.co.ao',
      [User.role]: 'producer',
      [User.id]: '65d5d72690b03ccb0973578a',
    });

    (generateAccessToken as jest.Mock).mockReturnValue('token jwt');

    const response = await makeSut().send({
      user: {
        [User.firstName]: 'Zebedeu',
        [User.lastName]: 'Marcio',
        [User.email]: 'it@laminin.co.ao',
        [User.password]: '1234',
        [User.role]: 'producer',
      },
      especific_information: {
        [Producer.nif]: '99790008',
      },
    });

    expect(response.status).toBe(HTTP.CREATED);
    expect(response.body).toStrictEqual({
      msg: 'Utilizador cadastrado',
      payload: {
        user: {
          [User.firstName]: 'Zebedeu',
          [User.email]: 'it@laminin.co.ao',
          [User.name]: 'Zebedeu Marcio',
          [User.role]: 'producer',
          [User.id]: '65d5d72690b03ccb0973578a',
        },
        token: 'token jwt',
      },
    });
  });

  it('Should not create user if request have less fields than is required', async () => {
    (isValidEmail as jest.Mock).mockReturnValue(true);
    (isAllGivenFieldAcceptedForEntity as jest.Mock).mockReturnValue(true);
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(false);
    const response = await makeSut().send({
      [User.firstName]: 'Zebedeu',
    });

    expect(response.status).toBe(HTTP.BAD_REQUEST);
    expect(response.body).toHaveProperty('msg');
    expect(response.body).toHaveProperty('translation_key');
  });

  it('Should not create user if request have fields than dont exist on entity', async () => {
    (isValidEmail as jest.Mock).mockReturnValue(true);
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(true);
    (isAllGivenFieldAcceptedForEntity as jest.Mock).mockReturnValue(false);
    const response = await makeSut().send({
      user: {
        [User.firstName]: 'Zebedeu',
        [User.lastName]: 'Marcio',
        [User.email]: 'it@laminin.co.ao',
        [User.password]: '1234',
      },
    });

    expect(response.status).toBe(HTTP.NOT_ACCEPTED);
  });

  it('Should not create user if e-mail is invalid', async () => {
    (isValidEmail as jest.Mock).mockReturnValue(false);

    (isAllGivenFieldAcceptedForEntity as jest.Mock).mockReturnValue(true);
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(true);
    const response = await makeSut().send({
      user: {
        [User.email]: 'Zebedeu',
      },
    });

    expect(response.status).toBe(HTTP.NOT_ACCEPTED);
    expect(response.body).toHaveProperty('msg', 'E-mail inválido');
    expect(response.body).toHaveProperty('translation_key');
  });

  it('Should not create user if have any user with same email', async () => {
    (isValidEmail as jest.Mock).mockReturnValue(true);
    (isAllGivenFieldAcceptedForEntity as jest.Mock).mockReturnValue(true);
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(true);
    (createUser as jest.Mock).mockRejectedValue({
      code: 11000,
      keyValue: { email: 'Zebedeu01Marcio@laminin.co.ao' },
    });

    const response = await makeSut().send({
      user: {
        [User.firstName]: 'Zebedeu',
        [User.lastName]: 'Marcio',
        [User.email]: 'it@laminin.co.ao',
        [User.password]: '1234',
      },
    });

    expect(response.status).toBe(HTTP.UNAUTHORIZED);
    expect(response.body).toHaveProperty('msg');
    expect(response.body).toHaveProperty('error_code', 11000);
  });

  it('Should not create user if some thingh went wrong', async () => {
    (isValidEmail as jest.Mock).mockReturnValue(true);
    (isAllGivenFieldAcceptedForEntity as jest.Mock).mockReturnValue(true);
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(true);
    (createUser as jest.Mock).mockRejectedValue({
      msg: 'Alguma coisa correu mal',
    });

    const response = await makeSut().send({
      user: {
        [User.firstName]: 'Zebedeu',
        [User.lastName]: 'Marcio',
        [User.email]: 'it@laminin.co.ao',
        [User.password]: '1234',
      },
    });

    expect(response.status).toBe(HTTP.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('msg');
  });
});
