import React, { FC, useContext, useState } from 'react';
import useSWR from 'swr';

import GenericModal from '../../../../../../../../../components/generic-modal';
import GenericTable from '../../../../../../../../../components/generic-table';
import { Infraestrutura } from '../../../../../../../../../constants/sub-entites';
import { SWR } from '../../../../../../../../../constants/swr';
import { User } from '../../../../../../../../../constants/user';
import {
  AuthContext,
  AuthContextData,
} from '../../../../../../../../../context/auth';
import { getInfraestruturaByFazenda } from '../../../../../../../../../services/infraestruturas';
import { UserRole } from '../../../../../../../../../types/user';
import CreateInfraestrutura from './create';
import { cells, dataModifier, InfraestruturaProps } from './infraestruturas.types';

const InfraestruturaView: FC<InfraestruturaProps> = ({ fazendaId }) => {
  const [open, setOpen] = useState(false);

  const { mutate } = useSWR(`${SWR.INFRAESTRUTURA}/${fazendaId}`);

  const { user } = useContext(AuthContext) as AuthContextData;

  const onCreate =
    !user || user[User.Role] === UserRole.Admin
      ? undefined
      : () => {
          setOpen(true);
        };

  return (
    <>
      <GenericModal
        title="Cadastrar Infraestrutura"
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <CreateInfraestrutura
          fazendaId={fazendaId}
          onClose={() => {
            setOpen(false);
            mutate();
          }}
        />
      </GenericModal>

      <GenericTable
        tableId={`${SWR.INFRAESTRUTURA}/${fazendaId}`}
        primaryKey={Infraestrutura.Id}
        cells={cells}
        entityName="Infraestruturas"
        fetcher={getInfraestruturaByFazenda(fazendaId)}
        onCreate={onCreate}
        dataModifier={dataModifier}
        title="Infraestruturas"
      />
    </>
  );
};

export default InfraestruturaView;
