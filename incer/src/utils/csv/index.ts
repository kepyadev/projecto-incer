// eslint-disable-next-line import/prefer-default-export
export const processCSV = (str: string, delimiter: string = ',') => {
  const headers = str.slice(0, str.indexOf('\n')).split(delimiter);

  const rows = str.slice(str.indexOf('\n') + 1).split('\n');

  const validLines = removeEmptyLines(rows);

  const dataFinal = validLines.map(row => {
    const values = row.split(delimiter);
    const element = headers.reduce((obj: Record<string, unknown>, header, index) => {
      const value = values[index].replaceAll('\r', '');
      const newHeader = header.replaceAll('\r', '');
      obj[newHeader] = value;
      return obj;
    }, {});
    return element;
  });
  return dataFinal;
};

const removeEmptyLines = (data: string[]) => {
  return data.filter(line => line.length > 0);
};
