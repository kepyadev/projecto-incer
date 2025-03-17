import { Router } from 'express';

import { ROUTES } from '../constants';
import {
  createProducer,
  getAllFazendaByProducerId,
  getAllFazendaProducer,
  getAllProducer,
  getAllProducersByCooperative,
  getAllProducerWithCooperative,
  getMyAnimals,
  getMyCooperative,
  getMyCultures,
  getProducerById,
  getProducerResume,
  linkWithCooperative,
  unlinkCooperative,
} from '../controllers/producer.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const producerRoutes = Router();

producerRoutes.post(ROUTES.producer, validateJWT, roleProtect(['producer']), createProducer);

producerRoutes.get(
  ROUTES.producer,
  validateJWT,
  roleProtect(['admin', 'technician']),
  getAllProducer
);

producerRoutes.get(
  `${ROUTES.producer}/with-cooperative`,
  validateJWT,
  roleProtect(['admin', 'technician']),
  getAllProducerWithCooperative
);

producerRoutes.get(
  `${ROUTES.producer}/my-cooperative`,
  validateJWT,
  roleProtect(['producer']),
  getMyCooperative
);

producerRoutes.get(
  `${ROUTES.producer}/my-cultures`,
  validateJWT,
  roleProtect(['producer']),
  getMyCultures
);
producerRoutes.get(
  `${ROUTES.producer}/my-animals`,
  validateJWT,
  roleProtect(['producer']),
  getMyAnimals
);

producerRoutes.get(
  `${ROUTES.producer}/resume`,
  validateJWT,
  roleProtect(['producer']),
  getProducerResume
);

producerRoutes.get(
  `${ROUTES.producer}/:id`,
  validateJWT,
  roleProtect(['technician', 'admin']),
  getProducerById
);

producerRoutes.get(
  `${ROUTES.producer}/:id/fazendas`,
  validateJWT,
  roleProtect(['cooperative', 'technician', 'admin']),
  getAllFazendaByProducerId
);

/**
 * For cooperative ROLE
 */
producerRoutes.get(
  `${ROUTES.producer}/cooperative`,
  validateJWT,
  roleProtect(['cooperative']),
  getAllProducersByCooperative
);
producerRoutes.get(
  `${ROUTES.producer}/fazenda`,
  validateJWT,
  roleProtect(['producer']),
  getAllFazendaProducer
);

producerRoutes.patch(
  `${ROUTES.producer}/link-with-cooperative`,
  validateJWT,
  roleProtect(['cooperative', 'technician']),
  linkWithCooperative
);

producerRoutes.patch(
  `${ROUTES.producer}/unlink-with-cooperative`,
  validateJWT,
  roleProtect(['cooperative', 'technician']),
  unlinkCooperative
);

// eslint-disable-next-line import/prefer-default-export
export const producer = producerRoutes;
