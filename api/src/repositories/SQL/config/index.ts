import mysql, { Connection } from 'mysql2';

import { CreateTableDwFazendaAnimal } from '../animal';
import { CreateTableDwFazendaCulture } from '../culture';
import { CreateTableDwFazendaEquipamento } from '../equipamento';
import { CreateTableDwFazendas } from '../fazenda';
import { CreateTableDwFazendaHumanResource } from '../human-resource';
import { CreateTableDwFazendaInfrastructure } from '../infraestructure';
import { CreateTableDwFazendaMachine } from '../machine';
import { CreateTableDwFazendaMeioEstacionario } from '../meios-estacionario';
import { createTableDwUser } from '../user';

const useIncerDatabase = (connection: Connection) => {
  try {
    connection.query(`USE ${process.env.MYSQL_DB}`);
    // eslint-disable-next-line no-console
    console.log('USING incer DATABASE');
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('USE ERROR on use incer DATABASE', error.sqlMessage);
  }
};

export const createDatabase = (connection: Connection) => {
  try {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DB}`);
    // eslint-disable-next-line no-console
    console.log(`CREATE database ${process.env.MYSQL_DB}`);
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log(`ERROR on database ${process.env.MYSQL_DB} CREATE`, error.sqlMessage);
  }
};

const createTables = (connection: Connection) => {
  CreateTableDwFazendas(connection);
  CreateTableDwFazendaMachine(connection);
  createTableDwUser(connection);
  CreateTableDwFazendaMeioEstacionario(connection);
  CreateTableDwFazendaEquipamento(connection);
  CreateTableDwFazendaHumanResource(connection);
  CreateTableDwFazendaInfrastructure(connection);
  CreateTableDwFazendaCulture(connection);
  CreateTableDwFazendaAnimal(connection);
};

export const connectMysql = async () => {
  const con = mysql.createConnection({
    port: process.env.MYSQL_PORT as any,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
  });

  // eslint-disable-next-line no-console
  console.log('HOST', process.env.MYSQL_HOST);
  await con.connect();

  createDatabase(con);
  useIncerDatabase(con);
  createTables(con);
  return con;
};
