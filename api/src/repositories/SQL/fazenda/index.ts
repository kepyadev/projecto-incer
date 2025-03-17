/* eslint-disable no-underscore-dangle */
import { Connection } from 'mysql2';

import { DwFazendaProducerCooperativeCountyProvinceMachineCulture } from '../../NoSql/fazenda.repository';
import { formatDate } from '../utils/index';

export const CreateTableDwFazendas = (connection: Connection) => {
  connection.query(
    'CREATE TABLE IF NOT EXISTS fazendaProducersCooperativeCountyProvinceCultura (fazenda_id VARCHAR(255) , name_fazenda VARCHAR(255), fazenda_gestor VARCHAR(255), fazenda_distancia_estrada VARCHAR(255), fazenda_estrada_nacional VARCHAR(255), fazenda_county VARCHAR(255), fazenda_province VARCHAR(255), fazenda_extension DECIMAL(32,10), fazenda_area_corrigida DECIMAL(32,10), fazenda_latitude DECIMAL(32,10), fazenda_longitude DECIMAL(32,10), fazenda_createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, fazenda_updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, producer_bi VARCHAR(100), producer_nif VARCHAR(100), user_first_name VARCHAR(255), user_last_name VARCHAR(255), user_role VARCHAR(100), cooperative_name VARCHAR(255), cooperative_president VARCHAR(255), cooperative_county VARCHAR(255), cooperative_province VARCHAR(255), cultura_name VARCHAR(255), cultura_area DECIMAL(32,10), cultura_producao DECIMAL(32,12), cultura_plantio TIMESTAMP DEFAULT CURRENT_TIMESTAMP, cultura_colheita TIMESTAMP DEFAULT CURRENT_TIMESTAMP, cultura_createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, cultura_updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
    err => {
      if (err)
        // eslint-disable-next-line no-console
        console.log('ERROR on fazendaProducersCooperativeCountyProvinceMachineCultura CREATE', err);
      // console.log('CREATED fazendaProducersCooperativeCountyProvinceMachineCultura TABLE');
    }
  );
};

export const insertINTOFazendaProducerCooperativeProvinceCountyMachineCulture = async (
  connection: Connection
) => {
  const fazendas = await DwFazendaProducerCooperativeCountyProvinceMachineCulture();

  fazendas.map(fazenda =>
    connection.query(
      `INSERT INTO fazendaProducersCooperativeCountyProvinceCultura (fazenda_id,name_fazenda , fazenda_gestor , fazenda_distancia_estrada , fazenda_estrada_nacional , fazenda_county, fazenda_province, fazenda_extension, fazenda_area_corrigida, fazenda_latitude, fazenda_longitude, fazenda_createdAt, fazenda_updatedAt, producer_bi, producer_nif, user_first_name, user_last_name, user_role, cooperative_name, cooperative_president, cooperative_county, cooperative_province, cultura_name, cultura_area, cultura_producao, cultura_plantio, cultura_colheita , cultura_createdAt , cultura_updatedAt) VALUES ('${
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
        fazenda.cultura.type.description
      }', '${fazenda.cultura.area}', '${fazenda.cultura.quantity}','${formatDate(
        fazenda.cultura.data_sementeira
      )}', '${formatDate(fazenda.cultura.data_colheita)}', '${formatDate(
        fazenda.cultura.createdAt
      )}' , '${formatDate(fazenda.cultura.updatedAt)}')`,
      err => {
        if (err)
          // eslint-disable-next-line no-console
          console.log(
            'ERROR on fazendaProducersCooperativeCountyProvinceMachineCultura INSERT',
            err
          );

        // console.log('fazendaProducersCooperativeCountyProvinceMachineCultura INSERTED ');
      }
    )
  );
};

export const deleteAllFazendaProducerCooperativeProvinceCountyMachineCulture = (
  connection: Connection
) => {
  connection.query('DELETE FROM fazendaProducersCooperativeCountyProvinceMachineCultura', err => {
    // eslint-disable-next-line no-console
    if (err) console.log('ERROR on fazendaProducersCooperativeCountyProvinceMachineCultura DELETE');
    // console.log('fazendaProducersCooperativeCountyProvinceMachineCultura DELETED');
  });
};
