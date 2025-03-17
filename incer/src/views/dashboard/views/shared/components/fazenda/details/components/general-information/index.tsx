import { Typography } from '@material-ui/core';
import React, { FC } from 'react';

import InfoDetail from '../../../../../../../../../components/info-detail';
import { IFazenda } from '../../../../../../../../../types/fazenda';
import { getFieldsGround, getFieldsLocalization } from './generalInformation.types';

export interface GeneralInformationProps {
  fazenda: IFazenda;
}
const GeneralInformation: FC<GeneralInformationProps> = ({ fazenda }) => {
  return (
    <>
      <Typography variant="h5">Localização</Typography>
      <InfoDetail fields={getFieldsLocalization(fazenda)} />
      <Typography variant="h5">Solo</Typography>
      <InfoDetail fields={getFieldsGround(fazenda)} />
    </>
  );
};

export default GeneralInformation;
