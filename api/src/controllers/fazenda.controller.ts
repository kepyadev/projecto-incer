import { Request, Response } from 'express';

import { Fazenda, HTTP, owner, User, UserRole } from '../constants';
import Animal from '../constants/animal';
import { Equipamento } from '../constants/equipamento';
import { HumanResource } from '../constants/human-resource';
import { Infrastructure } from '../constants/infrastructure';
import { Machine } from '../constants/machine';
import { MeioEstacionario } from '../constants/meio-estacionario';
import { getAnimalTypeById } from '../repositories/NoSql/animal-type.repository';
import { getHumanResourceTypeById } from '../repositories/NoSql/human-resource-type';
import { getInfrastrutureTypeById } from '../repositories/NoSql/infrastruture-type.repository';
import { createAnimalService } from '../services/animal.service';
import { createCulturaService } from '../services/cultura.service';
import { createEquipamentoService } from '../services/equipamento.service';
import { getEquipamentoTypeByIdService } from '../services/equipamento-type.service';
import {
  addAnimalService,
  addEquipamentoService,
  addHumanResourceService,
  addInfrastrutureService,
  addMachineService,
  addMeioEstacionarioService,
  createFazendaService,
  deleteFazendaService,
  fazendaGrownService,
  findFazendaByNifService,
  getAllFazendaService,
  getFazendaByIdService,
  updateFazendaByProducerService,
} from '../services/fazenda.service';
import { createHumanResourceService } from '../services/human-resource.service';
import { createInfrastrutureService } from '../services/infrastruture.service';
import { createMachineService } from '../services/machine.service';
import { getMachineTypeByIdService } from '../services/machine-type.service';
import { createMeioEstacionarioService } from '../services/meio-estacionario.service';
import { getMeioEstacionarioTypeByIdService } from '../services/meio-estacionario-type.service';
import { culturaAcceptableFields, culturaRequiredFields, ICulturaDTO } from '../types/cultura';
import { EquipamentoRequiredFields } from '../types/equipamento';
import { FazendaFields, FazendaRequiredFields } from '../types/fazenda';
import { machineAcceptableFields, machineRequiredFields } from '../types/machine.type';
import { MeioEstacionarioFields, MeioEstacionarioRequiredFields } from '../types/meio-estacionario';
import { IUser } from '../types/user';
import { validateInputAcceptableData, validateInputRequeridData } from './auth-helper';
import { errorResponse, makeResponse } from './utils';

export const getAllFazenda = async (_req: Request, res: Response) => {
  try {
    const result = await getAllFazendaService();

    return makeResponse(res, result);
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('Erro: ', error.message);
    if (error.message === 'index_not_found_exception')
      return makeResponse(res, { data: null, count: 0 });

    return errorResponse(res, error.message);
  }
};

export const fazendaGrown = async (_req: Request, res: Response) => {
  try {
    const result = await fazendaGrownService();

    return makeResponse(res, result);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getFazendaById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const fazenda = await getFazendaByIdService(id);

    return makeResponse(res, fazenda, 'Fazenda encontrada');
  } catch (error: any) {
    return errorResponse(res, error.message, undefined, HTTP.INTERNAL_SERVER_ERROR);
  }
};

export const createFazenda = async (req: Request, res: Response) => {
  const data = req.body;
  // eslint-disable-next-line prefer-destructuring
  const user = req.user! as IUser;

  const fazenda =
    user[User.role] === UserRole.Producer ? { [Fazenda.ProducerId]: user[User.id], ...data } : data;
  try {
    validateInputRequeridData(fazenda, FazendaRequiredFields);
    validateInputAcceptableData(fazenda, FazendaFields);

    const existProducer = await findFazendaByNifService(data.nif);

    if (Array.isArray(existProducer) && existProducer.length > 0) {
      return errorResponse(res, 'Este NIF já está cadastrado!');
    }
    /*   const existProducer = await findFazendaByPhoneService(data.contact.phone);

    if (Array.isArray(existProducer) && existProducer.length > 0) {
      return errorResponse(res, 'Este número telefone já está cadastrado!');
    }

    const userByEmail = await findFazendaByEmailService(data.contact.email);
    if (Array.isArray(userByEmail) && userByEmail.length > 0) {
      return errorResponse(res, 'O email já está cadastrado!');
    }
 */
    // const producerWithCooperative = (
    //   await getProducerByIdWithoutFazendasService(fazenda[Fazenda.ProducerId])
    // )[0];

    // const producer = (await getProducerByIOnly(fazenda[Fazenda.ProducerId]))[0];

    // console.log('PRODUCER', producerWithCooperative);
    // if (!producer) throw new Error('Produtor inválido');

    // const county = await getCountyByIdService(fazenda[Fazenda.County]);

    // console.log('PRODUCER', producer);

    const fazendaCreated = await createFazendaService({ ...fazenda, [owner]: user[User.id] });
    return res.status(HTTP.CREATED).send(fazendaCreated);
  } catch (error: any) {
    // eslint-disable-next-line no-console
    return errorResponse(res, error.message, undefined, HTTP.INTERNAL_SERVER_ERROR);
  }
};

export const updateFazendaByProducer = async (req: Request, res: Response) => {
  const fazenda = req.body;
  const fazendaId = req.params.id;

  try {
    validateInputRequeridData(fazenda, FazendaRequiredFields);
    validateInputAcceptableData(fazenda, FazendaFields);

    // const producer = (await getProducerByIdWithoutFazendasService(fazenda[Fazenda.ProducerId]))[0];
    // const county = await getCountyByIdService(fazenda[Fazenda.County]);

    const fazendaUpdated = await updateFazendaByProducerService(fazendaId, fazenda);

    return makeResponse(res, fazendaUpdated);
  } catch (error: any) {
    return errorResponse(res, error.message, undefined, HTTP.INTERNAL_SERVER_ERROR);
  }
};

export const deleteFazenda = async (req: Request, res: Response) => {
  const { id } = req.query;
  if (!id)
    return errorResponse(
      res,
      'Por favor informe o id da fazenda que deseja remover',
      undefined,
      HTTP.BAD_REQUEST
    );

  try {
    const fazenda = await deleteFazendaService(id as string);

    return makeResponse(res, fazenda);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const addCultura = async (req: Request, res: Response) => {
  const culturaDTO: ICulturaDTO = req.body;
  const user = req.user! as IUser;
  try {
    validateInputRequeridData(culturaDTO, culturaRequiredFields);

    validateInputAcceptableData(culturaDTO, culturaAcceptableFields);

    const cultura = await createCulturaService({ ...culturaDTO, [owner]: user[User.id] });

    // const culturaType = await getCulturaTypeByIdService(culturaDTO[Cultura.type]);

    // await addCulturaService(cultura[Cultura.id], cultura[Cultura.fazendaId]);

    // const fazenda = await getFazendaByIdService(culturaDTO[Cultura.fazendaId]);

    return makeResponse(res, cultura);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const addMachine = async (req: Request, res: Response) => {
  const machine = req.body;
  const user = req.user! as IUser;

  try {
    validateInputRequeridData(machine, machineRequiredFields);
    validateInputAcceptableData(machine, machineAcceptableFields);

    const machineType = await getMachineTypeByIdService(machine[Machine.Type]);

    if (!machineType) throw new Error('Lamentamos, o tipo de máquina não foi encontrado');

    const fazenda = await getFazendaByIdService(machine[Machine.fazenda]);
    if (!fazenda) throw new Error('Lamentamos, a fazenda não foi encontrada');

    const machineResponse = await createMachineService({
      ...machine,
      [Machine.Type]: machineType,
      [Machine.Power]: machine.power,
      [owner]: user[User.id],
    });

    const fazendaUpdated = await addMachineService(
      fazenda[Fazenda.Id],
      machineResponse[Machine.Id]
    );

    return makeResponse(res, fazendaUpdated);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message);
  }
};

export const addEquipamento = async (req: Request, res: Response) => {
  const equipamento = req.body;

  const user = req.user! as IUser;

  try {
    validateInputRequeridData(equipamento, EquipamentoRequiredFields);

    const alfaia = await getEquipamentoTypeByIdService(equipamento[Equipamento.Type]);

    if (!alfaia) throw new Error('Lamentamos, informou um tipo de equipamento inválido');

    const fazenda = await getFazendaByIdService(equipamento[Equipamento.Fazenda]);

    if (!fazenda) throw new Error('Lamentamos, a fazenda não foi encontrada');

    const equipamentoResponse = await createEquipamentoService({
      ...equipamento,
      [owner]: user[User.id],
    });

    const fazendaUpdated = await addEquipamentoService(
      fazenda[Fazenda.Id],
      equipamentoResponse[Machine.Id]
    );
    return makeResponse(res, fazendaUpdated);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message);
  }
};

export const addMeioEstacionario = async (req: Request, res: Response) => {
  const meio = req.body;
  const user = req.user! as IUser;

  try {
    validateInputRequeridData(meio, MeioEstacionarioRequiredFields);
    validateInputAcceptableData(meio, MeioEstacionarioFields);
    const meioType = await getMeioEstacionarioTypeByIdService(meio[MeioEstacionario.Type]);

    if (!meioType) throw new Error('Lamentamos, informou um tipo de meio estacionário inválido');

    const fazenda = await getFazendaByIdService(meio[MeioEstacionario.Fazenda]);

    if (!fazenda) throw new Error('Lamentamos, a fazenda não foi encontrada');

    const meioResponse = await createMeioEstacionarioService({
      ...meio,
      [owner]: user[User.id],
    });

    const fazendaUpdated = await addMeioEstacionarioService(
      fazenda[Fazenda.Id],
      meioResponse[Machine.Id]
    );
    return makeResponse(res, fazendaUpdated);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message);
  }
};

export const addInfrastruture = async (req: Request, res: Response) => {
  try {
    const infrastruture = req.body;
    const user = req.user! as IUser;

    const infrastructureType = await getInfrastrutureTypeById(infrastruture[Infrastructure.Type]);
    if (!infrastructureType)
      return errorResponse(res, 'Lamentamos, o tipo de infraestructura que informou não é válido');

    const fazenda = await getFazendaByIdService(infrastruture[Infrastructure.Fazenda]);
    if (!fazenda) return errorResponse(res, 'Lamentamos, a fazenda que informou não é válida');

    const infrastrutureResponse = await createInfrastrutureService({
      ...infrastruture,
      [owner]: user[User.id],
    });
    const fazendaResponse = await addInfrastrutureService(
      infrastruture[Infrastructure.Fazenda],
      infrastrutureResponse[Infrastructure.Id]
    );

    return makeResponse(res, fazendaResponse);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message);
  }
};

export const addAnimal = async (req: Request, res: Response) => {
  try {
    const fazendaId = req.body.fazenda;
    const { type } = req.body;
    const animalDTO = req.body;
    const user = req.user! as IUser;

    const animalType = await getAnimalTypeById(type);
    if (!animalType)
      return errorResponse(res, 'Lamentamos, o tipo de animal que informou não é válido');

    const fazenda = await getFazendaByIdService(fazendaId);
    if (!fazenda) return errorResponse(res, 'Lamentamos, a fazenda que informou não é válida');

    const animalResponse = await createAnimalService({ [owner]: user[User.id], ...animalDTO });
    const fazendaResponse = await addAnimalService(fazendaId, animalResponse[Animal.Id]);

    return makeResponse(res, fazendaResponse);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message);
  }
};
export const addHumanResource = async (req: Request, res: Response) => {
  try {
    const fazendaId = req.body.fazenda;
    const { type } = req.body;
    const humanResourceDTO = req.body;
    const user = req.user! as IUser;

    const humanResourceType = await getHumanResourceTypeById(type);
    if (!humanResourceType)
      throw new Error('Lamentamos, o tipo de recurso humano que informou não é válido');

    const fazenda = await getFazendaByIdService(fazendaId);
    if (!fazenda) throw new Error('Lamentamos, a fazenda que informou não é válida');

    const humanResourcResponse = await createHumanResourceService({
      [owner]: user[User.id],
      ...humanResourceDTO,
    });
    const fazendaResponse = await addHumanResourceService(
      fazendaId,
      humanResourcResponse[HumanResource.Id]
    );

    return makeResponse(res, fazendaResponse);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message);
  }
};
