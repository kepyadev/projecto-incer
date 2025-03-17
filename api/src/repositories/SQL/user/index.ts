/* eslint-disable no-underscore-dangle */
import { Connection } from 'mysql2';

import { DwUserCooperativeCountyProvince } from '../../NoSql/user.repository';
import { formatDate } from '../utils';

export const createTableDwUser = (connection: Connection) => {
  connection.query(
    ' CREATE TABLE IF NOT EXISTS user (idUser VARCHAR(255) ,name VARCHAR(255),phone VARCHAR(12), email VARCHAR(255), county VARCHAR(255), province VARCHAR(255), createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, role VARCHAR(255))',
    err => {
      if (err) console.log('ERROR ON user CREATE', err);
      // console.log('CREATED userToCooperativeToCountyToProvinceToCountry TABLE ');
    }
  );
};

const getRoleInPortuguese = (role: string) => {
  switch (role) {
    case 'producer':
      return 'Produtor';

    case 'technician':
      return 'Técnico';

    case 'cooperative':
      return 'Cooperativa';

    default:
      return 'Outro usuario';
  }
};
export const insertINTOUser = async (connection: Connection) => {
  const users = await DwUserCooperativeCountyProvince();

  users.map(user =>
    connection.query(
      `INSERT INTO user ( idUSer, name, phone, email, province, county,createdAt, role) VALUES ('${
        user._id
      }', '${user.first_name} ${user.last_name}', '${user.phone_number}', '${user.email}','${
        user.province.description
      }', '${user.county.description}','${formatDate(user.createdAt)}','${getRoleInPortuguese(
        user.role
      )}')`,
      err => {
        if (err) console.log('ERROR on user INSERT', err);
        // console.log('userToCooperativeToCountyToProvinceToCountry INSERTED');
      }
    )
  );
};

export const deleteAllUser = (connection: Connection) => {
  connection.query('DELETE FROM user', err => {
    if (err) console.log('ERROR on user DELETE');
    // console.log('userToCooperativeToCountyToProvinceToCountry DELETED');
  });
};
