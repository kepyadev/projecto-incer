import { Request, Response } from 'express';

import { HTTP, owner, User } from '../constants';
import { AnimalType } from '../constants/animal-type';
import { getAnimalTypeById as getAnimalTypeByIdRepository } from '../repositories/NoSql/animal-type.repository';
import {
  createAnimalTypeService,
  createManyAnimalTypeService,
  deleteAnimalTypeService,
  getAllAnimalTypeService,
  getAnimalTypeByIdService,
  updateAnimalTypeService,
} from '../services/animal-type.service';
import { AnimalTypeDTO, AnimalTypeFields, AnimalTypeRequiredFields } from '../types/animal-type';
import { IUser } from '../types/user';
import { validateInputAcceptableData, validateInputRequeridData } from './auth-helper';
import { errorResponse, makeResponse } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllAnimalType = async (_req: Request, res: Response) => {
  try {
    const animalTypes = await getAllAnimalTypeService();
    return makeResponse(res, animalTypes);
  } catch (error: any) {
    return errorResponse(res, error.message || error.msg);
  }
};

export const getAnimalTypeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const animalTypes = await getAnimalTypeByIdService(id, getAnimalTypeByIdRepository);
    return makeResponse(res, animalTypes);
  } catch (error: any) {
    return errorResponse(res, error.message || error.msg);
  }
};

export const createAnimalType = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line prefer-destructuring
    const user = req.user! as IUser;

    const animal = req.body;

    validateInputRequeridData(animal, AnimalTypeRequiredFields);
    validateInputAcceptableData(animal, AnimalTypeFields);

    const newAnimal = await createAnimalTypeService({ ...animal, [owner]: user[User.id] });

    return makeResponse(res, newAnimal);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message || 'Lamentamos, ocorreu um erro');
  }
};

export const createManyAnimalType = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line prefer-destructuring
    const user = req.user! as IUser;

    const animals = req.body as unknown[];
    const animalsFinal = animals.map((animal: any) => {
      validateInputRequeridData(animal, AnimalTypeRequiredFields);
      validateInputAcceptableData(animal, AnimalTypeFields);

      return {
        ...animal,
        [owner]: user[User.id],
        [AnimalType.IsAve]: animal[AnimalType.IsAve] !== 'FALSE',
      };
    });

    const newAnimal = await createManyAnimalTypeService(animalsFinal as AnimalTypeDTO[]);

    return makeResponse(res, newAnimal);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message || 'Lamentamos, ocorreu um erro');
  }
};

export const deleteAnimalType = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id)
    return errorResponse(
      res,
      'Por favor informe o id do tipo de animal que deseja remover',
      undefined,
      HTTP.BAD_REQUEST
    );

  try {
    const animalType = await deleteAnimalTypeService(id);
    if (!animalType)
      return errorResponse(res, 'Tipo de animal não encontrado', undefined, HTTP.NOT_FOUND);
    return makeResponse(res, animalType);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const updateAnimalType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const AnimalsType = await updateAnimalTypeService(id, data);
    return makeResponse(res, AnimalsType);
  } catch (error: any) {
    return errorResponse(res, 'Lamentos, ocorreu um erro');
  }
};
