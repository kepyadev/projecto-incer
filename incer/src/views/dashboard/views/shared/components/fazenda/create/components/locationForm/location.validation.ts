import * as yup from 'yup';

import { Fazenda } from '../../../../../../../../../constants/entities';
import { Geo } from '../../../../../../../../../constants/sub-entites';

const regex = RegExp(/^-{0,1}[0-9]*$/);
const validationSchema = yup.object().shape({
  [Fazenda.Estradanacional]: yup
    .string()
    .required('Por favor indique a estrada nacional mais próxima'),
  [Fazenda.DistanciaEstrada]: yup
    .string()
    .required('Por favor indique a distância da estrada nacional'),
  [Geo.Latitude]: yup
    .string()
    .required('A Latitude é obrigatória')
    .matches(regex, 'a latitude deve ser um número'),
  [Geo.Longitude]: yup
    .string()
    .required('A Longitude é obrigatória')
    .matches(regex, 'a longitude deve ser um número'),
});

export default validationSchema;
