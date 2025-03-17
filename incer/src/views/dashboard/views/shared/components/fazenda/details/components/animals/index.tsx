import React, { FC, useContext, useState } from 'react';
import useSWR from 'swr';

import GenericModal from '../../../../../../../../../components/generic-modal';
import GenericTable from '../../../../../../../../../components/generic-table';
import { Animal } from '../../../../../../../../../constants/sub-entites';
import { SWR } from '../../../../../../../../../constants/swr';
import { User } from '../../../../../../../../../constants/user';
import {
  AuthContext,
  AuthContextData,
} from '../../../../../../../../../context/auth';
import { getAnimalByFazenda } from '../../../../../../../../../services/animals-type';
import { UserRole } from '../../../../../../../../../types/user';
import { animalModifier, AnimalsProps, cells } from './animals.types';
import CreateAnimal from './create';

const Animails: FC<AnimalsProps> = ({ fazendaId }) => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext) as AuthContextData;

  const { mutate } = useSWR(`${SWR.ANIMAL}/fazenda/${fazendaId}`);

  const onCreate =
    !user || user[User.Role] === UserRole.Admin
      ? undefined
      : () => {
          setOpen(true);
        };
  return (
    <>
      <GenericModal
        title="Cadastrar Animal"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <CreateAnimal
          fazendaId={fazendaId}
          onClose={() => {
            setOpen(false);
            mutate();
          }}
        />
      </GenericModal>

      <GenericTable
        tableId={`${SWR.ANIMAL}/fazenda/${fazendaId}`}
        cells={cells}
        primaryKey={Animal.Id}
        fetcher={getAnimalByFazenda(fazendaId)}
        dataModifier={animalModifier}
        entityName="Animais"
        onCreate={onCreate}
        title="Animais"
      />
    </>
  );
};

export default Animails;
