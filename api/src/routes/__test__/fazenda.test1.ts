// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';

import app from '../../app';
import { ContactInformation, Fazenda, Geo, Ground, HTTP, Localization } from '../../constants';
import {
  isAllGivenFieldAcceptedForEntity,
  isPresentAllRequiredFieldOnBody,
  validateToken,
} from '../../controllers/auth-helper';
import {
  createFazendaService,
  deleteFazendaService,
  getAllFazendaByProducerService,
  getFazendaByIdService,
  updateFazendaByProducerService,
} from '../../services/fazenda.service';
import { IFazenda } from '../../types/fazenda';
import { isValidBiNumber } from '../../utils/regex';

jest.mock('../../controllers/auth-helper');
jest.mock('../../services/fazenda.service');
jest.mock('../../utils/regex');

const fazendaMock = {
  [Fazenda.Descricao]: 'Chissola',
  [Fazenda.Gerencia]: 'Zebedeu',
  [Fazenda.Nif]: '03399494949',
  [Fazenda.Contact]: {
    [ContactInformation.Phone]: '999000333',
    [ContactInformation.Email]: 'it@laminin.co.ao',
  },
  [Fazenda.DistanciaEstrada]: '100',
  [Fazenda.Estradanacional]: 'Nacional 100',
  [Fazenda.Geo]: {
    [Geo.Latitude]: '30402404',
    [Geo.Longitude]: '-4242444',
  },
  [Fazenda.Localization]: {
    [Localization.Comuna]: 'Tala hady',
    [Localization.County]: 'Cazenda',
    [Localization.Province]: 'Luanda',
  },
  [Fazenda.Ground]: {
    [Ground.AltitudeMedia]: '322',
    [Ground.AreaCorrigida]: '766666',
    [Ground.Orografia]: 'relevo',
    [Ground.PhMedio]: '7',
    [Ground.PropriedadesFisicas]: '6kkliiiii',
  },
};

const fazendaCompleteMock = { [Fazenda.Id]: '242442', ...fazendaMock };

describe('CREATE fazenda CONTROLLER', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    (validateToken as jest.Mock).mockReturnValue({
      user: { _id: '9987', name: 'Zebedeu', role: 'producer' },
    });
  });

  const makeSut = () => request(app).post('/api/fazenda').set({ Authorization: 'tokenype token' });

  it(`Should Create fazenda for request with rigth field status ${HTTP.CREATED}`, async () => {
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(true);
    (isAllGivenFieldAcceptedForEntity as jest.Mock).mockReturnValue(true);
    (createFazendaService as jest.Mock).mockResolvedValue({ ...fazendaMock });
    const response = await makeSut().send({ ...fazendaMock });

    expect(response.status).toBe(HTTP.CREATED);
    expect(response.body).not.toHaveProperty('error_code');
    expect(response.body).toStrictEqual(fazendaMock);
  });

  it(`Should not Create fazenda if request dont give all required fields ${HTTP.BAD_REQUEST}`, async () => {
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(false);
    const response = await makeSut().send(fazendaMock);

    expect(response.status).toBe(HTTP.BAD_REQUEST);
    expect(response.body).toHaveProperty('error_code');
    expect(response.body).toHaveProperty('msg');
  });

  it(`Should not Create fazenda if request give fields that dont exist on entity ${HTTP.BAD_REQUEST}`, async () => {
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(true);
    (isAllGivenFieldAcceptedForEntity as jest.Mock).mockReturnValue(false);
    const response = await makeSut().send(fazendaMock);

    expect(response.status).toBe(HTTP.BAD_REQUEST);
    expect(response.body).toHaveProperty('error_code');
    expect(response.body).toHaveProperty('msg');
  });

  it(`Should not Create fazenda if some thingh went wrong on server`, async () => {
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(true);
    (isAllGivenFieldAcceptedForEntity as jest.Mock).mockReturnValue(true);
    (isValidBiNumber as jest.Mock).mockReturnValue(true);
    (createFazendaService as jest.Mock).mockRejectedValue({ status: 500 });

    const response = await makeSut().send(fazendaMock);

    expect(response.status).toBe(HTTP.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('error_code');
    expect(response.body).toHaveProperty('translation_key');
    expect(response.body).toHaveProperty('msg');
  });
});

describe('READ ALL FAZENDA BY fazenda CONTROLLER', () => {
  const makeSut = () => request(app).get('/api/fazenda').set({ Authorization: 'tokenype token' });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    (validateToken as jest.Mock).mockReturnValue({
      user: { _id: '9987', name: 'Zebedeu', role: 'producer' },
    });
  });

  it('Should return a array with all fazenda', async () => {
    const allFazendas: Array<IFazenda> = [];
    (getAllFazendaByProducerService as jest.Mock).mockResolvedValue({
      data: allFazendas,
      count: 0,
    });
    const response = await makeSut().send();

    expect(response.statusCode).toBe(HTTP.SUCCESS);
    expect(response.body).toStrictEqual({
      msg: '',
      payload: { count: 0, data: allFazendas },
    });
  });

  it(`Should return status ${HTTP.INTERNAL_SERVER_ERROR} with msg if some thingh went wrong on server`, async () => {
    (getAllFazendaByProducerService as jest.Mock).mockRejectedValue({});
    const response = await makeSut().send();

    expect(response.statusCode).toBe(HTTP.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('msg');
  });
});

describe('DELETE fazenda CONTROLLER', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const id = '314144fwr';
  const makeSut = () =>
    request(app).delete(`/api/fazenda?id=${id}`).set({ Authorization: 'tokenype token' });

  it('Should delete fazenda if found', async () => {
    (deleteFazendaService as jest.Mock).mockResolvedValue(fazendaCompleteMock);
    const response = await makeSut();

    expect(deleteFazendaService).toBeCalledWith(id);
    expect(response.status).toBe(HTTP.SUCCESS);
    expect(response.body).toStrictEqual({ msg: '', payload: fazendaCompleteMock });
  });

  it("Should return error if request haven't id", async () => {
    (deleteFazendaService as jest.Mock).mockResolvedValue(fazendaMock);
    const response = await request(app)
      .delete(`/api/fazenda `)
      .set({ Authorization: 'tokenype token' });

    expect(deleteFazendaService).not.toBeCalled();
    expect(response.status).toBe(HTTP.BAD_REQUEST);
  });

  it('Should return error if happen some internal server error', async () => {
    (deleteFazendaService as jest.Mock).mockRejectedValue({ status: HTTP.INTERNAL_SERVER_ERROR });
    const response = await makeSut();

    expect(response.status).toBe(HTTP.INTERNAL_SERVER_ERROR);
  });
});

describe('UPDATE fazenda CONTROLLER', () => {
  beforeEach(() => {
    (validateToken as jest.Mock).mockReturnValue({
      user: { _id: '9987', name: 'Zebedeu', role: 'producer' },
    });
  });

  const id = '33799';
  const makeSut = () =>
    request(app)
      .patch(`/api/fazenda/${id}`)
      .set({ Authorization: 'tokenype token' })
      .send(fazendaCompleteMock);

  it('Should update fazenda', async () => {
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(true);
    (isAllGivenFieldAcceptedForEntity as jest.Mock).mockReturnValue(true);
    (updateFazendaByProducerService as jest.Mock).mockResolvedValue(fazendaCompleteMock);

    const response = await makeSut();

    expect(response.status).toBe(HTTP.SUCCESS);
    expect(response.body).toStrictEqual({ msg: '', payload: fazendaCompleteMock });
  });

  it(`Should not Create fazenda if request dont give all required fields ${HTTP.BAD_REQUEST}`, async () => {
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue('nif');
    (isAllGivenFieldAcceptedForEntity as jest.Mock).mockReturnValue(true);
    (updateFazendaByProducerService as jest.Mock).mockResolvedValue(fazendaCompleteMock);

    const response = await makeSut();

    expect(response.status).toBe(HTTP.BAD_REQUEST);
    expect(response.body).toStrictEqual({
      error: 'Estão em falta campos obrigatórios: nif',
      error_code: HTTP.BAD_REQUEST,
      msg: 'Estão em falta campos obrigatórios: nif',
      translation_key: 'E-10000',
    });
  });

  it(`Should not Create fazenda if request give fields that dont exist on entity ${HTTP.BAD_REQUEST}`, async () => {
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(true);
    (isAllGivenFieldAcceptedForEntity as jest.Mock).mockReturnValue('idade');

    const response = await makeSut();

    expect(response.status).toBe(HTTP.NOT_ACCEPTED);
    expect(response.body).toStrictEqual({
      error: 'Informou campos não aceites: idade',
      error_code: HTTP.NOT_ACCEPTED,
      msg: 'Informou campos não aceites: idade',
      translation_key: 'E-10000',
    });
  });

  it(`Should not Create fazenda if some thingh went wrong on server`, async () => {
    (isPresentAllRequiredFieldOnBody as jest.Mock).mockReturnValue(true);
    (isAllGivenFieldAcceptedForEntity as jest.Mock).mockReturnValue(true);
    (updateFazendaByProducerService as jest.Mock).mockRejectedValue({ msg: 'Ocorreu algum erro' });

    const response = await makeSut();

    expect(response.status).toBe(HTTP.INTERNAL_SERVER_ERROR);
  });
});

describe('READ ONE fazenda CONTROLLER', () => {
  const makeSut = () =>
    request(app).get('/api/fazenda/8242942').set({ Authorization: 'tokenype token' });
  it('Should return one fazenda if found ', async () => {
    (getFazendaByIdService as jest.Mock).mockResolvedValue(fazendaCompleteMock);

    const response = await makeSut();

    expect(response.status).toBe(HTTP.SUCCESS);
    expect(response.body).toStrictEqual({
      msg: 'Fazenda encontrada',
      payload: fazendaCompleteMock,
    });
  });

  it('Should return error if some thint went wrong ', async () => {
    (getFazendaByIdService as jest.Mock).mockRejectedValue({});

    const response = await makeSut();

    expect(response.status).toBe(HTTP.INTERNAL_SERVER_ERROR);
    expect(response.body).toStrictEqual({
      error_code: HTTP.INTERNAL_SERVER_ERROR,
      msg: 'Lamentamos, infelizmente ocorreu um erro',
      translation_key: 'E-10000',
    });
  });
});
