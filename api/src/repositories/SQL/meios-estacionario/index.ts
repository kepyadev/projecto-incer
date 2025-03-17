/* eslint-disable no-underscore-dangle */
import { Connection } from 'mysql2';

import { DwFazendaMeioEstacionario } from '../../NoSql/fazenda.repository';
import { formatDate } from '../utils';

export const CreateTableDwFazendaMeioEstacionario = (connection: Connection) => {
  connection.query(
    'CREATE TABLE IF NOT EXISTS fazendaMeioEstacionario (fazenda_id VARCHAR(255) , name_fazenda VARCHAR(255), fazenda_gestor VARCHAR(255), fazenda_distancia_estrada VARCHAR(255), fazenda_estrada_nacional VARCHAR(255), fazenda_county VARCHAR(255), fazenda_province VARCHAR(255), fazenda_extension DECIMAL(32,10), fazenda_area_corrigida DECIMAL(32,10), fazenda_latitude DECIMAL(32,10), fazenda_longitude DECIMAL(32,10), fazenda_createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, fazenda_updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, producer_bi VARCHAR(100), producer_nif VARCHAR(100), user_first_name VARCHAR(255), user_last_name VARCHAR(255), user_role VARCHAR(100), cooperative_name VARCHAR(255), cooperative_president VARCHAR(255), cooperative_county VARCHAR(255), cooperative_province VARCHAR(255),meio_estacionario_name_id VARCHAR(255),  meio_estacionario_name VARCHAR(255), meio_estacionario_qtd INT(32), meio_estacionario_createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, meio_estacionario_updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
    err => {
      // eslint-disable-next-line no-console
      if (err) console.log('ERROR on fazendaMeioEstacionario CREATE', err);
      // console.log('CREATED fazendaMeioEstacionario TABLE');
    }
  );
};

export const insertINTOFazendaMeioEstacionario = async (connection: Connection) => {
  const fazendas = await DwFazendaMeioEstacionario();

  fazendas.map(fazenda =>
    connection.query(
      `INSERT INTO fazendaMeioEstacionario (fazenda_id,name_fazenda , fazenda_gestor , fazenda_distancia_estrada , fazenda_estrada_nacional , fazenda_county, fazenda_province, fazenda_extension, fazenda_area_corrigida, fazenda_latitude, fazenda_longitude, fazenda_createdAt, fazenda_updatedAt, producer_bi, producer_nif, user_first_name, user_last_name, user_role, cooperative_name, cooperative_president, cooperative_county, cooperative_province,meio_estacionario_name_id,  meio_estacionario_name, meio_estacionario_qtd, meio_estacionario_createdAt, meio_estacionario_updatedAt) VALUES ('${
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
        fazenda.meios_estacionario._id
      }','${fazenda.meios_estacionario.type.description}',  '${
        fazenda.meios_estacionario.quantity
      }', '${formatDate(fazenda.meios_estacionario.createdAt)}' , '${formatDate(
        fazenda.meios_estacionario.updatedAt
      )}')`,
      err => {
        // eslint-disable-next-line no-console
        if (err) console.log('ERROR on fazendaMeioEstacionario INSERT', err);

        // console.log('fazendaMeioEstacionario INSERTED ');
      }
    )
  );
};

export const deleteAllFazendaMeioEstacionario = (connection: Connection) => {
  connection.query('DELETE FROM fazendaMeioEstacionario', err => {
    // eslint-disable-next-line no-console
    if (err) console.log('ERROR on fazendaMeioEstacionario DELETE');
    // console.log('fazendaMeioEstacionario DELETED');
  });
};
