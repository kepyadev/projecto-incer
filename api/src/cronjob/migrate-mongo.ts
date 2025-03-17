/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import { Connection } from 'mysql2';
import * as schedule from 'node-schedule';

import { deleteAllFazendaAnimal, insertINTOFazendaAnimal } from '../repositories/SQL/animal';
import { connectMysql } from '../repositories/SQL/config';
import { deleteAllFazendaCulture, insertINTOFazendaCulture } from '../repositories/SQL/culture';
import {
  deleteAllFazendaEquipamento,
  insertINTOFazendaEquipamento,
} from '../repositories/SQL/equipamento';
import { insertINTOFazendaProducerCooperativeProvinceCountyMachineCulture } from '../repositories/SQL/fazenda';
import {
  deleteAllFazendaHumanResource,
  insertINTOFazendaHumanResource,
} from '../repositories/SQL/human-resource';
import {
  deleteAllFazendaInfrastructure,
  insertINTOFazendaInfrastructure,
} from '../repositories/SQL/infraestructure';
import { deleteAllFazendaMachine, insertINTOFazendaMachine } from '../repositories/SQL/machine';
import { insertINTOFazendaMeioEstacionario } from '../repositories/SQL/meios-estacionario';
import { deleteAllUser, insertINTOUser } from '../repositories/SQL/user';

const deleteAll = async (connection: Connection) => {
  // await deleteAllFazendaProducerCooperativeProvinceCountyMachineCulture(connection);
  await deleteAllUser(connection);
  await deleteAllFazendaMachine(connection);
  await deleteAllFazendaHumanResource(connection);
  await deleteAllFazendaInfrastructure(connection);
  await deleteAllFazendaEquipamento(connection);
  await deleteAllFazendaAnimal(connection);
  await deleteAllFazendaCulture(connection);
};

const insertAll = async (connection: Connection) => {
  await insertINTOFazendaProducerCooperativeProvinceCountyMachineCulture(connection);
  await insertINTOUser(connection);
  await insertINTOFazendaMachine(connection);
  await insertINTOFazendaMeioEstacionario(connection);
  await insertINTOFazendaEquipamento(connection);
  await insertINTOFazendaHumanResource(connection);
  await insertINTOFazendaInfrastructure(connection);
  await insertINTOFazendaAnimal(connection);
  await insertINTOFazendaCulture(connection);

  console.log(
    '-------------------------------------------------------------------------------------'
  );
  console.log(
    '--------------------------------------DW UPDATED-------------------------------------'
  );
  console.log(
    '-------------------------------------------------------------------------------------'
  );
};

const updateDataWareHouseDataBase = async (connection: Connection) => {
  deleteAll(connection);

  insertAll(connection);
};

class MigrateJob {
  count: number;

  constructor() {
    this.count = 0;
  }

  async execute() {
    try {
      const connection = await connectMysql();

      schedule.scheduleJob('1 * * * * *', async () => {
        await updateDataWareHouseDataBase(connection);
        this.count += 1;
        console.log(`SCHEDULE EXECUTION TIMES: ${this.count}`);
      });
    } catch (error) {
      console.log('MYSQL', error);
      console.log('Lamentamos, nao foi possivel conectar ao MySql');
    }
  }

  // async stop() {
  //   if (this.scheduleJob !== null) this.scheduleJob.cancel();
  //   if (this.connection !== null) this.connection.destroy();
  // }
}

export default new MigrateJob();
