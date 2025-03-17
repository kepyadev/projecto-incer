import { Container } from '@material-ui/core';
import React, { FC } from 'react';

export interface ContainerShadowProps {
  children: any;
}
const ContainerShadow: FC<ContainerShadowProps> = ({ children }) => {
  return (
    <Container style={{ boxShadow: '4px 5px 10px 1px rgba(0, 0, 0, 0.2)' }}>
      {children}
    </Container>
  );
};
export default ContainerShadow;
