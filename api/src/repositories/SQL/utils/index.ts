import { Connection } from 'mysql2';

// eslint-disable-next-line import/prefer-default-export
export const formatDate = (date: string): string =>
  new Date(date).toISOString().slice(0, 19).replace('T', ' ');

export const clearTable = (table: string, connection: Connection) => {
  connection.query(`DELETE FROM ${table}`, err => {
    // eslint-disable-next-line no-console
    if (err) console.log(`ERROR on ${table} DELETE`);
    // console.log(`${table} DELETED`);
  });
};
