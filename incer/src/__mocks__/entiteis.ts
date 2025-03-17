import {
  Comuna,
  Cooperative,
  County,
  Culture,
  CultureType,
  Fazenda,
  Producer,
  Province,
} from '../constants/entities';
import {
  Alfaia,
  Animal,
  AnimalType,
  ContactInformation,
  Equipamento,
  Geo,
  Ground,
  HumanResource,
  HumanResourceType,
  Infraestrutura,
  InfraestruturaType,
  Localization,
  Machine,
  MachineType,
  MeioEstacionario,
  MeioEstacionarioType,
  Power,
} from '../constants/sub-entites';
import { User } from '../constants/user';
import {
  IAnimal,
  IAnimalType,
  IComuna,
  ICounty,
  IHumanResource,
  IHumanResourceType,
  ILocalization,
  IMachine,
  IMeioEstacionario,
  IMeioEstacionarioType,
  IProvince,
} from '../types';
import { ICooperative } from '../types/cooperative';
import { ICulture, ICultureType } from '../types/culture';
import { IFazenda } from '../types/fazenda';
import { IProducer } from '../types/producer';
import { UserRole } from '../types/user';
import { formatDate } from '../utils';

export const comunaMock: IComuna = {
  [Comuna.Id]: '02429424',
  [Comuna.Description]: 'Tala Hady',
  [Comuna.County]: {
    [County.Id]: '79274920',
    [County.Description]: 'Cazenga',
    // [County.Comunas]: [],
    [County.Province]: {
      [Province.Id]: '72747929',
      [Province.Description]: 'Luanda',
      [Province.Countys]: [],
    },
  },
};

export const humanResourceTypeMock: IHumanResourceType = {
  [HumanResourceType.Id]: '999187717419',
  [HumanResourceType.Description]: 'Operador de Maquina',
};

export const humanResourceTypeMockList: IHumanResourceType[] = [
  {
    [HumanResourceType.Id]: '999187717419',
    [HumanResourceType.Description]: 'Operador de Maquina',
  },
  {
    [HumanResourceType.Id]: '7311411',
    [HumanResourceType.Description]: 'Braçal',
  },
  {
    [HumanResourceType.Id]: '8808fuuafaa',
    [HumanResourceType.Description]: 'Encarregado',
  },
  {
    [HumanResourceType.Id]: 'afçkafçka',
    [HumanResourceType.Description]: 'Caseiro',
  },
];

export const countyMock: ICounty = {
  [County.Id]: '79274920',
  [County.Description]: 'Cazenga',
  // [County.Comunas]: [comunaMock],
};

export const countyMockList: ICounty[] = [
  {
    [County.Id]: '279770402',
    [County.Description]: 'Luanda',
    // [County.Comunas]: [comunaMock],
  },
  {
    [County.Id]: '679770402',
    [County.Description]: 'Belas',
    // [County.Comunas]: [
    //   comunaMock,
    //   { [Comuna.Id]: '8986680', [Comuna.Description]: 'Kilamba Kiaxi' },
    // ],
  },
  countyMock,
];

export const provinceMock: IProvince = {
  [Province.Id]: '72747929',
  [Province.Description]: 'Luanda',
  [Province.Countys]: countyMockList,
};

export const provinceMockList: IProvince[] = [
  {
    [Province.Id]: '987462424',
    [Province.Description]: 'Kuanza Norte',
    [Province.Countys]: countyMockList,
  },
  {
    [Province.Id]: '677462424',
    [Province.Description]: 'Kuanza Sul',
    [Province.Countys]: [
      {
        [County.Id]: '3679770402',
        [County.Description]: 'SUmbe',
        // [County.Comunas]: [comunaMock],
      },
    ],
  },
  provinceMock,
];

export const animalTypeMock = {
  [AnimalType.Id]: '442422442q',
  [AnimalType.Description]: 'Bovino',
  [AnimalType.IsAve]: false,
};

export const animalTypeMockList: IAnimalType[] = [
  {
    [AnimalType.Id]: 'kk424222q',
    [AnimalType.Description]: 'Galinha',
    [AnimalType.IsAve]: true,
  },
  {
    [AnimalType.Id]: '442422442q',
    [AnimalType.Description]: 'Bovino',
    [AnimalType.IsAve]: false,
  },
];

export const animalMock: IAnimal = {
  [Animal.Id]: '2747028084',
  [Animal.Type]: animalTypeMock,
  [Animal.EfectivoTotal]: 300,
  [Animal.Matrizes]: 120,
  [Animal.ProducaoAnual]: 432,
  [Animal.AnoProducao]: 2021,
};

export const groundMock = {
  [Ground.AltitudeMedia]: 100,
  [Ground.AreaCorrigida]: 827279,
  [Ground.Orografia]: 'Relevo',
  [Ground.PhMedio]: 7,
  [Ground.PropriedadesFisicas]: 'propriedades',
  [Ground.SomaBases]: 32,
  [Ground.ctc]: 43,
  [Ground.indiceALuminio]: 9,
  [Ground.indiceSodio]: 12,
};

export const contactMock = {
  [ContactInformation.Email]: 'zebedeu@mic.com',
  [ContactInformation.Phone]: 900333888,
};

export const localizationMock: ILocalization = {
  [Localization.Comuna]: comunaMock,
};

export const geoMock = {
  [Geo.Latitude]: 393938,
  [Geo.Longitude]: 7653567,
};

export const userMock = {
  [User.Id]: '2424',
  [User.Name]: 'Zebedeu Joaquim',
  [User.FirstName]: 'Zebedeu',
  [User.LastName]: 'Joaquim',
  [User.Phone]: 900222333,
  [User.Role]: UserRole.Producer,
  [User.Email]: 'zebedeu@gmail.com',
};
export const userMockTwo = {
  [User.Id]: '2424',
  [User.Name]: 'Jorge Alexandre',
  [User.FirstName]: 'Jorge',
  [User.LastName]: 'Alexandrew',
  [User.Phone]: 900222333,
  [User.Role]: UserRole.Producer,
  [User.Email]: 'jorge@gmail.com',
};

export const userMockList = [userMock];

export const producerMock: IProducer = {
  [Producer.isProducer]: '44kfkww',
  [Producer.CompanyName]: 'Teste',
  [Producer.Id]: '44kfkww',
  [Producer.Nif]: '002458395324244',
  [Producer.Bi]: '00245839539L24244',
  [Producer.User]: userMockTwo as any,
  [Producer.County]: countyMock,
};
export const producerMockTwo: IProducer = {
  [Producer.Id]: '44kfkww',
  [Producer.isProducer]: '44kfkww',
  [Producer.CompanyName]: 'Teste',
  [Producer.Nif]: '002458395324244',
  [Producer.Bi]: '00245839539L24244',
  [Producer.User]: userMock as any,
  [Producer.County]: countyMock,
};

export const withFazendas = (entity: Record<string, any>) => {
  return {
    ...entity,
    fazendas: [fazendasMock],
  };
};

export const machineTypeMock = {
  [MachineType.Id]: '42879429742',
  [MachineType.Description]: 'Tractores',
};

export const machineMock: IMachine = {
  [Machine.Id]: '3828420',
  [Machine.Type]: machineTypeMock,
  [Machine.Quantity]: 22,
  [Machine.Power]: {
    [Power.Unidade]: 'pH',
    [Power.Value]: 420,
  },
};

export const equipamentoTypeMock = {
  [Alfaia.Id]: '9974792',
  [Alfaia.Description]: 'Charruas',
};

export const equipamentoMock = {
  [Equipamento.Id]: '79780fi',
  [Equipamento.Alfaia]: equipamentoTypeMock,
  [Equipamento.Caracteristicas]: '5 discos',
  [Equipamento.Quantity]: 1,
};

export const infraestruturaTypeMock = {
  [InfraestruturaType.Id]: '48297428',
  [InfraestruturaType.Description]: 'Residencia',
};

export const infraestruturaMock = {
  [Infraestrutura.Id]: '339930',
  [Infraestrutura.Type]: infraestruturaTypeMock,
  [Infraestrutura.Capacity]: '10.000',
  [Infraestrutura.Quantity]: 2,
  [Infraestrutura.Unidade]: 'Toneladas',
};

export const cultureTypeMock: ICultureType = {
  [CultureType.Id]: '9769669779',
  [CultureType.Description]: 'Milho',
};

export const cultureMock: ICulture = {
  [Culture.Id]: '84749794',
  [Culture.Ha]: 13384,
  [Culture.Producao]: 424244,
  [Culture.Irrigacao]: 'Irrigada',
  [Culture.Type]: cultureTypeMock,
  [Culture.AgriculturalYear]: '2022/2023',
  [Culture.DataSementeira]: formatDate(new Date('2020/10/10')),
  [Culture.DataColheita]: formatDate(new Date('2021/06/10')),
  [Culture.Fazenda]: {
    [Fazenda.Id]: 'f08f0q80',
    [Fazenda.Extension]: 29393,
    [Fazenda.Descricao]: 'Chissola',
    [Fazenda.Nif]: '98a8ankf',
    [Fazenda.Gerencia]: 'Zebedeu',
    [Fazenda.Ground]: groundMock,
    [Fazenda.Contact]: contactMock,
    [Fazenda.Geo]: geoMock,
    [Fazenda.Estradanacional]: 'Nacional 100',
    [Fazenda.DistanciaEstrada]: 103,
    [Fazenda.Producer]: producerMock,
    [Fazenda.County]: countyMock,
  } as any,
};

export const meioEstacionarioTypeMock: IMeioEstacionarioType = {
  [MeioEstacionarioType.Id]: '80288042',
  [MeioEstacionarioType.Description]: 'bombas',
};

export const meioEstacionarioMock: IMeioEstacionario = {
  [MeioEstacionario.Id]: '1881081',
  [MeioEstacionario.Quantity]: 2,
  [Machine.Power]: {
    [Power.Unidade]: 'pH',
    [Power.Value]: 420,
  },
  [MeioEstacionario.Type]: meioEstacionarioTypeMock,
};

export const humanResourceMock: IHumanResource = {
  [HumanResource.Id]: '88ajfljafla',
  [HumanResource.Type]: humanResourceTypeMock,
  [HumanResource.Quantity]: 2,
};

export const fazendasMock: IFazenda = {
  [Fazenda.Id]: 'f08f0q80',
  [Fazenda.Extension]: 29393,
  [Fazenda.Descricao]: 'Chissola',
  [Fazenda.Nif]: '98a8ankf',
  [Fazenda.Gerencia]: 'Zebedeu',
  [Fazenda.Ground]: groundMock,
  [Fazenda.Contact]: contactMock,
  [Fazenda.Geo]: geoMock,
  [Fazenda.Estradanacional]: 'Nacional 100',
  [Fazenda.DistanciaEstrada]: 103,
  [Fazenda.Producer]: producerMock,
  [Fazenda.Machines]: [machineMock],
  [Fazenda.Equipamentos]: [equipamentoMock],
  [Fazenda.Infraestruturas]: [infraestruturaMock],
  [Fazenda.Animals]: [
    animalMock,
    {
      [Animal.Id]: '424252',
      [Animal.EfectivoTotal]: 200,
      [Animal.Matrizes]: 120,
      [Animal.Type]: animalTypeMockList[0],
      [Animal.AnoProducao]: 2021,
      [Animal.ProducaoAnual]: 7,
      [Animal.QuantidadeOvos]: 23943,
    },
  ],
  [Fazenda.Culturas]: [cultureMock],
  [Fazenda.MeiosEstacionarios]: [meioEstacionarioMock],
  [Fazenda.HumanResource]: [humanResourceMock],
  [Fazenda.County]: countyMock,
} as any;

export const fazendasMockList: IFazenda[] = [
  {
    [Fazenda.Id]: 'f08f0q80',
    [Fazenda.Descricao]: 'Chissola',
    [Fazenda.Nif]: '98a8ankf',
    [Fazenda.Gerencia]: 'Zebedeu',
    [Fazenda.Ground]: groundMock,
    [Fazenda.Contact]: contactMock,
    [Fazenda.Geo]: geoMock,
    [Fazenda.Estradanacional]: 'Nacional 100',
    [Fazenda.DistanciaEstrada]: 103,
    [Fazenda.Producer]: producerMock,
    [Fazenda.Machines]: [machineMock],
    [Fazenda.Equipamentos]: [equipamentoMock],
    [Fazenda.Infraestruturas]: [infraestruturaMock],
    [Fazenda.Animals]: [animalMock],
    [Fazenda.Extension]: 3044,
    [Fazenda.Culturas]: [cultureMock],
    [Fazenda.County]: countyMock,
  } as any,
  {
    [Fazenda.Id]: 'f08f0q80',
    [Fazenda.Descricao]: 'Luz Nascente',
    [Fazenda.Nif]: '98a8ankf',
    [Fazenda.Gerencia]: 'Zebedeu',
    [Fazenda.Ground]: groundMock,
    [Fazenda.Contact]: contactMock,
    [Fazenda.Geo]: geoMock,
    [Fazenda.Estradanacional]: 'Nacional 100',
    [Fazenda.DistanciaEstrada]: 103,
    [Fazenda.Producer]: producerMockTwo,
    [Fazenda.Machines]: [machineMock],
    [Fazenda.Equipamentos]: [equipamentoMock],
    [Fazenda.Infraestruturas]: [infraestruturaMock],
    [Fazenda.Animals]: [animalMock],
    [Fazenda.Extension]: 2000,
    [Fazenda.Culturas]: [cultureMock],
    [Fazenda.County]: countyMock,
  } as any,
];

export const producerMockList: IProducer[] = [
  {
    [Producer.Id]: '242942492',
    [Producer.isProducer]: '44kfkww',
    [Producer.CompanyName]: 'Teste',
    [Producer.Nif]: '424524',
    [Producer.Bi]: '424524',
    [Producer.User]: userMock as any,
    [Producer.County]: countyMock,
  },
];

export const cooperativeMock: ICooperative = {
  [Cooperative.Id]: '193717',
  [Cooperative.isCooperative]: true,
  [Cooperative.Description]: 'Chissola',
  [Cooperative.Address]: 'Sumbe a',
  [Cooperative.Contact]: {
    phone: '900222333',
  },
  [Cooperative.County]: {
    _id: '084844',
    description: 'Sumbe',
    province: {
      [Province.Id]: '84864279',
      [Province.Description]: 'Kwanza Sul',
      [Province.Countys]: countyMockList,
    },
    // [County.Comunas]: [comunaMock],
  },
  [Cooperative.Presindet]: 'Luis de Jesus',
  [Cooperative.Cultures]: [
    cultureMock,
    {
      [Culture.Id]: '083801893',
      [Culture.Type]: { _id: '79427492', description: 'Arroz' },
      [Culture.Producao]: 5405,
      [Culture.DataSementeira]: formatDate(new Date()),
      [Culture.AgriculturalYear]: '2022/2023',
      [Culture.Irrigacao]: 'Irrigada',
      [Culture.Fazenda]: {
        [Fazenda.Id]: '202822kkw',
        [Fazenda.Descricao]: 'Sol Nascente',
        [Fazenda.Producer]: {
          [Producer.County]: countyMock,
          [Producer.Id]: '44kfkww',
          [Producer.Nif]: 'fowfowofwo',
          [Producer.Bi]: 'fowfowofwo',
          [Producer.User]: {
            [User.Id]: '2424',
            [User.Name]: 'Zebedeu Joaquim',
            [User.FirstName]: 'Zebedeu',
            [User.LastName]: 'Joaquim',
            [User.Phone]: 900222333,
            [User.Role]: UserRole.Producer,
          } as any,
        } as any,
        [Fazenda.Nif]: '942849429',
        [Fazenda.Gerencia]: 'Vanio',
        [Fazenda.Contact]: {
          [ContactInformation.Email]: 'mike@aaa.co',
          [ContactInformation.Phone]: 999333222,
        },
        [Fazenda.Estradanacional]: 'EN 100',
        [Fazenda.DistanciaEstrada]: 24242424,
        [Fazenda.Geo]: {
          [Geo.Latitude]: 8274024,
          [Geo.Longitude]: 4242442,
        },
        [Fazenda.Ground]: {
          [Ground.AltitudeMedia]: 299292,
          [Ground.AreaCorrigida]: 383283,
          [Ground.Orografia]: 'Relevo',
          [Ground.PhMedio]: 7,
          [Ground.PropriedadesFisicas]: 'prop',
        },
        [Fazenda.Extension]: 124,
        [Fazenda.County]: countyMock,
      } as any,
    },
  ],
};
