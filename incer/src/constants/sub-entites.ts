export enum ContactInformation {
  Phone = 'phone',
  Email = 'email',
}

export enum Cost {
  Value = 'value',
  Currency = 'currency',
  Round = 'round',
}

export enum Geo {
  Latitude = 'latitude',
  Longitude = 'longitude',
}

export enum Ground {
  AltitudeMedia = 'altitude_media',
  Orografia = 'orografia',
  PropriedadesFisicas = 'propriedades_fisicas',
  PhMedio = 'ph_medio',
  AreaCorrigida = 'area_corrigida',
  SomaBases = 'soma_bases',
  ctc = 'ctc',
  indiceALuminio = 'indice_aluminio',
  indiceSodio = 'indice_sodio',
  dataAnalise = 'data_analise',
  extension = 'extension',
}

export enum Localization {
  Comuna = 'comuna',
  Province = 'province',
  County = 'county',
}

export enum MachineType {
  Id = '_id',
  Description = 'description',
}

export enum Machine {
  Id = '_id',
  Type = 'type',
  Quantity = 'quantity',
  Power = 'power',
  FazendaId = 'fazenda',
  Unidade = 'unidade',
}

export enum Power {
  Value = 'value',
  Unidade = 'unity',
}

export enum Equipamento {
  Id = '_id',
  Alfaia = 'type',
  Quantity = 'quantity',
  Caracteristicas = 'caracteristic',
  FazendaId = 'fazenda',
}

export enum Alfaia {
  Id = '_id',
  Description = 'description',
}

export enum InfraestruturaType {
  Id = '_id',
  Description = 'description',
}

export enum Infraestrutura {
  Id = '_id',
  Type = 'type',
  Quantity = 'quantity',
  Capacity = 'capacity',
  Unidade = 'unity',
  Fazenda = 'fazenda',
}

export enum AnimalType {
  Id = '_id',
  Description = 'description',
  IsAve = 'is_ave',
}

export enum Animal {
  Id = '_id',
  Type = 'type',
  EfectivoTotal = 'effective_total',
  Matrizes = 'matrizes',
  ProducaoAnual = 'annual_prodution',
  AnoProducao = 'year_of_prodution',
  FazendaId = 'fazenda',
  QuantidadeOvos = 'egg',
}

export enum HumanResourceType {
  Id = '_id',
  Description = 'description',
}

export enum HumanResource {
  Id = '_id',
  Type = 'type',
  Quantity = 'quantity',
  FazendaId = 'fazenda',
}

export enum MeioEstacionarioType {
  Id = '_id',
  Description = 'description',
}

export enum MeioEstacionario {
  Id = '_id',
  Type = 'type',
  Quantity = 'quantity',
  Unidade = 'unidade',
  PowerValue = 'power',
  FazendaId = 'fazenda',
}
