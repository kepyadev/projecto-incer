import React, { FC, useContext, useState } from 'react';
import useSWR from 'swr';

import GenericModal from '../../../../../../../../../components/generic-modal';
import GenericTable from '../../../../../../../../../components/generic-table';
import { ICell } from '../../../../../../../../../components/generic-table/table.types';
import { HumanResource } from '../../../../../../../../../constants/sub-entites';
import { SWR } from '../../../../../../../../../constants/swr';
import { User } from '../../../../../../../../../constants/user';
import {
  AuthContext,
  AuthContextData,
} from '../../../../../../../../../context/auth';
import { getHumanResourceByFazenda } from '../../../../../../../../../services/human-resource';
import { UserRole } from '../../../../../../../../../types/user';
import CreateHumanResource from './create';
import { humanResourceModifier, HumanResourceProps } from './human-resource.types';

const HumanResourceView: FC<HumanResourceProps> = ({ fazendaId }) => {
  const [openModal, setOpenModal] = useState(false);
  const cells: ICell[] = [
    { id: HumanResource.Type, label: 'Categoria', numeric: false },
    { id: HumanResource.Quantity, label: 'Quantidade', numeric: false },
  ];

  const { mutate } = useSWR(`${SWR.HUMAN_RESOURCE}/fazenda/${fazendaId}`);

  const { user } = useContext(AuthContext) as AuthContextData;

  const onCreate =
    !user || user[User.Role] === UserRole.Admin
      ? undefined
      : () => {
          setOpenModal(true);
        };

  return (
    <>
      <GenericModal
        title="Cadastrar Recursos Humanos"
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <CreateHumanResource
          fazendaId={fazendaId}
          onClose={() => {
            setOpenModal(false);
            mutate();
          }}
        />
      </GenericModal>{' '}
      <GenericTable
        tableId={`${SWR.HUMAN_RESOURCE}/fazenda/${fazendaId}`}
        fetcher={getHumanResourceByFazenda(fazendaId)}
        primaryKey={HumanResource.Id}
        title="Recursos Humanos"
        dataModifier={humanResourceModifier}
        entityName="Recursos Humanos"
        cells={cells}
        onCreate={onCreate}
      />
    </>
  );
};

export default HumanResourceView;
