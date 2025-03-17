import * as yup from 'yup';

import { Ground } from '../../../../../../../../../constants/sub-entites';

const validationSchema = yup.object().shape({
  /*  [Ground.ctc]: yup
    .number()
    .min(50, 'O Ctc mínima é de 50 ha')
    .required('A altitude média é obrigatória'),
  [Ground.SomaBases]: yup
    .number()
    .min(50, 'O extensão mínima é de 50 ha')
    .required('A altitude média é obrigatória'), */

  [Ground.extension]: yup
    .number()
    .transform(
      (value, originalValue) => (originalValue === '' ? undefined : value) // Trata strings vazias como `undefined`
    )
    .min(50, 'O extensão mínima é de 50 ha')
    .required('A extensão é obrigatória'),
  [Ground.AltitudeMedia]: yup
    .number()
    .transform(
      (value, originalValue) => (originalValue === '' ? undefined : value) // Trata strings vazias como `undefined`
    )
    .required('A altitude média é obrigatória'),
  // [Ground.Orografia]: yup.string().required('A orografia é obrigatória'),
  [Ground.PropriedadesFisicas]: yup
    .string()
    .required('As propriedades físicas são obrigatórias'),
  [Ground.PhMedio]: yup
    .number()
    .transform(
      (value, originalValue) => (originalValue === '' ? undefined : value) // Trata strings vazias como `undefined`
    )
    .min(1, 'O valor mínimo para o pH médio é 1')
    .max(7, 'O valor máximo para o pH médio é 7'),
  [Ground.AreaCorrigida]: yup
    .string()
    .required('A area corrigida é obrigatória')
    .min(1, 'A area de corrigida deve ter no minímo 1HA')
    .max(9000, 'A area de produção deve ter no máximo 9.000HA'),
});

export default validationSchema;
