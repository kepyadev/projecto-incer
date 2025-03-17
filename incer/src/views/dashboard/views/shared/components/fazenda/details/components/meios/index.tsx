import React, { FC, useContext, useState } from 'react';
import useSWR from 'swr';

import GenericModal from '../../../../../../../../../components/generic-modal';
import GenericTable from '../../../../../../../../../components/generic-table';
import { MeioEstacionario } from '../../../../../../../../../constants/sub-entites';
import { SWR } from '../../../../../../../../../constants/swr';
import { User } from '../../../../../../../../../constants/user';
import {
  AuthContext,
  AuthContextData,
} from '../../../../../../../../../context/auth';
import { getMeioEstacionarioByFazenda } from '../../../../../../../../../services/meio-estacionario';
import { UserRole } from '../../../../../../../../../types/user';
import CreateMeiosEstacionarios from './create';
import {
  cells,
  dataModifier,
  MeiosEstacionariosProps,
} from './meios-estacionarios.types';

const MeiosEstacionarioView: FC<MeiosEstacionariosProps> = ({ fazendaId }) => {
  const { mutate } = useSWR(`${SWR.MEIO_ESTACIONARIO}/fazenda/${fazendaId}`);

  const [openModal, setOpenModal] = useState(false);
  const { user } = useContext(AuthContext) as AuthContextData;
  const isAdmin: boolean = !user || user[User.Role] === UserRole.Admin;

  const onCreate = isAdmin
    ? undefined
    : () => {
        setOpenModal(true);
      };
  return (
    <>
      <GenericModal
        title="Cadastrar Meios estacionários"
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <CreateMeiosEstacionarios
          fazendaId={fazendaId}
          onClose={() => {
            setOpenModal(false);
            mutate();
          }}
        />
      </GenericModal>{' '}
      <GenericTable
        tableId={`${SWR.MEIO_ESTACIONARIO}/fazenda/${fazendaId}`}
        primaryKey={MeioEstacionario.Id}
        fetcher={getMeioEstacionarioByFazenda(fazendaId)}
        cells={cells}
        entityName="Meios Estacionários"
        title="Meios estacionários"
        onCreate={onCreate}
        dataModifier={dataModifier}
      />
    </>
  );
};
export default MeiosEstacionarioView;
