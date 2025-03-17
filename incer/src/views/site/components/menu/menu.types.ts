import ROUTES from '../../../../constants/routes';

export interface ILink {
  text: string;
  route: ROUTES;
}

export const itensMenu: ILink[] = [
  { text: 'Home', route: ROUTES.HOME },
  { text: 'Produção Nacional', route: ROUTES.NATIONAL_PRODUCTION },
  { text: 'Consumos', route: ROUTES.CONSUMPTION },
  { text: 'Preços do mercado', route: ROUTES.MARKET_PRICES },
];
