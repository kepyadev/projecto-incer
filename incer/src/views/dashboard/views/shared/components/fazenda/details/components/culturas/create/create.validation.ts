import * as yup from 'yup';

import { Culture } from '../../../../../../../../../../constants/entities';

const currentYear = new Date().getFullYear(); // Obtém o ano corrente

const validationSchema = yup.object().shape({
  [Culture.Ha]: yup
    .number()
    .transform(
      (value, originalValue) => (originalValue === '' ? undefined : value) // Trata strings vazias como `undefined`
    )
    .required('Por favor indique a area de produção')
    .min(1, 'A area de produção deve ter no minímo 1HA')
    .max(9000, 'A area de produção deve ter no máximo 9.000HA'),
  [Culture.AgriculturalYear]: yup
    .string()
    .required('Por favor indique o ano agrícola com o seguinte formato: 2022/2023')
    .test(
      'valid-year', // Nome do teste personalizado
      `O ano agrícola não pode ser superior a ${currentYear}.`, // Mensagem de erro
      value => {
        if (!value) return true; // Ignora valores vazios (outros métodos já validam isso)
        const [startYear] = value.split('/'); // Extrai o ano inicial (ex: "2022" de "2022/2023")
        const parsedYear = parseInt(startYear, 10); // Converte o ano para número
        return parsedYear <= currentYear; // Verifica se o ano inicial não é maior que o ano atual
      }
    ),
  [Culture.DataSementeira]: yup
    .string()
    .required('Por favor indique a data de sementeira'),
  [Culture.DataColheita]: yup
    .string()
    .required('Por favor indique a data de colheita'),
});

export default validationSchema;
