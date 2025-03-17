import { admin } from './admin.routes';
import { animal } from './animal.routes';
import { animalType } from './animal-type.routes';
import { association } from './association.routes';
import { auth } from './auth.routes';
import { importedProduct } from './consumption.routes';
import { cooperative } from './cooperative.routes';
import { country } from './country.routes';
import { county } from './county.routes';
import { culture } from './culture.routes';
import { cultureType } from './culture-type.routes';
import { equipamento } from './equipamento.routes';
import { equipamentoType } from './equipamento-type.routes';
import { fazenda } from './fazendas.routes';
import { humanResource } from './human-resource.routes';
import { humanResourceType } from './human-resource-type.routes';
import { infrastructure } from './infrastructure.routes';
import { infrastructureType } from './infrastructure-type.routes';
import { log } from './logs.routes';
import { machine } from './machine.routes';
import { machineType } from './machine-type.routes';
import { nationalMarketPrice } from './market-prices.routes';
import { MeioEstacionario } from './meio-estacionario.routes';
import { meioEstacionarioType } from './meio-estacionario-type.routes';
import { nationalProduction } from './national-production.routes';
import { partner } from './partner.routes';
import { producer } from './producer.routes';
import { province } from './province.routes';
import { technician } from './technician.routes';
import { users } from './users.routes';

const routes = [
  animal,
  auth,
  producer,
  fazenda,
  county,
  province,
  country,
  machineType,
  machine,
  equipamento,
  equipamentoType,
  infrastructure,
  infrastructureType,
  MeioEstacionario,
  meioEstacionarioType,
  animalType,
  cooperative,
  association,
  humanResource,
  humanResourceType,
  cultureType,
  culture,
  users,
  technician,
  partner,
  admin,
  log,
  nationalProduction,
  nationalMarketPrice,
  importedProduct,
];
export default routes;
