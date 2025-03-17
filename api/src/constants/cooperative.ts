export enum Cooperative {
  id = '_id',
  name = 'name',
  county = 'county',
  numberAggregates = 'number_aggregates',
  address = 'address',
  userId = 'user',
  contact = 'contact',
  desvinculados = 'desvinculados',
  owner = 'owner',
  nif = 'nif',
  president = 'president',
  isCooperative = 'is_cooperative',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
}

export enum CooperativaProducao {
  id = 'id',
  cooperativeId = 'id_cooperative',
  culturaType = 'tipo_cultura',
  qtd = 'qtd',
  produtionDate = 'prodution_date',
  userId = 'user',
}
