/* eslint-disable @typescript-eslint/no-unused-vars-experimental */
import {
  fazendasMock,
  fazendasMockList,
  producerMock,
} from '../../__mocks__/entiteis';
import APIROUTES from '../../constants/api-routes';
import { Fazenda, Producer } from '../../constants/entities';
import {
  Alfaia,
  Animal,
  AnimalType,
  ContactInformation,
  Equipamento,
  Geo,
  Ground,
  Infraestrutura,
  InfraestruturaType,
  Localization,
  Machine,
  MachineType,
  Power,
} from '../../constants/sub-entites';
import { User } from '../../constants/user';
import {
  AnimalDTO,
  EquipamentoDTO,
  HumanResourceDTO,
  IHumanResource,
  IMeioEstacionario,
  InfraestruturaDTO,
  MachineDTO,
  MeioEstacionarioDTO,
} from '../../types';
import { CultureDTO } from '../../types/culture';
import { IFazenda, IFazendaData } from '../../types/fazenda';
import { MsgData } from '../../types/services';
import { formatQuery } from '../service-helper';
import { AllowedQueryKeys, HttpResponse, ListDataResponse } from '../services.types';
import { deleteRequest, getRequest, patchRequest, postRequest } from '../utils';

const fazendasMockResponse: HttpResponse<MsgData<IFazenda>> = {
  status: 200,
  data: {
    payload: fazendasMock,
    // {
    //   [Fazenda.Id]: 'f08f0q80',
    //   [Fazenda.Extension]: 29393,
    //   [Fazenda.Descricao]: 'Chissola',
    //   [Fazenda.Nif]: '98a8ankf',
    //   [Fazenda.Gerencia]: 'Zebedeu',
    //   [Fazenda.Ground]: {
    //     [Ground.AltitudeMedia]: 100,
    //     [Ground.AreaCorrigida]: 827279,
    //     [Ground.Orografia]: 'Relevo',
    //     [Ground.PhMedio]: 7,
    //     [Ground.PropriedadesFisicas]: 'propriedades',
    //   },
    //   [Fazenda.Contact]: {
    //     [ContactInformation.Email]: 'zebedeu@mic.com',
    //     [ContactInformation.Phone]: '900333888',
    //   },
    //   [Fazenda.Localization]: {
    //     [Localization.Comuna]: '0',
    //     [Localization.County]: '0',
    //     [Localization.Province]: '1',
    //   },
    //   [Fazenda.Geo]: {
    //     [Geo.Latitude]: 393938,
    //     [Geo.Longitude]: 7653567,
    //   },
    //   [Fazenda.Estradanacional]: 'Nacional 100',
    //   [Fazenda.DistanciaEstrada]: 103,
    //   [Fazenda.Producer]: {
    //     [Producer.Id]: '44kfkww',
    //     [Producer.Nif]: 'fowfowofwo',
    //     [Producer.Bi]: 'fowfowofwo',
    //     [Producer.User]: {
    //       [User.Name]: 'Zebedeu Joaquim',
    //       [User.FirstName]: 'Zebedeu',
    //       [User.LastName]: 'Joaquim',
    //       [User.Phone]: 900222333,
    //       [User.Role]: UserRole.Producer,
    //     },
    //   },
    //   [Fazenda.Machines]: [
    //     {
    //       [Machine.Type]: {
    //         [MachineType.Id]: '42879429742',
    //         [MachineType.Description]: 'Tractores',
    //       },
    //       [Machine.Quantity]: 2,
    //       [Machine.Power]: {
    //         [Power.Unidade]: 'pH',
    //         [Power.Value]: 420,
    //       },
    //     },
    //   ],
    //   [Fazenda.Equipamentos]: [
    //     {
    //       [Equipamento.Alfaia]: {
    //         [Alfaia.Id]: '9974792',
    //         [Alfaia.Description]: 'Charruas',
    //       },
    //       [Equipamento.Caracteristicas]: '5 discos',
    //       [Equipamento.Quantity]: 1,
    //     },
    //   ],
    //   [Fazenda.Infraestruturas]: [
    //     {
    //       [Infraestrutura.Type]: {
    //         [InfraestruturaType.Id]: '48297428',
    //         [InfraestruturaType.Description]: 'Residencia',
    //       },
    //       [Infraestrutura.Capacity]: '10.000',
    //       [Infraestrutura.Quantity]: 2,
    //       [Infraestrutura.Unidade]: 'Toneladas',
    //     },
    //   ],
    //   [Fazenda.Animals]: [
    //     {
    //       [Animal.Id]: '2747028084',
    //       [Animal.Type]: {
    //         [AnimalType.Id]: '442422442q',
    //         [AnimalType.Description]: 'Bovino',
    //       },
    //       [Animal.EfectivoTotal]: 300,
    //       [Animal.Matrizes]: 120,
    //       [Animal.ProducaoAnual]: 432,
    //       [Animal.AnoProducao]: 2021,
    //     },
    //   ],
    // },

    msg: 'Sucesso',
  },
};
const fazendasMockListResponse: HttpResponse<MsgData<ListDataResponse<IFazenda[]>>> =
  {
    status: 200,
    data: {
      payload: {
        count: 1,
        data: fazendasMockList,
        // [
        //   {
        //     [Fazenda.Id]: 'f08f0q80',
        //     [Fazenda.Descricao]: 'Chissola',
        //     [Fazenda.Nif]: '98a8ankf',
        //     [Fazenda.Gerencia]: 'Zebedeu',
        //     [Fazenda.Ground]: {
        //       [Ground.AltitudeMedia]: 100,
        //       [Ground.AreaCorrigida]: 827279,
        //       [Ground.Orografia]: 'Relevo',
        //       [Ground.PhMedio]: 7,
        //       [Ground.PropriedadesFisicas]: 'propriedades',
        //     },
        //     [Fazenda.Contact]: {
        //       [ContactInformation.Email]: 'zebedeu@mic.com',
        //       [ContactInformation.Phone]: '900333888',
        //     },
        //     [Fazenda.Localization]: {
        //       [Localization.Comuna]: '0',
        //       [Localization.County]: '0',
        //       [Localization.Province]: '1',
        //     },
        //     [Fazenda.Geo]: {
        //       [Geo.Latitude]: 393938,
        //       [Geo.Longitude]: 7653567,
        //     },
        //     [Fazenda.Estradanacional]: 'Nacional 100',
        //     [Fazenda.DistanciaEstrada]: 103,
        //     [Fazenda.Producer]: producerMock,
        //     [Fazenda.Machines]: [
        //       {
        //         [Machine.Type]: {
        //           [MachineType.Id]: '42879429742',
        //           [MachineType.Description]: 'Tractores',
        //         },
        //         [Machine.Quantity]: 2,
        //         [Machine.Power]: {
        //           [Power.Unidade]: 'pH',
        //           [Power.Value]: 420,
        //         },
        //       },
        //     ],
        //     [Fazenda.Equipamentos]: [
        //       {
        //         [Equipamento.Alfaia]: {
        //           [Alfaia.Id]: '9974792',
        //           [Alfaia.Description]: 'Charruas',
        //         },
        //         [Equipamento.Caracteristicas]: '5 discos',
        //         [Equipamento.Quantity]: 1,
        //       },
        //     ],
        //     [Fazenda.Infraestruturas]: [
        //       {
        //         [Infraestrutura.Type]: {
        //           [InfraestruturaType.Id]: '48297428',
        //           [InfraestruturaType.Description]: 'Residencia',
        //         },
        //         [Infraestrutura.Capacity]: '10.000',
        //         [Infraestrutura.Quantity]: 2,
        //         [Infraestrutura.Unidade]: 'Toneladas',
        //       },
        //     ],
        //     [Fazenda.Animals]: [
        //       {
        //         [Animal.Id]: '2747028084',
        //         [Animal.Type]: {
        //           [AnimalType.Id]: '442422442q',
        //           [AnimalType.Description]: 'Bovino',
        //         },
        //         [Animal.EfectivoTotal]: 300,
        //         [Animal.Matrizes]: 120,
        //         [Animal.ProducaoAnual]: 432,
        //         [Animal.AnoProducao]: 2021,
        //       },
        //     ],
        //     [Fazenda.Extension]: 3044,
        //   },
        //   {
        //     [Fazenda.Id]: 'f08f0q80',
        //     [Fazenda.Descricao]: 'Luz Nascente',
        //     [Fazenda.Nif]: '98a8ankf',
        //     [Fazenda.Gerencia]: 'Zebedeu',
        //     [Fazenda.Ground]: {
        //       [Ground.AltitudeMedia]: 100,
        //       [Ground.AreaCorrigida]: 827279,
        //       [Ground.Orografia]: 'Relevo',
        //       [Ground.PhMedio]: 7,
        //       [Ground.PropriedadesFisicas]: 'propriedades',
        //     },
        //     [Fazenda.Contact]: {
        //       [ContactInformation.Email]: 'zebedeu@mic.com',
        //       [ContactInformation.Phone]: '900333888',
        //     },
        //     [Fazenda.Localization]: {
        //       [Localization.Comuna]: '0',
        //       [Localization.County]: '0',
        //       [Localization.Province]: '1',
        //     },
        //     [Fazenda.Geo]: {
        //       [Geo.Latitude]: 393938,
        //       [Geo.Longitude]: 7653567,
        //     },
        //     [Fazenda.Estradanacional]: 'Nacional 100',
        //     [Fazenda.DistanciaEstrada]: 103,
        //     [Fazenda.Producer]: producerMock,
        //     [Fazenda.Machines]: [
        //       {
        //         [Machine.Type]: {
        //           [MachineType.Id]: '42879429742',
        //           [MachineType.Description]: 'Tractores',
        //         },
        //         [Machine.Quantity]: 2,
        //         [Machine.Power]: {
        //           [Power.Unidade]: 'pH',
        //           [Power.Value]: 420,
        //         },
        //       },
        //     ],
        //     [Fazenda.Equipamentos]: [
        //       {
        //         [Equipamento.Alfaia]: {
        //           [Alfaia.Id]: '9974792',
        //           [Alfaia.Description]: 'Charruas',
        //         },
        //         [Equipamento.Caracteristicas]: '5 discos',
        //         [Equipamento.Quantity]: 1,
        //       },
        //     ],
        //     [Fazenda.Infraestruturas]: [
        //       {
        //         [Infraestrutura.Type]: {
        //           [InfraestruturaType.Id]: '48297428',
        //           [InfraestruturaType.Description]: 'Residencia',
        //         },
        //         [Infraestrutura.Capacity]: '10.000',
        //         [Infraestrutura.Quantity]: 2,
        //         [Infraestrutura.Unidade]: 'Toneladas',
        //       },
        //     ],
        //     [Fazenda.Animals]: [
        //       {
        //         [Animal.Id]: '2747028084',
        //         [Animal.Type]: {
        //           [AnimalType.Id]: '442422442q',
        //           [AnimalType.Description]: 'Bovino',
        //         },
        //         [Animal.EfectivoTotal]: 300,
        //         [Animal.Matrizes]: 120,
        //         [Animal.ProducaoAnual]: 432,
        //         [Animal.AnoProducao]: 2021,
        //       },
        //     ],
        //     [Fazenda.Producer]: producerMock,
        //     [Fazenda.Extension]: 2000,
        //   },
        // ],
      },
      msg: 'Sucesso',
    },
  };

export const getAllFazendaProducer = (params: AllowedQueryKeys = {}) =>
  getRequest<MsgData<ListDataResponse<ReadonlyArray<IFazenda>>>>(
    `${APIROUTES.FAZENDA}/my?${formatQuery(params)}`
  );

export const getAllFazendaByProducerId =
  (id: string) =>
  (params: AllowedQueryKeys = {}) =>
    getRequest<MsgData<ListDataResponse<IFazenda[]>>>(
      `${APIROUTES.PRODUCER}/${id}/fazendas?${formatQuery(params)}`
    );
// Promise.resolve(fazendasMockListResponse);

export const getAllFazenda = (params: AllowedQueryKeys = {}) =>
  getRequest<MsgData<ListDataResponse<ReadonlyArray<IFazenda>>>>(
    `${APIROUTES.FAZENDA}?${formatQuery(params)}`
  );
// Promise.resolve(fazendasMockListResponse);

export const getAllFazendaCooperative = (params: AllowedQueryKeys = {}) =>
  // Promise.resolve(fazendasMockListResponse);
  getRequest<MsgData<ListDataResponse<IFazenda[]>>>(
    `${APIROUTES.COOPERATIVE_FAZENDA}?${formatQuery(params)}`
  );

export const getFazendaById = (id: string) =>
  // Promise.resolve(fazendasMockResponse);
  getRequest<MsgData<IFazenda>>(`${APIROUTES.FAZENDA}/${id}`);

export const createFazenda = (fazenda: IFazendaData) =>
  postRequest<MsgData<IFazenda>>(APIROUTES.FAZENDA, fazenda);

export const updateFazenda = (id: string, fazenda: IFazendaData) =>
  patchRequest<MsgData<IFazenda>>(`${APIROUTES.FAZENDA}/${id}`, fazenda);

export const deleteFazenda = (id: string | number) =>
  deleteRequest<MsgData<IFazenda>>(`${APIROUTES.FAZENDA}?id=${id}`);

export const addCultureToFazenda = (
  culture: CultureDTO
): Promise<HttpResponse<MsgData<any>>> =>
  postRequest(APIROUTES.FAZENDA_CULTURE, culture);

export const addAnimalsToFazenda = (
  animal: AnimalDTO
): Promise<HttpResponse<MsgData<any>>> =>
  postRequest(`${APIROUTES.FAZENDA}/animal`, animal);

export const addMachineToFazenda = (
  machine: MachineDTO
): Promise<HttpResponse<MsgData<any>>> =>
  postRequest(`${APIROUTES.FAZENDA}/machine`, machine);

export const addEquipamentoToFazenda = (
  equipamento: EquipamentoDTO
): Promise<HttpResponse<MsgData<any>>> =>
  postRequest(`${APIROUTES.FAZENDA}/equipamento`, equipamento);

export const addInfraestruturaToFazenda = (
  infraestrutura: InfraestruturaDTO
): Promise<HttpResponse<MsgData<any>>> =>
  postRequest(`${APIROUTES.FAZENDA}/infrastruture`, infraestrutura);
// Promise.reject(new Error('Lamentamos, ocorreu um erro!'));

export const addHumanResource = (
  humanResource: HumanResourceDTO
): Promise<HttpResponse<MsgData<IHumanResource>>> =>
  postRequest(`${APIROUTES.FAZENDA}/human-resource`, humanResource);

export const addMeioEstacionario = (
  meioEstacionario: MeioEstacionarioDTO
): Promise<HttpResponse<MsgData<IMeioEstacionario>>> =>
  postRequest(`${APIROUTES.FAZENDA}/meio-estacionario`, meioEstacionario);

export const fazendaGrown = (): Promise<
  HttpResponse<MsgData<{ date: string; fazendas: number }[]>>
> => getRequest(`${APIROUTES.FAZENDA}/grown`);
