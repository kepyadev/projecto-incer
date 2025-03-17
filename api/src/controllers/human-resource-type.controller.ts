import { Request, Response } from 'express';

import { HTTP, owner, User } from '../constants';
import {
  createHumanResourceTypeService,
  createManyHumanResourceTypeService,
  deleteHumanResourceTypeService,
  getAllHumanResourceTypeService,
  getHumanResourceTypeByIdService,
  updateHumanResourceTypeService,
} from '../services/human-resource-type.service';
import {
  HumanResourceTypeDTO,
  HumanResourceTypeFields,
  HumanResourceTypeRequiredFields,
} from '../types/human-resource-type';
import { IUser } from '../types/user';
import { validateInputAcceptableData, validateInputRequeridData } from './auth-helper';
import { errorResponse, makeResponse } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllHumanResourceType = async (_req: Request, res: Response) => {
  try {
    const HumanResourcesType = await getAllHumanResourceTypeService();
    return makeResponse(res, HumanResourcesType);
  } catch (error: any) {
    return errorResponse(res, 'Lamentos, ocorreu um erro');
  }
};

export const getHumanResourceTypeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const HumanResourcesType = await getHumanResourceTypeByIdService(id);
    return makeResponse(res, HumanResourcesType);
  } catch (error: any) {
    return errorResponse(res, 'Lamentos, ocorreu um erro');
  }
};

export const createHumanResourceType = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line prefer-destructuring
    const user = req.user! as IUser;

    const humanResource = req.body;

    validateInputRequeridData(humanResource, HumanResourceTypeRequiredFields);
    validateInputAcceptableData(humanResource, HumanResourceTypeFields);

    const newHumanResource = await createHumanResourceTypeService({
      ...humanResource,
      [owner]: user[User.id],
    });

    return makeResponse(res, newHumanResource);
  } catch (error: any) {
    return errorResponse(res, 'Lamentamos, ocorreu um erro');
  }
};

export const createManyHumanResourceType = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line prefer-destructuring
    const user = req.user! as IUser;

    const humanResources = req.body as unknown[];
    const humanResourcesFinal = humanResources.map((humanResource: any) => {
      validateInputRequeridData(humanResource, HumanResourceTypeRequiredFields);
      validateInputAcceptableData(humanResource, HumanResourceTypeFields);

      return {
        ...humanResource,
        [owner]: user[User.id],
      };
    });

    const newHumanResource = await createManyHumanResourceTypeService(
      humanResourcesFinal as HumanResourceTypeDTO[]
    );

    return makeResponse(res, newHumanResource);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message || 'Lamentamos, ocorreu um erro');
  }
};

export const deleteHumanResourceType = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id)
    return errorResponse(
      res,
      'Por favor informe o id do tipo de recurso humano que deseja remover',
      undefined,
      HTTP.BAD_REQUEST
    );

  try {
    const humanResourceType = await deleteHumanResourceTypeService(id);
    if (!humanResourceType)
      return errorResponse(res, 'Tipo de recurso humano não encontrado', undefined, HTTP.NOT_FOUND);
    return makeResponse(res, humanResourceType);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const updateHumanResourceType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const HumanResourcesType = await updateHumanResourceTypeService(id, data);
    return makeResponse(res, HumanResourcesType);
  } catch (error: any) {
    return errorResponse(res, 'Lamentos, ocorreu um erro');
  }
};
