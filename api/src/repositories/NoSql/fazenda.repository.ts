import { FilterQuery, Types } from 'mongoose';

import { County, Cultura, Fazenda, Producer } from '../../constants';
import Animal from '../../constants/animal';
import { Equipamento } from '../../constants/equipamento';
import { HumanResource } from '../../constants/human-resource';
import { Infrastructure } from '../../constants/infrastructure';
import { Machine } from '../../constants/machine';
import { MeioEstacionario } from '../../constants/meio-estacionario';
import fazendaModel from '../../entities/fazenda.model';
import { IFetchParams } from '../../types';
import { IFazenda, IFazendaData } from '../../types/fazenda';
import { deleteEntity, getAllItens } from './repository-helper';

export const createFazenda = (fazenda: IFazendaData) => fazendaModel.create(fazenda);

export const findFazendaByPhone = (phoneNumber: string) =>
  fazendaModel.find({ 'contact.phone': phoneNumber });

export const findFazendaByEmail = (email: string) => fazendaModel.find({ 'contact.email': email });

export const findFazendaByNif = (nif: string) => fazendaModel.find({ [Fazenda.Nif]: nif });
export const updateFazendaByProducer = async (id: string, fazenda: IFazenda) => {
  const updateValue = { $set: { ...fazenda } };

  const isFazenda = await fazendaModel.findById({ [Fazenda.Id]: id });
  if (isFazenda) {
    return isFazenda.update(updateValue);
  }
  throw new Error('Fazenda não encontrada');
};

export const findAllFazenda = async (fetchParams?: IFetchParams, filter?: Record<string, any>) =>
  getAllItens(fazendaModel, fetchParams, filter, {}, false, [
    { path: Fazenda.ProducerId, populate: { path: Producer.userId } },
    { path: Fazenda.County, populate: { path: County.ProvinceId } },
  ]);

export const fazendaGrown = async () =>
  fazendaModel.aggregate([
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m',
            date: '$createdAt',
          },
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $set: {
        fazendas: '$count',
      },
    },

    {
      $set: {
        date: '$_id',
      },
    },
    {
      $project: {
        count: 0,
        _id: 0,
      },
    },
    {
      $sort: {
        date: 1,
      },
    },
  ]);

export const findAllFazendaByProducer = async (idProducer: string, fetchParams?: IFetchParams) =>
  getAllItens(fazendaModel, fetchParams, { [Fazenda.ProducerId]: idProducer }, {}, false, [
    { path: Fazenda.Machines },
    { path: Fazenda.Equipamentos, populate: { path: Equipamento.Type } },
    { path: Fazenda.Cultura, populate: { path: Cultura.type } },
    { path: Fazenda.Infrastructure, populate: { path: Infrastructure.Type } },
    { path: Fazenda.Animals, populate: { path: Animal.Type } },
    { path: Fazenda.County },
  ]);
// const { page, limit } = fetchParams || { page: 1, limit: 15 };
// const count = await fazendaModel.countDocuments({ [Fazenda.IsDeleted]: false });

// try {
//   const data = await fazendaModel
//     .find({ [Fazenda.ProducerId]: idProducer, [Fazenda.IsDeleted]: false })
//     .skip(calcularSkip({ page, limit }))
//     .limit(limit)
//     .select({ [Fazenda.IsDeleted]: 0 })
//     .populate(Fazenda.Cultura)
//     .populate({
//       path: Fazenda.County,
//       populate: { path: County.ProvinceId, populate: { path: province.Country } },
//     })
//     .populate(Fazenda.Machines)
//     .populate({ path: Fazenda.Equipamentos, populate: { path: Equipamento.Type } })
//     .populate({ path: Fazenda.Infrastructure, populate: { path: Infrastructure.Type } })
//     .populate({ path: Fazenda.Animals, populate: { path: Animal.Type } })
//     .exec();

//   return { data, count };
// } catch (error: any) {
//   return new Error(error.message);
// }

export const findAllFazendaByCooperative = async (userId: string) => {
  const fazendas = await fazendaModel
    .aggregate([
      {
        $lookup: {
          from: 'producers',
          localField: Fazenda.ProducerId,
          foreignField: '_id',
          as: Fazenda.ProducerId,
        },
      },
      {
        $unwind: {
          path: `$${Fazenda.ProducerId}`,
        },
      },
      {
        $lookup: {
          from: 'cooperatives',
          localField: `${Fazenda.ProducerId}.cooperative`,
          foreignField: '_id',
          as: `${Fazenda.ProducerId}.cooperative`,
        },
      },
      {
        $unwind: {
          path: `$${Fazenda.ProducerId}.cooperative`,
        },
      },
      {
        $match: {
          'producer_id.cooperative.user': new Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: `${Fazenda.ProducerId}.user`,
          foreignField: '_id',
          as: `${Fazenda.ProducerId}.user`,
        },
      },
      {
        $unwind: {
          path: `$${Fazenda.ProducerId}.user`,
        },
      },
      {
        $lookup: {
          from: 'counties',
          localField: 'county',
          foreignField: '_id',
          as: 'county',
        },
      },
      {
        $unwind: {
          path: '$county',
        },
      },
      {
        $lookup: {
          from: 'provinces',
          localField: 'county.province',
          foreignField: '_id',
          as: 'county.province',
        },
      },
      {
        $unwind: {
          path: '$county.province',
        },
      },
    ])
    .exec();

  return { data: fazendas, count: fazendas.length };
};

export const findFazendaById = (id: string) =>
  fazendaModel
    .findOne({ [Fazenda.Id]: id })
    .populate({ path: Fazenda.County, populate: { path: County.ProvinceId } })
    .populate({ path: Fazenda.Cultura, populate: { path: Cultura.type } })
    .populate({ path: Fazenda.Machines, populate: { path: Machine.Type } })
    .populate({ path: Fazenda.Equipamentos, populate: { path: Equipamento.Type } })
    .populate({ path: Fazenda.MeioEstacionario, populate: { path: MeioEstacionario.Type } })
    .populate({ path: Fazenda.Infrastructure, populate: { path: Infrastructure.Type } })
    .populate({ path: Fazenda.ProducerId, populate: { path: Producer.userId } })
    .populate({ path: Fazenda.HumanResource, populate: { path: HumanResource.Type } });

export const addCultura = async (culturaId: string, fazendaId: string) => {
  const isFazenda = await fazendaModel.findById({ [Fazenda.Id]: fazendaId });

  if (isFazenda) {
    const culturas = [...isFazenda[Fazenda.Cultura], culturaId];
    const updateValue = { $set: { [Fazenda.Cultura]: culturas } };

    return isFazenda.update(updateValue);
  }
  return null;
};

export const addMachine = async (fazendaId: string, machineId: string) => {
  const fazenda = await fazendaModel.findById(fazendaId).exec();

  if (!fazenda) return new Error('Lamentamos, a fazenda não foi encontrada!');

  fazenda[Fazenda.Machines].push(machineId);
  return fazenda.save();
};

export const addEquipamento = async (fazendaId: string, equipamentoId: string) => {
  const fazenda = await fazendaModel.findById(fazendaId).exec();

  if (!fazenda) return new Error('Lamentamos, a fazenda não foi encontrada!');
  fazenda[Fazenda.Equipamentos].push(equipamentoId);
  return fazenda.save();
};

export const addMeioEstacionario = async (fazendaId: string, meioEstacionarioId: string) => {
  const fazenda = await fazendaModel.findById(fazendaId).exec();

  if (!fazenda) return new Error('Lamentamos, a fazenda não foi encontrada!');
  fazenda[Fazenda.MeioEstacionario].push(meioEstacionarioId);
  return fazenda.save();
};

export const addInfrastruture = async (fazendaId: string, infrastructure: string) => {
  const fazenda = await fazendaModel.findById(fazendaId).exec();

  if (!fazenda) return new Error('Lamentamos, a fazenda não foi encontrada!');

  fazenda[Fazenda.Infrastructure].push(infrastructure);
  return fazenda.save();
};

export const addAnimal = async (fazendaId: string, animalId: string) => {
  const fazenda = await fazendaModel.findById(fazendaId).exec();

  if (!fazenda) return new Error('Lamentamos, a fazenda não foi encontrada!');

  fazenda[Fazenda.Animals].push(animalId);
  return fazenda.save();
};

export const addHumanResource = async (fazendaId: string, humanResourceId: string) => {
  const fazenda = await fazendaModel.findById(fazendaId).exec();

  if (!fazenda) return new Error('Lamentamos, a fazenda não foi encontrada!');

  fazenda[Fazenda.HumanResource].push(humanResourceId);
  return fazenda.save();
};

export const deleteFazendaRepository = (id: string) =>
  deleteEntity<IFazenda>(fazendaModel, { [Fazenda.Id]: id } as FilterQuery<IFazenda>);

export const DwFazendaProducerCooperativeCountyProvinceMachineCulture = () =>
  fazendaModel.aggregate([
    {
      $lookup: {
        from: 'producers',
        localField: 'producer_id',
        foreignField: '_id',
        as: 'producer',
      },
    },
    {
      $unwind: {
        path: '$producer',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'producer.user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: {
        path: '$user',
      },
    },
    {
      $lookup: {
        from: 'cooperatives',
        localField: 'producer.cooperative',
        foreignField: '_id',
        as: 'cooperative',
      },
    },
    {
      $unwind: {
        path: '$cooperative',
      },
    },
    {
      $lookup: {
        from: 'counties',
        localField: 'cooperative.county',
        foreignField: '_id',
        as: 'cooperative.county',
      },
    },
    {
      $unwind: {
        path: '$cooperative.county',
      },
    },
    {
      $lookup: {
        from: 'provinces',
        localField: 'cooperative.county.province',
        foreignField: '_id',
        as: 'cooperative.county.province',
      },
    },
    {
      $unwind: {
        path: '$cooperative.county.province',
      },
    },
    {
      $lookup: {
        from: 'counties',
        localField: 'county',
        foreignField: '_id',
        as: 'county',
      },
    },
    {
      $unwind: {
        path: '$county',
      },
    },
    {
      $lookup: {
        from: 'provinces',
        localField: 'county.province',
        foreignField: '_id',
        as: 'province',
      },
    },
    {
      $unwind: {
        path: '$province',
      },
    },
    {
      $lookup: {
        from: 'culturas',
        localField: '_id',
        foreignField: 'fazenda',
        as: 'cultura',
      },
    },
    {
      $unwind: {
        path: '$cultura',
      },
    },
    {
      $lookup: {
        from: 'cultura_types',
        localField: 'cultura.type',
        foreignField: '_id',
        as: 'cultura.type',
      },
    },
    {
      $unwind: {
        path: '$cultura.type',
      },
    },
  ]);

export const DwFazendaAnimals = () =>
  fazendaModel.aggregate([
    {
      $lookup: {
        from: 'producers',
        localField: 'producer_id',
        foreignField: '_id',
        as: 'producer',
      },
    },
    {
      $unwind: {
        path: '$producer',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'producer.user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: {
        path: '$user',
      },
    },
    {
      $lookup: {
        from: 'cooperatives',
        localField: 'producer.cooperative',
        foreignField: '_id',
        as: 'cooperative',
      },
    },
    {
      $unwind: {
        path: '$cooperative',
      },
    },
    {
      $lookup: {
        from: 'counties',
        localField: 'cooperative.county',
        foreignField: '_id',
        as: 'cooperative.county',
      },
    },
    {
      $unwind: {
        path: '$cooperative.county',
      },
    },
    {
      $lookup: {
        from: 'provinces',
        localField: 'cooperative.county.province',
        foreignField: '_id',
        as: 'cooperative.county.province',
      },
    },
    {
      $unwind: {
        path: '$cooperative.county.province',
      },
    },
    {
      $lookup: {
        from: 'counties',
        localField: 'county',
        foreignField: '_id',
        as: 'county',
      },
    },
    {
      $unwind: {
        path: '$county',
      },
    },
    {
      $lookup: {
        from: 'provinces',
        localField: 'county.province',
        foreignField: '_id',
        as: 'province',
      },
    },
    {
      $unwind: {
        path: '$province',
      },
    },
    {
      $lookup: {
        from: 'animals',
        localField: '_id',
        foreignField: 'fazenda',
        as: 'animal',
      },
    },
    {
      $unwind: {
        path: '$animal',
      },
    },
    {
      $lookup: {
        from: 'animal_types',
        localField: 'animal.type',
        foreignField: '_id',
        as: 'animal.type',
      },
    },
    {
      $unwind: {
        path: '$animal.type',
      },
    },
  ]);

export const DwFazendaEquipamentos = () =>
  fazendaModel.aggregate([
    {
      $lookup: {
        from: 'producers',
        localField: 'producer_id',
        foreignField: '_id',
        as: 'producer',
      },
    },
    {
      $unwind: {
        path: '$producer',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'producer.user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: {
        path: '$user',
      },
    },
    {
      $lookup: {
        from: 'cooperatives',
        localField: 'producer.cooperative',
        foreignField: '_id',
        as: 'cooperative',
      },
    },
    {
      $unwind: {
        path: '$cooperative',
      },
    },
    {
      $lookup: {
        from: 'counties',
        localField: 'cooperative.county',
        foreignField: '_id',
        as: 'cooperative.county',
      },
    },
    {
      $unwind: {
        path: '$cooperative.county',
      },
    },
    {
      $lookup: {
        from: 'provinces',
        localField: 'cooperative.county.province',
        foreignField: '_id',
        as: 'cooperative.county.province',
      },
    },
    {
      $unwind: {
        path: '$cooperative.county.province',
      },
    },
    {
      $lookup: {
        from: 'counties',
        localField: 'county',
        foreignField: '_id',
        as: 'county',
      },
    },
    {
      $unwind: {
        path: '$county',
      },
    },
    {
      $lookup: {
        from: 'provinces',
        localField: 'county.province',
        foreignField: '_id',
        as: 'province',
      },
    },
    {
      $unwind: {
        path: '$province',
      },
    },
    {
      $lookup: {
        from: 'equipamentos',
        localField: '_id',
        foreignField: 'fazenda',
        as: 'equipamento',
      },
    },
    {
      $unwind: {
        path: '$equipamento',
      },
    },
    {
      $lookup: {
        from: 'equipamentos_types',
        localField: 'equipamento.type',
        foreignField: '_id',
        as: 'equipamento.type',
      },
    },
    {
      $unwind: {
        path: '$equipamento.type',
      },
    },
  ]);

export const DwFazendaHumanResource = () =>
  fazendaModel.aggregate([
    {
      $lookup: {
        from: 'producers',
        localField: 'producer_id',
        foreignField: '_id',
        as: 'producer',
      },
    },
    {
      $unwind: {
        path: '$producer',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'producer.user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: {
        path: '$user',
      },
    },
    {
      $lookup: {
        from: 'cooperatives',
        localField: 'producer.cooperative',
        foreignField: '_id',
        as: 'cooperative',
      },
    },
    {
      $unwind: {
        path: '$cooperative',
      },
    },
    {
      $lookup: {
        from: 'counties',
        localField: 'cooperative.county',
        foreignField: '_id',
        as: 'cooperative.county',
      },
    },
    {
      $unwind: {
        path: '$cooperative.county',
      },
    },
    {
      $lookup: {
        from: 'provinces',
        localField: 'cooperative.county.province',
        foreignField: '_id',
        as: 'cooperative.county.province',
      },
    },
    {
      $unwind: {
        path: '$cooperative.county.province',
      },
    },
    {
      $lookup: {
        from: 'counties',
        localField: 'county',
        foreignField: '_id',
        as: 'county',
      },
    },
    {
      $unwind: {
        path: '$county',
      },
    },
    {
      $lookup: {
        from: 'provinces',
        localField: 'county.province',
        foreignField: '_id',
        as: 'province',
      },
    },
    {
      $unwind: {
        path: '$province',
      },
    },
    {
      $lookup: {
        from: 'human_resouces',
        localField: '_id',
        foreignField: 'fazenda',
        as: 'human_resource',
      },
    },
    {
      $unwind: {
        path: '$human_resource',
      },
    },
    {
      $lookup: {
        from: 'human_resource_types',
        localField: 'human_resource.type',
        foreignField: '_id',
        as: 'human_resource.type',
      },
    },
    {
      $unwind: {
        path: '$human_resource.type',
      },
    },
  ]);

export const DwFazendaInfraestructure = () =>
  fazendaModel.aggregate([
    {
      $lookup: {
        from: 'producers',
        localField: 'producer_id',
        foreignField: '_id',
        as: 'producer',
      },
    },
    {
      $unwind: {
        path: '$producer',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'producer.user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: {
        path: '$user',
      },
    },
    {
      $lookup: {
        from: 'cooperatives',
        localField: 'producer.cooperative',
        foreignField: '_id',
        as: 'cooperative',
      },
    },
    {
      $unwind: {
        path: '$cooperative',
      },
    },
    {
      $lookup: {
        from: 'counties',
        localField: 'cooperative.county',
        foreignField: '_id',
        as: 'cooperative.county',
      },
    },
    {
      $unwind: {
        path: '$cooperative.county',
      },
    },
    {
      $lookup: {
        from: 'provinces',
        localField: 'cooperative.county.province',
        foreignField: '_id',
        as: 'cooperative.county.province',
      },
    },
    {
      $unwind: {
        path: '$cooperative.county.province',
      },
    },
    {
      $lookup: {
        from: 'counties',
        localField: 'county',
        foreignField: '_id',
        as: 'county',
      },
    },
    {
      $unwind: {
        path: '$county',
      },
    },
    {
      $lookup: {
        from: 'provinces',
        localField: 'county.province',
        foreignField: '_id',
        as: 'province',
      },
    },
    {
      $unwind: {
        path: '$province',
      },
    },
    {
      $lookup: {
        from: 'infrastructures',
        localField: '_id',
        foreignField: 'fazenda',
        as: 'infrastructure',
      },
    },
    {
      $unwind: {
        path: '$infrastructure',
      },
    },
    {
      $lookup: {
        from: 'infrastructure_types',
        localField: 'infrastructure.type',
        foreignField: '_id',
        as: 'infrastructure.type',
      },
    },
    {
      $unwind: {
        path: '$infrastructure.type',
      },
    },
  ]);

export const DwFazendaMachine = () =>
  fazendaModel.aggregate([
    {
      $lookup: {
        from: 'producers',
        localField: 'producer_id',
        foreignField: '_id',
        as: 'producer',
      },
    },
    {
      $unwind: {
        path: '$producer',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'producer.user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: {
        path: '$user',
      },
    },
    {
      $lookup: {
        from: 'cooperatives',
        localField: 'producer.cooperative',
        foreignField: '_id',
        as: 'cooperative',
      },
    },
    {
      $unwind: {
        path: '$cooperative',
      },
    },
    {
      $lookup: {
        from: 'counties',
        localField: 'cooperative.county',
        foreignField: '_id',
        as: 'cooperative.county',
      },
    },
    {
      $unwind: {
        path: '$cooperative.county',
      },
    },
    {
      $lookup: {
        from: 'provinces',
        localField: 'cooperative.county.province',
        foreignField: '_id',
        as: 'cooperative.county.province',
      },
    },
    {
      $unwind: {
        path: '$cooperative.county.province',
      },
    },
    {
      $lookup: {
        from: 'counties',
        localField: 'county',
        foreignField: '_id',
        as: 'county',
      },
    },
    {
      $unwind: {
        path: '$county',
      },
    },
    {
      $lookup: {
        from: 'provinces',
        localField: 'county.province',
        foreignField: '_id',
        as: 'province',
      },
    },
    {
      $unwind: {
        path: '$province',
      },
    },
    {
      $lookup: {
        from: 'machines',
        localField: '_id',
        foreignField: 'fazenda',
        as: 'machine',
      },
    },
    {
      $unwind: {
        path: '$machine',
      },
    },
    {
      $lookup: {
        from: 'machine_types',
        localField: 'machine.type',
        foreignField: '_id',
        as: 'machine.type',
      },
    },
    {
      $unwind: {
        path: '$machine.type',
      },
    },
  ]);

export const DwFazendaCulture = () =>
  fazendaModel.aggregate([
    {
      $lookup: {
        from: 'producers',
        localField: 'producer_id',
        foreignField: '_id',
        as: 'producer',
      },
    },
    {
      $unwind: {
        path: '$producer',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'producer.user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: {
        path: '$user',
      },
    },
    {
      $lookup: {
        from: 'cooperatives',
        localField: 'producer.cooperative',
        foreignField: '_id',
        as: 'cooperative',
      },
    },
    {
      $unwind: {
        path: '$cooperative',
      },
    },
    {
      $lookup: {
        from: 'counties',
        localField: 'cooperative.county',
        foreignField: '_id',
        as: 'cooperative.county',
      },
    },
    {
      $unwind: {
        path: '$cooperative.county',
      },
    },
    {
      $lookup: {
        from: 'provinces',
        localField: 'cooperative.county.province',
        foreignField: '_id',
        as: 'cooperative.county.province',
      },
    },
    {
      $unwind: {
        path: '$cooperative.county.province',
      },
    },
    {
      $lookup: {
        from: 'counties',
        localField: 'county',
        foreignField: '_id',
        as: 'county',
      },
    },
    {
      $unwind: {
        path: '$county',
      },
    },
    {
      $lookup: {
        from: 'provinces',
        localField: 'county.province',
        foreignField: '_id',
        as: 'province',
      },
    },
    {
      $unwind: {
        path: '$province',
      },
    },
    {
      $lookup: {
        from: 'culturas',
        localField: '_id',
        foreignField: 'fazenda',
        as: 'culturas',
      },
    },
    {
      $unwind: {
        path: '$culturas',
      },
    },
    {
      $lookup: {
        from: 'cultura_types',
        localField: 'culturas.type',
        foreignField: '_id',
        as: 'culturas.type',
      },
    },
    {
      $unwind: {
        path: '$culturas.type',
      },
    },
  ]);

export const DwFazendaMeioEstacionario = () =>
  fazendaModel.aggregate([
    {
      $lookup: {
        from: 'producers',
        localField: 'producer_id',
        foreignField: '_id',
        as: 'producer',
      },
    },
    {
      $unwind: {
        path: '$producer',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'producer.user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: {
        path: '$user',
      },
    },
    {
      $lookup: {
        from: 'cooperatives',
        localField: 'producer.cooperative',
        foreignField: '_id',
        as: 'cooperative',
      },
    },
    {
      $unwind: {
        path: '$cooperative',
      },
    },
    {
      $lookup: {
        from: 'counties',
        localField: 'cooperative.county',
        foreignField: '_id',
        as: 'cooperative.county',
      },
    },
    {
      $unwind: {
        path: '$cooperative.county',
      },
    },
    {
      $lookup: {
        from: 'provinces',
        localField: 'cooperative.county.province',
        foreignField: '_id',
        as: 'cooperative.county.province',
      },
    },
    {
      $unwind: {
        path: '$cooperative.county.province',
      },
    },
    {
      $lookup: {
        from: 'counties',
        localField: 'county',
        foreignField: '_id',
        as: 'county',
      },
    },
    {
      $unwind: {
        path: '$county',
      },
    },
    {
      $lookup: {
        from: 'provinces',
        localField: 'county.province',
        foreignField: '_id',
        as: 'province',
      },
    },
    {
      $unwind: {
        path: '$province',
      },
    },
    {
      $lookup: {
        from: 'meio_estacionarios',
        localField: '_id',
        foreignField: 'fazenda',
        as: 'meios_estacionario',
      },
    },
    {
      $unwind: {
        path: '$meios_estacionario',
      },
    },
    {
      $lookup: {
        from: 'meio_estacionario_types',
        localField: 'meios_estacionario.type',
        foreignField: '_id',
        as: 'meios_estacionario.type',
      },
    },
    {
      $unwind: {
        path: '$meios_estacionario.type',
      },
    },
  ]);
