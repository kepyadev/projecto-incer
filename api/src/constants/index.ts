export enum TimeStamp {
  createdAt = 'created_at',
  updatedAt = 'updated_at',
}

export * from './http';
export * from './user';
export * from './producer';
export * from './province';
export * from './cooperative';
export * from './country';
export * from './county';
export * from './cultura';
export * from './input';
export * from './logs-login';
export * from './routes';
export * from './sub-entites';
export * from './fazenda';
export * from './partner';
export * from './ministerio';
export * from './national-production';
export * from './market-prices';
export * from './consumption';
export enum Entities {
  Fazenda = 'fazenda',
  Cultura = 'culturas',
  CulturaType = 'cultura_types',
  County = 'county',
  Country = 'countries',
  Cooperative = 'cooperative',
  Province = 'province',
  Machine = 'machines',
  MachineType = 'machine_types',
  MeioEstacionario = 'meio_estacionarios',
  MeioEstacionarioType = 'meio_estacionario_types',
  EquipamentoType = 'equipamentos_types',
  Equipamentos = 'equipamentos',
  Infrastructure = 'infrastructures',
  InfrastructureType = 'infrastructure_types',
  AnimalType = 'animal_types',
  Animal = 'animal',
  Producer = 'producers',
  Partner = 'partner',
  User = 'user',
  HumanResource = 'human_resouce',
  HumanResourceType = 'human_resource_types',
  Technician = 'technician',
  NationalProduction = 'national_production',
  MarketPrice = 'market_prices',
  Consumption = 'consumption',
}

export const owner = 'owner';
export const IsDeleted = 'is_deleted';
