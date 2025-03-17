import getAllCooperativeByAssoc from '../repositories/NoSql/association.repository';
import { IFetchParams } from '../types';

const getAllAssociationService = async (fetchParams?: IFetchParams) =>
  getAllCooperativeByAssoc(fetchParams as any);

export default getAllAssociationService;
