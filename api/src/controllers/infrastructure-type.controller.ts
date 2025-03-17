import { Request, Response } from 'express';

import { HTTP, owner, User } from '../constants';
import {
  createInfrastrutureTypeService,
  createManyInfrastructureTypeService,
  deleteInfrastructTypeService,
  getAllInfrastructureTypeService,
  getInfrastructureTypeByIdService,
  updateInfrastructTypeService,
} from '../services/infrastructure-type.service';
import {
  InfrastructureTypeDTO,
  InfrastrutureTypeFields,
  InfrastrutureTypeRequiredFields,
} from '../types/infrastructure-type';
import { IUser } from '../types/user';
import { validateInputAcceptableData, validateInputRequeridData } from './auth-helper';
import { errorResponse, makeResponse } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllInfrastructureType = async (_req: Request, res: Response) => {
  try {
    const infrastructuresType = await getAllInfrastructureTypeService();
    return makeResponse(res, infrastructuresType);
  } catch (error: any) {
    return errorResponse(res, error.message || error.msg);
  }
};

export const getInfrastructureTypeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const infrastructuresType = await getInfrastructureTypeByIdService(id);
    return makeResponse(res, infrastructuresType);
  } catch (error: any) {
    return errorResponse(res, error.message || error.msg);
  }
};

export const createInfrastrutureType = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line prefer-destructuring
    const user = req.user! as IUser;

    const infraestruture = req.body;

    validateInputRequeridData(infraestruture, InfrastrutureTypeRequiredFields);
    validateInputAcceptableData(infraestruture, InfrastrutureTypeFields);

    const newInfrastruture = await createInfrastrutureTypeService({
      ...infraestruture,
      [owner]: user[User.id],
    });

    return makeResponse(res, newInfrastruture);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message || 'Lamentamos, ocorreu um erro');
  }
};

export const createManyInfrastructureType = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line prefer-destructuring
    const user = req.user! as IUser;

    const infrastructures = req.body as unknown[];

    const infrastructuresFinal = infrastructures.map((infrastructure: any) => {
      validateInputRequeridData(infrastructure, InfrastrutureTypeRequiredFields);
      validateInputAcceptableData(infrastructure, InfrastrutureTypeFields);

      return {
        ...infrastructure,
        [owner]: user[User.id],
      };
    });

    const newInfrastructure = await createManyInfrastructureTypeService(
      infrastructuresFinal as InfrastructureTypeDTO[]
    );

    return makeResponse(res, newInfrastructure);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message || 'Lamentamos, ocorreu um erro');
  }
};

export const deleteInfrastructType = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id)
    return errorResponse(
      res,
      'Por favor informe o id do tipo de infraestrutura que deseja remover',
      undefined,
      HTTP.BAD_REQUEST
    );

  try {
    const infrastructType = await deleteInfrastructTypeService(id);
    if (!infrastructType)
      return errorResponse(res, 'Tipo de infraestrutura não encontrado', undefined, HTTP.NOT_FOUND);
    return makeResponse(res, infrastructType);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const updateInfrastructType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const InfrastructsType = await updateInfrastructTypeService(id, data);
    return makeResponse(res, InfrastructsType);
  } catch (error: any) {
    return errorResponse(res, 'Lamentos, ocorreu um erro');
  }
};
