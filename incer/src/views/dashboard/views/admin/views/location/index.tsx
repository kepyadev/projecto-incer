import { Box, Button, Tab, Tabs, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import GenericModal from '../../../../../../components/generic-modal';
import GenericTable from '../../../../../../components/generic-table';
import { County, Province } from '../../../../../../constants/entities';
import { SWR } from '../../../../../../constants/swr';
import { getAllCounties } from '../../../../../../services/county';
import getAllProvinces from '../../../../../../services/province';
import CreateCountyView from './create/create-county';
import CreateProvinceView from './create/create-province';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`location-tabpanel-${index}`}
      aria-labelledby={`location-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const LocationView = () => {
  const [tabValue, setTabValue] = useState(0);
  const [showProvinceModal, setShowProvinceModal] = useState(false);
  const [showCountyModal, setShowCountyModal] = useState(false);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const provinceCells = [
    { id: Province.Description, label: 'Província', numeric: false },
  ];

  const countyCells = [
    { id: County.Description, label: 'Município', numeric: false },
    { id: 'province', label: 'Província', numeric: false },
  ];

  const provinceDataModifier = (data: any[]) => {
    return data.map(province => ({
      [Province.Description]: province.description,
      _id: province._id,
    }));
  };

  const countyDataModifier = (data: any[]) => {
    return data.map(county => ({
      [County.Description]: county.description,
      province: county.province?.description || '-',
      _id: county._id,
    }));
  };
  return (
    <>
      <Box mb={2}>
        <Typography variant="h4" gutterBottom>
          Gestão de Localização
        </Typography>
      </Box>

      <Tabs value={tabValue} onChange={handleTabChange} aria-label="location tabs">
        <Tab label="Províncias" />
        <Tab label="Municípios" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Box mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowProvinceModal(true)}
          >
            Criar Província
          </Button>
        </Box>
        <GenericTable
          tableId={SWR.PROVINCE}
          entityName="província"
          primaryKey={Province.Id}
          fetcher={getAllProvinces}
          cells={provinceCells}
          dataModifier={provinceDataModifier}
          title="Províncias"
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowCountyModal(true)}
          >
            Criar Município
          </Button>
        </Box>
        <GenericTable
          tableId={SWR.COUNTY}
          entityName="município"
          primaryKey={County.Id}
          fetcher={getAllCounties}
          cells={countyCells}
          dataModifier={countyDataModifier}
          title="Municípios"
        />
      </TabPanel>

      <GenericModal
        open={showProvinceModal}
        handleClose={() => setShowProvinceModal(false)}
        title="Criar Nova Província"
      >
        <CreateProvinceView 
          close={() => {
            setShowProvinceModal(false);
            window.location.reload(); // Reload to refresh province list
          }} 
        />
      </GenericModal>

      <GenericModal
        open={showCountyModal}
        handleClose={() => setShowCountyModal(false)}
        title="Criar Novo Município"
      >
        <CreateCountyView 
          close={() => {
            setShowCountyModal(false);
            window.location.reload(); // Reload to refresh county list
          }} 
        />
      </GenericModal>
    </>
  );
};

export default LocationView;
