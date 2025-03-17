import * as yup from 'yup';

import { Culture } from '../../../../../../../constants/entities';

const validationSchema = yup.object().shape({
  [Culture.Ha]: yup
    .number()
    .transform(
      (value, originalValue) => (originalValue === '' ? undefined : value) // Trata strings vazias como `undefined`
    )
    .required('Por favor indique a area de produção'),
  [Culture.AgriculturalYear]: yup
    .string()
    .required(
      'Por favor indique a O ano agricola com o seguinte formato: 2022/2023'
    ),
  [Culture.DataSementeira]: yup
    .string()
    .required('Por favor indique a data de sementeira'),
  [Culture.DataColheita]: yup
    .string()
    .required('Por favor indique a data de colheita'),
});

export default validationSchema;
