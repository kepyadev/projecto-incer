import { Box, Tab, Tabs, Typography } from '@material-ui/core';
import React, { useState } from 'react';

import ErrorFail from '../../../../../../components/error-fail';
import ConsumptionScreen from './consumption';
import NationalMarketPricesScreen from './national-market-prices';
import NationalProductionScreen from './national-production';

export default function BlogPrice() {
  const [value, setValue] = useState<string>('national-production');

  const handleChange = (_event: any, newValue: string) => {
    setValue(newValue);
  };

  const getSelectedView = (valueToShow: string) => {
    switch (valueToShow) {
      case 'national-production':
        return <NationalProductionScreen />;

      case 'consumption':
        return <ConsumptionScreen />;
      case 'market-prices':
        return <NationalMarketPricesScreen />;
      default:
        return <ErrorFail />;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" style={{ marginBottom: '32px' }}>
        Configuração de produtos
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
        <Tab value="national-production" label="Produção nacional" />
        <Tab value="consumption" label="Consumo" />
        <Tab value="market-prices" label="Preços de mercado" />
      </Tabs>

      {getSelectedView(value)}
    </Box>
  );
}
