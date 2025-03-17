import { FilterQuery } from 'mongoose';

import { ImportedProductsTypes } from '../../constants';
import importedProductsModel from '../../entities/consumption.model';
import {
  IImportedProducts,
  IImportedProductsData,
  ImportedProductsDTO,
} from '../../types/consumption';
import { deleteEntity, getAllItens, updateGeneric } from './repository-helper';
// eslint-disable-next-line import/prefer-default-export
export const getAllImportedProducts = () => getAllItens(importedProductsModel);

export const getImportedProductsById = (id: string) =>
  importedProductsModel
    .findOne({
      [ImportedProductsTypes.Id]: id,
    } as FilterQuery<IImportedProducts>)
    .exec();

export const CreateImportedProducts = (infrastruture: ImportedProductsDTO) =>
  importedProductsModel.create(infrastruture);

export const DeleteImportedProducts = (id: string) =>
  deleteEntity<IImportedProductsData>(importedProductsModel, {
    [ImportedProductsTypes.Id]: id,
  } as FilterQuery<IImportedProductsData>);

export const UpdateImportedProducts = (id: string, data: ImportedProductsDTO) =>
  updateGeneric(importedProductsModel, id, data);
