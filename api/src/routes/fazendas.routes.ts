import { Router } from 'express';

import { ROUTES } from '../constants';
import {
  addAnimal,
  addCultura,
  addEquipamento,
  addHumanResource,
  addInfrastruture,
  addMachine,
  addMeioEstacionario,
  createFazenda,
  deleteFazenda,
  fazendaGrown,
  getAllFazenda,
  getFazendaById,
  updateFazendaByProducer,
} from '../controllers/fazenda.controller';
import { getAllFazendaProducer } from '../controllers/producer.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const fazendaRoutes = Router();

fazendaRoutes.post(
  ROUTES.fazenda,
  validateJWT,
  roleProtect(['producer', 'cooperative', 'technician']),
  createFazenda
);

fazendaRoutes.patch(
  `${ROUTES.fazenda}/:id`,
  validateJWT,
  roleProtect(['producer', 'cooperative', 'technician']),
  updateFazendaByProducer
);

fazendaRoutes.get(ROUTES.fazenda, validateJWT, roleProtect(['technician', 'admin']), getAllFazenda);

fazendaRoutes.get(
  `${ROUTES.fazenda}/my`,
  validateJWT,
  roleProtect(['producer']),
  getAllFazendaProducer
);

fazendaRoutes.get(
  `${ROUTES.fazenda}/grown`,
  validateJWT,
  roleProtect(['technician', 'admin']),
  fazendaGrown
);

fazendaRoutes.get(
  `${ROUTES.fazenda}/:id`,
  validateJWT,
  roleProtect(['producer', 'cooperative', 'technician', 'admin']),
  getFazendaById
);

fazendaRoutes.delete(
  ROUTES.fazenda,
  validateJWT,
  roleProtect(['producer', 'cooperative', 'technician']),
  deleteFazenda
);

// CULTURE
fazendaRoutes.post(
  `${ROUTES.fazenda}/culture`,
  validateJWT,
  roleProtect(['producer', 'cooperative', 'technician']),
  addCultura
);

// MACHINE
fazendaRoutes.post(
  `${ROUTES.fazenda}/machine`,
  validateJWT,
  roleProtect(['producer', 'cooperative', 'technician']),
  addMachine
);

// EQUIPAMENTO
fazendaRoutes.post(
  `${ROUTES.fazenda}/equipamento`,
  validateJWT,
  roleProtect(['producer', 'cooperative', 'technician']),
  addEquipamento
);

// MEIO ESTACIONARIO
fazendaRoutes.post(
  `${ROUTES.fazenda}/meio-estacionario`,
  validateJWT,
  roleProtect(['producer', 'cooperative', 'technician']),
  addMeioEstacionario
);

// INFRASTRUTURE
fazendaRoutes.post(
  `${ROUTES.fazenda}/infrastruture`,
  validateJWT,
  roleProtect(['producer', 'cooperative', 'technician']),
  addInfrastruture
);

// ANIMAL
fazendaRoutes.post(
  `${ROUTES.fazenda}/animal`,
  validateJWT,
  roleProtect(['producer', 'cooperative', 'technician']),
  addAnimal
);

// HUMAN RESOURCE
fazendaRoutes.post(
  `${ROUTES.fazenda}/human-resource`,
  validateJWT,
  roleProtect(['producer', 'cooperative', 'technician']),
  addHumanResource
);

// eslint-disable-next-line import/prefer-default-export
export const fazenda = fazendaRoutes;
