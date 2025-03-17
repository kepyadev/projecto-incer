import React from 'react';

import GenericTable from '../../../../../../components/generic-table';
import { SWR } from '../../../../../../constants/swr';
import { User } from '../../../../../../constants/user';
import { getAllUsers } from '../../../../../../services/users';
import { cells, dataModifier } from './users.types';

const UsersView = () => {
  return (
    <>
      <GenericTable
        fetcher={getAllUsers}
        primaryKey={User.Id}
        cells={cells}
        dataModifier={dataModifier}
        tableId={SWR.USERS}
        entityName="Utilizador"
      />
      ;
    </>
  );
};

export default UsersView;
