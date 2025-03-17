import React, { FC, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';

import GenericModal from '../../../../../../../../../components/generic-modal';
import GenericTable from '../../../../../../../../../components/generic-table';
import NotData from '../../../../../../../../../components/not-data';
import { Culture } from '../../../../../../../../../constants/entities';
import { SWR } from '../../../../../../../../../constants/swr';
import { User } from '../../../../../../../../../constants/user';
import {
  AuthContext,
  AuthContextData,
} from '../../../../../../../../../context/auth';
import { getCultureByFazenda } from '../../../../../../../../../services/culture';
import { UserRole } from '../../../../../../../../../types/user';
import CreateCultura from './create';
import { cells, CulturasProp, dataModifier } from './culturas.types';

const Culturas: FC<CulturasProp> = ({ cooperativeId }) => {
  const routes = useHistory().location.pathname.split('/');
  const [openModal, setOpenModal] = useState(false);
  const id = routes[routes.length - 1];

  const modalHandleClose = () => setOpenModal(false);
  const { mutate } = useSWR(
    `${SWR.CULTURAS_FAZENDA}/${id}`,
    getCultureByFazenda(id)
  );

  const { user } = useContext(AuthContext) as AuthContextData;

  const isAdmin: boolean = !user || user[User.Role] === UserRole.Admin;

  const onCreate = isAdmin
    ? undefined
    : () => {
        setOpenModal(true);
      };

  if (!id) return <NotData />;
  return (
    <>
      {onCreate && (
        <GenericModal
          open={openModal}
          title="Cadastrar Cultura"
          onClose={() => {
            setOpenModal(false);
          }}
        >
          <CreateCultura
            fazendaId={id}
            modalHandleClose={() => {
              modalHandleClose();
              mutate();
            }}
            cooperativeId={cooperativeId}
          />
        </GenericModal>
      )}
      <GenericTable
        tableId={`${SWR.CULTURAS_FAZENDA}/${id}`}
        entityName="Culturas"
        primaryKey={Culture.Id}
        fetcher={getCultureByFazenda(id)}
        cells={cells}
        dataModifier={dataModifier}
        title="Culturas"
        onCreate={onCreate}
      />
    </>
  );
};

export default Culturas;
