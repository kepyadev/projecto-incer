import { Box, Tab, Tabs } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ErrorFail from '../../../../../../../../components/error-fail';
import AddNewProducerOnCooperativeTechnician from './new-producer';
import AddExistentProducerTechnician from './old-producer';

interface ICreateProducerTechnicianProps {
  modalHandleClose: () => void;
}
const CreateProducerTechnician: FC<ICreateProducerTechnicianProps> = ({
  modalHandleClose,
}) => {
  const [value, setValue] = useState<string>('new');
  const handleChange = (_event: any, newValue: string) => {
    setValue(newValue);
  };
  const routes = useHistory().location.pathname.split('/');
  const id = routes[routes.length - 1];

  const getSelectedView = (valueToShow: string) => {
    switch (valueToShow) {
      case 'new':
        return (
          <AddNewProducerOnCooperativeTechnician
            cooperativeId={id}
            modalHandleClose={modalHandleClose}
          />
        );

      case 'existent':
        return <AddExistentProducerTechnician modalHandleClose={modalHandleClose} />;

      default:
        return <ErrorFail />;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        variant="fullWidth"
        aria-label="secondary tabs example"
        style={{
          backgroundColor: 'orange',
          color: 'white',
          borderRadius: '5px',
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
      >
        <Tab value="new" label="Novo" />
        <Tab value="existent" label="Existente" />
      </Tabs>
      {getSelectedView(value)}
    </Box>
  );
};

export default CreateProducerTechnician;
