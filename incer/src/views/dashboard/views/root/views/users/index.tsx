import React, { useState } from 'react';
import useSWR from 'swr';

import PdfMake from '../../../../../../adapter/pdf_export';
import GenericModal from '../../../../../../components/generic-modal';
import GenericTable from '../../../../../../components/generic-table';
import { SWR } from '../../../../../../constants/swr';
import { User } from '../../../../../../constants/user';
import { getAllUsers } from '../../../../../../services/users';
import CreateAdminView from './create';
import { cells, dataModifier } from './users.types';

const UsersView = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const { mutate } = useSWR(`${SWR.USERS}`, getAllUsers);

  return (
    <>
      <GenericModal
        title="Cadastrar Administrador"
        open={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
      >
        <CreateAdminView
          onClose={() => {
            setOpenCreateModal(false);
            mutate();
          }}
        />
      </GenericModal>
      <GenericTable
        fetcher={getAllUsers}
        primaryKey={User.Id}
        cells={cells}
        dataModifier={dataModifier}
        tableId={SWR.USERS}
        entityName="Utilizador"
        pdf={PdfMake}
        onCreate={() => setOpenCreateModal(true)}
      />
    </>
  );
};

export default UsersView;
