import { Request, Response } from 'express';

import { HTTP } from '../constants';
import {
  CreateImportedProductsService,
  DeleteImportedProductsService,
  getAllImportedProductsService,
  getImportedProductsServiceById,
  UpdateImportedProductsService,
} from '../services/consumption.service';
import { ImportedProductFields, ImportedProductRequiredFields } from '../types/consumption';
import { validateInputAcceptableData, validateInputRequeridData } from './auth-helper';
import { errorResponse, makeResponse } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllImportedProducts = async (_req: Request, res: Response) => {
  try {
    const ImportedProducts = await getAllImportedProductsService();
    return makeResponse(res, ImportedProducts);
  } catch (error: any) {
    return errorResponse(res, error.message || error.msg);
  }
};

export const getAllImportedProductsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const importedProducts = await getImportedProductsServiceById(id);
    console.log(importedProducts);
    return makeResponse(res, importedProducts);
  } catch (error: any) {
    return errorResponse(res, error.message || error.msg);
  }
};

export const CreateImportedProducts = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line prefer-destructuring

    const nationaroduction = req.body;
    validateInputRequeridData(nationaroduction, ImportedProductRequiredFields);
    validateInputAcceptableData(nationaroduction, ImportedProductFields);

    const newNationaroduction = await CreateImportedProductsService({
      ...nationaroduction,
    });

    return makeResponse(res, newNationaroduction);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message || 'Lamentamos, ocorreu um erro');
  }
};

export const DeleteImportedProducts = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id)
    return errorResponse(
      res,
      'Por favor informe o id do tipo de infraestrutura que deseja remover',
      undefined,
      HTTP.BAD_REQUEST
    );

  try {
    const nationaroduction = await DeleteImportedProductsService(id);
    if (!nationaroduction)
      return errorResponse(res, 'Tipo de infraestrutura não encontrado', undefined, HTTP.NOT_FOUND);
    return makeResponse(res, nationaroduction);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const UpdateImportedProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const nationaroduction = await UpdateImportedProductsService(id, data);
    return makeResponse(res, nationaroduction);
  } catch (error: any) {
    return errorResponse(res, 'Lamentos, ocorreu um erro');
  }
};
