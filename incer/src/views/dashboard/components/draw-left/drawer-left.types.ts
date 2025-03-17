import React, { ReactNode } from 'react';

import ROUTES from '../../../../constants/routes';
import { UserRole } from '../../../../types/user';

export default interface DrawerLeftProps {}

export interface IOptions {
  text: string;
  path: React.ElementType;
  url: ROUTES;
  component?: ReactNode;
  roles: UserRole[];
}
// export const options: IOptions[] = [
//   {
//     text: 'Dashboard',
//     path: Dashboard,
//     url: ROUTES.DASHBOARD,
//   },
//   {
//     text: 'Area de produção',
//     path: Production,
//     url: ROUTES.PRODUTION_ZONE,
//   },
//   {
//     text: 'Análise de preço',
//     path: Analitic,
//     url: ROUTES.ANALITIC_PRICE,
//   },
// ];
