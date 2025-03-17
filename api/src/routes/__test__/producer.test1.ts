// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';

import app from '../../app';
import { HTTP } from '../../constants/index';
import { Producer } from '../../constants/producer';
import {
  isAllGivenFieldAcceptedForEntity,
  isPresentAllRequiredFieldOnBody,
  validateToken,
} from '../../controllers/auth-helper';
import { getAllProducerService, serviceCreateProducer } from '../../services/producer.service';
import { IProducer } from '../../types/producer';
import { isValidBiNumber } from '../../utils/regex';

jest.mock('../../controllers/auth-helper');
jest.mock('../../services/producer.service');
jest.mock('../../utils/regex');

describe('CREATE PRODUCER CONTROLLER', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    (validateToken as jest.Mock).mockReturnValue({
      user: { _id: '9987', name: 'Zebedeu', role: 'producer' },
    });
  });

  const makeSut = () => request(app).post('/api/producer').set({ Authorization: 'tokenype token' });
  const producerMock = {
    [Producer.bi]: '0093LA14897',
    [Producer.nif]: '0093LA15887',
    [Producer.county]: 'caze5ngo',
    [Producer.cooperativeId]: '65d5d72690b03ccb0973578a',
    [Producer.userId]: '65d5d72690b03ccb0973578a',
    [Producer.isProducer]: 'single',
  };

  it(`Should Create PRODUCER for request with rigth field status ${HTTP.CREATED}`, async () => {
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(true);
    (isAllGivenFieldAcceptedForEntity as jest.Mock).mockReturnValue(true);
    (isValidBiNumber as jest.Mock).mockReturnValue(true);

    (serviceCreateProducer as jest.Mock).mockResolvedValue({ ...producerMock });
    const response = await makeSut().send({ ...producerMock });

    expect(response.status).toBe(HTTP.CREATED);
    expect(response.body).not.toHaveProperty('error_code');
    expect(response.body).toStrictEqual({ msg: 'Produtor cadastrado', payload: producerMock });
  });

  it(`Should not Create PRODUCER if request dont give all required fields ${HTTP.BAD_REQUEST}`, async () => {
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(false);
    const response = await makeSut().send(producerMock);

    expect(response.status).toBe(HTTP.BAD_REQUEST);
    expect(response.body).toHaveProperty('error_code');
    expect(response.body).toHaveProperty('translation_key');
    expect(response.body).toHaveProperty('msg');
  });

  it(`Should not Create PRODUCER if request give fields that dont exist on entity ${HTTP.BAD_REQUEST}`, async () => {
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(true);
    (isAllGivenFieldAcceptedForEntity as jest.Mock).mockReturnValue(false);
    const response = await makeSut().send({
      [Producer.bi]: '0093LA14887',
      [Producer.nif]: '0093LA13887',
      [Producer.county]: 'cazengo',
      [Producer.cooperativeId]: '40018441',
      [Producer.userId]: '65d5d72690b03ccb0973578a',
      random_field: 'random_value',
    });

    expect(response.status).toBe(HTTP.BAD_REQUEST);
    expect(response.body).toHaveProperty('error_code');
    expect(response.body).toHaveProperty('translation_key');
    expect(response.body).toHaveProperty('msg');
  });

  it(`Should not Create PRODUCER if BI field is invalid`, async () => {
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(true);
    (isAllGivenFieldAcceptedForEntity as jest.Mock).mockReturnValue(true);
    (isValidBiNumber as jest.Mock).mockReturnValue(false);
    const response = await makeSut().send({
      [Producer.bi]: '0093',
      [Producer.nif]: '0093LA13887',
      [Producer.county]: 'cazengo',
      [Producer.cooperativeId]: '40018441',
      [Producer.userId]: '65d5d72690b03ccb0973578a',
      random_field: 'random_value',
    });

    expect(response.status).toBe(HTTP.BAD_REQUEST);
    expect(response.body).toHaveProperty('error_code');
    expect(response.body).toHaveProperty('translation_key');
    expect(response.body).toHaveProperty('msg');
  });

  it(`Should not Create PRODUCER if some thingh went wrong on server`, async () => {
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(true);
    (isAllGivenFieldAcceptedForEntity as jest.Mock).mockReturnValue(true);
    (isValidBiNumber as jest.Mock).mockReturnValue(true);
    (serviceCreateProducer as jest.Mock).mockRejectedValue({ status: 500 });

    const response = await makeSut().send({
      [Producer.bi]: '0093',
      [Producer.nif]: '0093LA13887',
      [Producer.county]: 'cazengo',
      [Producer.cooperativeId]: '40018441',
      [Producer.userId]: '65d5d72690b03ccb0973578a',
      random_field: 'random_value',
    });

    expect(response.status).toBe(HTTP.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('error_code');
    expect(response.body).toHaveProperty('translation_key');
    expect(response.body).toHaveProperty('msg');
  });
});

describe('READ ALL PRODUCER CONTROLLER', () => {
  const makeSut = () => request(app).get('/api/producer').set({ Authorization: 'tokenype token' });

  beforeEach(() => {
    (validateToken as jest.Mock).mockReturnValue({
      user: { _id: '9987', name: 'Zebedeu', role: 'admin' },
    });
  });

  it('Should return a array with all PRODUCER', async () => {
    const allProducer: Array<IProducer> = [];
    (getAllProducerService as jest.Mock).mockResolvedValue({ data: allProducer, count: 0 });
    const response = await makeSut().send();

    expect(response.statusCode).toBe(HTTP.SUCCESS);
    expect(response.body).toStrictEqual({
      msg: '',
      payload: { count: 0, data: allProducer },
    });
  });

  it(`Should return status ${HTTP.INTERNAL_SERVER_ERROR} with msg if some thingh went wrong on server`, async () => {
    (getAllProducerService as jest.Mock).mockRejectedValue({});
    const response = await makeSut().send();

    expect(response.statusCode).toBe(HTTP.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('msg');
  });
});
