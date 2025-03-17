export enum Culture {
  Id = '_id',
  Type = 'type',
  Insumos = 'insumos',
  Fazenda = 'fazenda',
  Producao = 'quantity',
  Ha = 'area',
  AgriculturalYear = 'agricultural_year',
  DataSementeira = 'data_sementeira',
  DataColheita = 'data_colheita',
  User = 'user',
  Irrigacao = 'irrigacao',
  Cooperative = 'cooperative',
}

export enum Cooperative {
  Id = '_id',
  Description = 'name',
  Address = 'address',
  Presindet = 'president',
  Contact = 'contact',
  Province = 'province',
  County = 'county',
  Cultures = 'cultures',
  Producers = 'producers',
  Nif = 'nif',
  User = 'user',
  Email = 'email',
  Phone = 'phone',
  TotalAgregate = 'total_agregate',
  TotalDesvinculados = 'total_desvinculados',
  Desvinculados = 'desvinculados',
  isCooperative = 'is_cooperative',
}

export enum CultureType {
  Id = '_id',
  Description = 'description',
}

export enum Comuna {
  Id = '_id',
  Description = 'description',
  County = 'county',
}

export enum NationalProductionType {
  Id = '_id',
  Product = 'product',
  Year = 'year',
  QuantityProduced = 'quantity_produced',
  AveragePrice = 'average_price',
  Region = 'region',
}

export enum ImportedProductsTypes {
  Id = '_id',
  Product = 'product',
  Year = 'year',
  OriginCountry = 'origin_country',
  QuantityImported = 'quantity_imported',
  MarketPrice = 'market_price',
}

export enum NationalMarketPricesTypes {
  Id = '_id',
  Product = 'product',
  Year = 'year',
  AveragePrice = 'average_price',
  Region = 'region',
}
export enum Fazenda {
  Id = '_id',
  Descricao = 'description',
  Nif = 'nif',
  Gerencia = 'gerencia',
  Contact = 'contact',
  Localization = 'localization',
  Estradanacional = 'estrada_nacional',
  DistanciaEstrada = 'distancia_estrada',
  Geo = 'geo',
  Ground = 'ground',
  Producer = 'producer_id',
  User = 'user',
  Address = 'address',
  Machines = 'machines',
  Equipamentos = 'equipamentos',
  Infraestruturas = 'insfrastructure',
  Animals = 'animals',
  Extension = 'extension',
  HumanResource = 'human_resource',
  MeiosEstacionarios = 'meio_estacionario',
  Culturas = 'culturas',
  County = 'county',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Cooperative = 'cooperative_id',
  CreatedAt = 'createdAt',
}

export enum County {
  Id = '_id',
  Description = 'description',
  Province = 'province',
}

export enum Province {
  Id = '_id',
  Description = 'description',
  Countys = 'countys',
}

export enum Producer {
  Id = '_id',
  Nif = 'nif',
  Bi = 'bi',
  CompanyName = 'company_name',
  User = 'user',
  Fazendas = 'fazendas',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  County = 'county',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Cooperative = 'cooperative',
  isProducer = 'is_producer',
}

export enum Ministerio {
  Id = '_id',
  Name = 'name',
}

export enum Partner {
  Id = '_id',
  MinisterioName = 'ministerio',
  User = 'user',
}
