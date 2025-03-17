import { Box, Tab, Tabs } from '@material-ui/core';
import React, { FC, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ErrorFail from '../../../../../../../components/error-fail';
import { User } from '../../../../../../../constants/user';
import { AuthContext, AuthContextData } from '../../../../../../../context/auth';
import { UserRole } from '../../../../../../../types/user';
import AddNewProducerOnCooperativeTechnician from '../../../../technician/views/cooperatives/components/create-producer/new-producer';
import AddExistentProducer from './components/add-existent';
import AddNewProducer from './components/add-new';

interface ICreateProducer {
  modalHandleClose: () => void;
}
const CreateProducer: FC<ICreateProducer> = ({ modalHandleClose }) => {
  const { user } = useContext(AuthContext) as AuthContextData;
  const routes = useHistory().location.pathname.split('/');
  const id = routes[routes.length - 1];
  const [value, setValue] = useState<string>('new');
  const handleChange = (_event: any, newValue: string) => {
    setValue(newValue);
  };

  const getSelectedView = (valueToShow: string) => {
    switch (valueToShow) {
      case 'new':
        return user![User.Role] === UserRole.Technician ? (
          <AddNewProducerOnCooperativeTechnician
            cooperativeId={id}
            modalHandleClose={modalHandleClose}
          />
        ) : (
          <AddNewProducer modalHandleClose={modalHandleClose} />
        );

      // return <AddNewProducer />;

      case 'existent':
        return <AddExistentProducer modalHandleClose={modalHandleClose} />;

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

export default CreateProducer;
