import { Box, Tab, Tabs, Typography } from '@material-ui/core';
import React, { useState } from 'react';

import ErrorFail from '../../../../../../components/error-fail';
import AnimalTypeScreen from './animal';
import CultureTypeScreen from './culture-type';
import EquipamentoTypeScreen from './equipamento-type';
import HumanResourceTypeScreen from './human-resource';
import InfraestruturaTypeScreen from './infraestrutura';
import MachineTypeScreen from './machine-type';
import MeioEstacionarioTypeScreen from './meios-estacionario';

export default function SubEntities() {
  const [value, setValue] = useState<string>('culture');

  const handleChange = (_event: any, newValue: string) => {
    setValue(newValue);
  };

  const getSelectedView = (valueToShow: string) => {
    switch (valueToShow) {
      case 'culture':
        return <CultureTypeScreen />;

      case 'machines':
        return <MachineTypeScreen />;

      case 'infraestrutura':
        return <InfraestruturaTypeScreen />;

      case 'equipamentos':
        return <EquipamentoTypeScreen />;

      case 'animals':
        return <AnimalTypeScreen />;

      case 'human':
        return <HumanResourceTypeScreen />;

      case 'meios':
        return <MeioEstacionarioTypeScreen />;

      default:
        return <ErrorFail />;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" style={{ marginBottom: '32px' }}>
        Configuração de subentidades
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        variant="scrollable"
        aria-label="secondary tabs example"
        style={{
          backgroundColor: 'orange',
          color: 'white',
          borderRadius: '5px',
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
      >
        <Tab value="culture" label="Culturas" />
        <Tab value="machines" label="Máquinas" />
        <Tab value="equipamentos" label="Equipamentos" />
        <Tab value="meios" label="Meios estacionários" />
        <Tab value="infraestrutura" label="Infraestruturas" />
        <Tab value="animals" label="Animais" />
        <Tab value="human" label="Recursos humanos" />
      </Tabs>

      {getSelectedView(value)}
    </Box>
  );
}
