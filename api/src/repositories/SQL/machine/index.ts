/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import { Connection } from 'mysql2';

import { DwFazendaMachine } from '../../NoSql/fazenda.repository';
import { formatDate } from '../utils';

export const CreateTableDwFazendaMachine = (connection: Connection) => {
  connection.query(
    'CREATE TABLE IF NOT EXISTS fazendaMachine (fazenda_id VARCHAR(255) , name_fazenda VARCHAR(255), fazenda_gestor VARCHAR(255), fazenda_distancia_estrada VARCHAR(255), fazenda_estrada_nacional VARCHAR(255), fazenda_county VARCHAR(255), fazenda_province VARCHAR(255), fazenda_extension DECIMAL(32,10), fazenda_area_corrigida DECIMAL(32,10), fazenda_latitude DECIMAL(32,10), fazenda_longitude DECIMAL(32,10), fazenda_createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, fazenda_updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, producer_bi VARCHAR(100), producer_nif VARCHAR(100), user_first_name VARCHAR(255), user_last_name VARCHAR(255), user_role VARCHAR(100), cooperative_name VARCHAR(255), cooperative_president VARCHAR(255), cooperative_county VARCHAR(255), cooperative_province VARCHAR(255),machine_id VARCHAR(255), machine_name VARCHAR(255), machine_qdt INT(32), machine_power VARCHAR(255), machine_createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, machine_updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
    err => {
      if (err) console.log('ERROR on fazendaMachine CREATE', err);
      // console.log('CREATED fazendaMachine TABLE');
    }
  );
};

export const insertINTOFazendaMachine = async (connection: Connection) => {
  const fazendas = await DwFazendaMachine();

  fazendas.map(fazenda =>
    connection.query(
      `INSERT INTO fazendaMachine (fazenda_id,name_fazenda , fazenda_gestor , fazenda_distancia_estrada , fazenda_estrada_nacional , fazenda_county, fazenda_province, fazenda_extension, fazenda_area_corrigida, fazenda_latitude, fazenda_longitude, fazenda_createdAt, fazenda_updatedAt, producer_bi, producer_nif, user_first_name, user_last_name, user_role, cooperative_name, cooperative_president, cooperative_county, cooperative_province,machine_id, machine_name, machine_qdt, machine_power, machine_createdAt, machine_updatedAt) VALUES ('${
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
      }', '${fazenda.cooperative.county.province.description}','${fazenda.machine._id}', '${
        fazenda.machine.type.description
      }',  '${fazenda.machine.quantity}', '${fazenda.machine.power.value} ${
        fazenda.machine.power.unity
      }',  '${formatDate(fazenda.machine.createdAt)}' , '${formatDate(
        fazenda.machine.updatedAt
      )}')`,
      err => {
        if (err) console.log('ERROR on fazendaMachine INSERT', err);

        // console.log('fazendaMachine INSERTED ');
      }
    )
  );
};

export const deleteAllFazendaMachine = (connection: Connection) => {
  connection.query('DELETE FROM fazendaMachine', err => {
    if (err) console.log('ERROR on fazendaMachine DELETE');
    // console.log('fazendaMachine DELETED');
  });
};
