/* eslint-disable no-underscore-dangle */
import { Connection } from 'mysql2';

import { DwFazendaHumanResource } from '../../NoSql/fazenda.repository';
import { formatDate } from '../utils';

export const CreateTableDwFazendaHumanResource = (connection: Connection) => {
  connection.query(
    'CREATE TABLE IF NOT EXISTS fazendaHumanResource (fazenda_id VARCHAR(255) , name_fazenda VARCHAR(255), fazenda_gestor VARCHAR(255), fazenda_distancia_estrada VARCHAR(255), fazenda_estrada_nacional VARCHAR(255), fazenda_county VARCHAR(255), fazenda_province VARCHAR(255), fazenda_extension DECIMAL(32,10), fazenda_area_corrigida DECIMAL(32,10), fazenda_latitude DECIMAL(32,10), fazenda_longitude DECIMAL(32,10), fazenda_createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, fazenda_updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, producer_bi VARCHAR(100), producer_nif VARCHAR(100), user_first_name VARCHAR(255), user_last_name VARCHAR(255), user_role VARCHAR(100), cooperative_name VARCHAR(255), cooperative_president VARCHAR(255), cooperative_county VARCHAR(255), cooperative_province VARCHAR(255),human_resource_id VARCHAR(255), human_resource_name VARCHAR(255), human_resource_qtd INT(32), human_resource_createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, human_resource_updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
    err => {
      // eslint-disable-next-line no-console
      if (err) console.log('ERROR on fazendaHumanResource CREATE', err);
      // console.log('CREATED fazendaHumanResource TABLE');
    }
  );
};

export const insertINTOFazendaHumanResource = async (connection: Connection) => {
  const fazendas = await DwFazendaHumanResource();

  fazendas.map(fazenda =>
    connection.query(
      `INSERT INTO fazendaHumanResource (fazenda_id,name_fazenda , fazenda_gestor , fazenda_distancia_estrada , fazenda_estrada_nacional , fazenda_county, fazenda_province, fazenda_extension, fazenda_area_corrigida, fazenda_latitude, fazenda_longitude, fazenda_createdAt, fazenda_updatedAt, producer_bi, producer_nif, user_first_name, user_last_name, user_role, cooperative_name, cooperative_president, cooperative_county, cooperative_province,human_resource_id,  human_resource_name, human_resource_qtd, human_resource_createdAt, human_resource_updatedAt) VALUES ('${
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
      }', '${fazenda.cooperative.county.province.description}','${fazenda.human_resource._id}', '${
        fazenda.human_resource.type.description
      }',  '${fazenda.human_resource.quantity}', '${formatDate(
        fazenda.human_resource.createdAt
      )}' , '${formatDate(fazenda.human_resource.updatedAt)}')`,
      err => {
        // eslint-disable-next-line no-console
        if (err) console.log('ERROR on fazendaHumanResource INSERT', err);

        // console.log('fazendaHumanResource INSERTED');
      }
    )
  );
};

export const deleteAllFazendaHumanResource = (connection: Connection) => {
  connection.query('DELETE FROM fazendaHumanResource', err => {
    // eslint-disable-next-line no-console
    if (err) console.log('ERROR on fazendaHumanResource DELETE');
    // console.log('fazendaHumanResource DELETED');
  });
};
