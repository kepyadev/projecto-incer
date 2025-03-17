/* eslint-disable no-underscore-dangle */

import { Connection } from 'mysql2';

import { DwFazendaAnimals } from '../../NoSql/fazenda.repository';
import { clearTable, formatDate } from '../utils';

export const CreateTableDwFazendaAnimal = (connection: Connection) => {
  connection.query(
    'CREATE TABLE IF NOT EXISTS fazendaAnimal (fazenda_id VARCHAR(255) , name_fazenda VARCHAR(255), fazenda_gestor VARCHAR(255), fazenda_distancia_estrada VARCHAR(255), fazenda_estrada_nacional VARCHAR(255), fazenda_county VARCHAR(255), fazenda_province VARCHAR(255), fazenda_extension DECIMAL(32,10), fazenda_area_corrigida DECIMAL(32,10), fazenda_latitude DECIMAL(32,10), fazenda_longitude DECIMAL(32,10), fazenda_createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, fazenda_updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, producer_bi VARCHAR(100), producer_nif VARCHAR(100), user_first_name VARCHAR(255), user_last_name VARCHAR(255), user_role VARCHAR(100), cooperative_name VARCHAR(255), cooperative_president VARCHAR(255), cooperative_county VARCHAR(255), cooperative_province VARCHAR(255), animal_name VARCHAR(255), animal_year_of_prodution INT(32), animal_annual_prodution INT(32), animal_matrizes INT(32), animal_effective_total INT(32), animal_egg INT(32), animal_is_ave BOOLEAN,   animal_createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, animal_updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
    err => {
      if (err) console.log('ERROR on fazendaMachine CREATE', err);
      // console.log('CREATED fazendaMachine TABLE ');
    }
  );
};

export const insertINTOFazendaAnimal = async (connection: Connection) => {
  const fazendas = await DwFazendaAnimals();

  fazendas.map(fazenda =>
    connection.query(
      `INSERT INTO fazendaAnimal (fazenda_id , name_fazenda , fazenda_gestor, fazenda_distancia_estrada , fazenda_estrada_nacional , fazenda_county , fazenda_province , fazenda_extension , fazenda_area_corrigida , fazenda_latitude , fazenda_longitude , fazenda_createdAt , fazenda_updatedAt , producer_bi , producer_nif , user_first_name , user_last_name , user_role , cooperative_name , cooperative_president , cooperative_county , cooperative_province , animal_name , animal_year_of_prodution , animal_annual_prodution , animal_matrizes , animal_effective_total, animal_egg, animal_is_ave, animal_createdAt , animal_updatedAt ) VALUES ('${
        fazenda._id
      }', '${fazenda.description}', '${fazenda.gerencia}', '${fazenda.distancia_estrada}', '${
        fazenda.estrada_nacional
      }', '${fazenda.county.description}', '${fazenda.province.description}', '${
        fazenda.extension
      }', '${fazenda.ground.area_corrigida}', '${fazenda.geo.latitude}', '${
        fazenda.geo.longitude
      }', '${formatDate(fazenda.createdAt)}', '${formatDate(fazenda.updatedAt)}', '${
        fazenda.producer.bi ?? '-'
      }', '${fazenda.producer.nif}', '${fazenda.user.first_name}', '${fazenda.user.last_name}', '${
        fazenda.user.role
      }', '${fazenda.cooperative.name}', '${fazenda.cooperative.president}', '${
        fazenda.cooperative.county.description
      }', '${fazenda.cooperative.county.province.description}', '${
        fazenda.animal.type.description
      }', '${fazenda.animal.year_of_prodution}', '${fazenda.animal.annual_prodution}','${
        fazenda.animal.matrizes
      }','${fazenda.animal.effective_total}','${fazenda.animal.egg ?? 0}', '${
        fazenda.animal.type.is_ave ? 1 : 0
      }','${formatDate(fazenda.animal.createdAt)}', '${formatDate(fazenda.animal.updatedAt)}')`,
      err => {
        if (err) console.log('ERROR on fazendaAnimal INSERT', err);
      }
    )
  );
};

export const deleteAllFazendaAnimal = async (connection: Connection) =>
  clearTable('fazendaAnimal', connection);
