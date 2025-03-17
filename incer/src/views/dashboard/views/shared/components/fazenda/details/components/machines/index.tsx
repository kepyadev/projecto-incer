import React, { FC, useContext, useState } from 'react';
import useSWR from 'swr';

import GenericModal from '../../../../../../../../../components/generic-modal';
import GenericTable from '../../../../../../../../../components/generic-table';
import {
  Equipamento,
  Machine,
} from '../../../../../../../../../constants/sub-entites';
import { SWR } from '../../../../../../../../../constants/swr';
import { User } from '../../../../../../../../../constants/user';
import {
  AuthContext,
  AuthContextData,
} from '../../../../../../../../../context/auth';
import { getEquipamentoByFazenda } from '../../../../../../../../../services/equipamento';
import { getMachineByFazenda } from '../../../../../../../../../services/machine';
import { UserRole } from '../../../../../../../../../types/user';
import CreateMachine from './create';
import CreateEquipamento from './createEquipamentos';
import {
  cells,
  cellsEquipamentos,
  equipamentoModifier,
  machineModifier,
  MachineProps,
} from './machine.types';

const Machines: FC<MachineProps> = ({ fazendaId }) => {
  const [openMachineModal, setOpenMachineModal] = useState(false);
  const [openEquipamentoModal, setOpenEquipamentoModal] = useState(false);

  const { mutate: mutateMachine } = useSWR(`${SWR.MACHINE}/fazenda/${fazendaId}`);
  const { mutate: mutateEquipment } = useSWR(
    `${SWR.EQUIPAMENTO}/fazenda/${fazendaId}`
  );
  const { user } = useContext(AuthContext) as AuthContextData;
  const isAdmin: boolean = !user || user[User.Role] === UserRole.Admin;
  const onCreateMachine = isAdmin
    ? undefined
    : () => {
        setOpenMachineModal(true);
      };

  const onCreateEquipamento = isAdmin
    ? undefined
    : () => {
        setOpenEquipamentoModal(true);
      };

  return (
    <>
      <GenericModal
        title="Cadastrar Máquina"
        open={openMachineModal}
        onClose={() => {
          setOpenMachineModal(false);
        }}
      >
        <CreateMachine
          fazendaId={fazendaId}
          onClose={() => {
            setOpenMachineModal(false);
            mutateMachine();
          }}
        />
      </GenericModal>{' '}
      <GenericModal
        title="Cadastrar Equipamento"
        open={openEquipamentoModal}
        onClose={() => {
          setOpenEquipamentoModal(false);
        }}
      >
        <CreateEquipamento
          fazendaId={fazendaId}
          onClose={() => {
            setOpenEquipamentoModal(false);
            mutateEquipment();
          }}
        />
      </GenericModal>
      <GenericTable
        primaryKey={Machine.Id}
        fetcher={getMachineByFazenda(fazendaId)}
        tableId={`${SWR.MACHINE}/fazenda/${fazendaId}`}
        cells={cells}
        entityName="Máquinas e Equipamentos"
        dataModifier={machineModifier}
        title="Máquinas"
        onCreate={onCreateMachine}
        height="100%"
      />
      <GenericTable
        tableId={`${SWR.EQUIPAMENTO}/fazenda/${fazendaId}`}
        primaryKey={Equipamento.Id}
        fetcher={getEquipamentoByFazenda(fazendaId)}
        cells={cellsEquipamentos}
        entityName="Máquinas e Equipamentos"
        dataModifier={equipamentoModifier}
        height="100%"
        title="Equipamentos"
        onCreate={onCreateEquipamento}
      />
    </>
  );
};
export default Machines;
