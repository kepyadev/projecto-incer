import { TextField } from '@material-ui/core';
import React from 'react';

const YearAgriculturalField = ({ register, errors, setValue }: any) => {
  const currentYear = new Date().getFullYear();

  const handleYearInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove caracteres não-numéricos
    let formattedValue = '';

    if (value.length <= 4) {
      formattedValue = value; // Permite digitar o primeiro ano
    } else if (value.length <= 8) {
      formattedValue = `${value.substring(0, 4)}-${value.substring(4)}`; // Formata como YYYY-YYYY
    } else {
      formattedValue = value.substring(0, 9); // Limita o comprimento total
    }

    e.target.value = formattedValue;
    setValue('agriculturalYear', formattedValue); // Atualiza o valor no registro
  };

  const validateAgriculturalYear = (value: string) => {
    if (!value) return 'O ano agrícola é obrigatório';

    const match = value.match(/^(\d{4})-(\d{4})$/);
    if (!match) return 'O formato deve ser YYYY-YYYY';

    const [_, startYear, endYear] = match.map(Number);
    if (startYear < currentYear)
      return `O ano inicial deve ser ${currentYear} ou superior`;
    if (endYear <= startYear) return 'O ano final deve ser maior que o ano inicial';

    return true;
  };

  register('agriculturalYear', {
    validate: validateAgriculturalYear,
  });

  return (
    <TextField
      variant="outlined"
      fullWidth
      label="Ano agrícola"
      name="agriculturalYear"
      inputRef={register()}
      error={!!errors.agriculturalYear}
      helperText={errors.agriculturalYear?.message}
      type="text"
      required
      autoComplete="off"
      onChange={handleYearInput}
      InputLabelProps={{ shrink: true }}
      placeholder="Exemplo: 2024-2025"
    />
  );
};

export default YearAgriculturalField;
