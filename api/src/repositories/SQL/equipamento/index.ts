/* eslint-disable no-underscore-dangle */
import { Connection } from 'mysql2';

import { DwFazendaEquipamentos } from '../../NoSql/fazenda.repository';
import { formatDate } from '../utils';

export const CreateTableDwFazendaEquipamento = (connection: Connection) => {
  connection.query(
    'CREATE TABLE IF NOT EXISTS fazendaEquipamento (fazenda_id VARCHAR(255) , name_fazenda VARCHAR(255), fazenda_gestor VARCHAR(255), fazenda_distancia_estrada VARCHAR(255), fazenda_estrada_nacional VARCHAR(255), fazenda_county VARCHAR(255), fazenda_province VARCHAR(255), fazenda_extension DECIMAL(32,10), fazenda_area_corrigida DECIMAL(32,10), fazenda_latitude DECIMAL(32,10), fazenda_longitude DECIMAL(32,10), fazenda_createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, fazenda_updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, producer_bi VARCHAR(100), producer_nif VARCHAR(100), user_first_name VARCHAR(255), user_last_name VARCHAR(255), user_role VARCHAR(100), cooperative_name VARCHAR(255), cooperative_president VARCHAR(255), cooperative_county VARCHAR(255), cooperative_province VARCHAR(255), equipamento_name VARCHAR(255), equipamento_qtd INT(32), equipamento_createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, equipamento_updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
    err => {
      // eslint-disable-next-line no-console
      if (err) console.log('ERROR on fazendaEquipamento CREATE', err);
      // console.log('CREATED fazendaEquipamento TABLE');
    }
  );
};

export const insertINTOFazendaEquipamento = async (connection: Connection) => {
  const fazendas = await DwFazendaEquipamentos();

  fazendas.map(fazenda =>
    connection.query(
      `INSERT INTO fazendaEquipamento (fazenda_id,name_fazenda , fazenda_gestor , fazenda_distancia_estrada , fazenda_estrada_nacional , fazenda_county, fazenda_province, fazenda_extension, fazenda_area_corrigida, fazenda_latitude, fazenda_longitude, fazenda_createdAt, fazenda_updatedAt, producer_bi, producer_nif, user_first_name, user_last_name, user_role, cooperative_name, cooperative_president, cooperative_county, cooperative_province,  equipamento_name, equipamento_qtd, equipamento_createdAt, equipamento_updatedAt) VALUES ('${
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
      }', '${fazenda.cooperative.county.province.description}','${
        fazenda.equipamento.type.description
      }',  '${fazenda.equipamento.quantity}', '${formatDate(
        fazenda.equipamento.createdAt
      )}' , '${formatDate(fazenda.equipamento.updatedAt)}')`,
      err => {
        // eslint-disable-next-line no-console
        if (err) console.log('ERROR on fazendaEquipamento INSERT', err);

        // console.log('fazendaEquipamento INSERTED ');
      }
    )
  );
};

export const deleteAllFazendaEquipamento = (connection: Connection) => {
  connection.query('DELETE FROM fazendaEquipamento', err => {
    // eslint-disable-next-line no-console
    if (err) console.log('ERROR on fazendaEquipamento DELETE');
    // console.log('fazendaEquipamento DELETED');
  });
};
