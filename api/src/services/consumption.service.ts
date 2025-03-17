import {
  CreateImportedProducts,
  DeleteImportedProducts,
  getAllImportedProducts,
  getImportedProductsById,
  UpdateImportedProducts,
} from '../repositories/NoSql/consumption.repository';
import { ImportedProductsDTO } from '../types/consumption';

export const getAllImportedProductsService = () => getAllImportedProducts();

export const getImportedProductsServiceById = (id: string) => getImportedProductsById(id);

export const CreateImportedProductsService = (data: ImportedProductsDTO) =>
  CreateImportedProducts(data);

export const DeleteImportedProductsService = (id: string) => DeleteImportedProducts(id);

export const UpdateImportedProductsService = (id: string, data: ImportedProductsDTO) =>
  UpdateImportedProducts(id, data);
