enum ROUTES {
  HOME = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  FORGOTPASSWORD = '/forgot-password',
  FORGOTPASSWORD_UPDATE = '/reset-password',
  DASHBOARD = '/dashboard',
  PRODUTION_ZONE = '/production_zone',
  ANALITIC_PRICE = '/analitic_price',
  PRODUCER_FAZENDA = '/dashboard/fazenda',
  PRODUCER_COOPERATIVE = '/dashboard/cooperative',
  PRODUCER_CULTURE = '/dashboard/culture',
  NATIONAL_PRODUCTION = '/national-production',
  CONSUMPTION = '/consumption',
  MARKET_PRICES = '/market-prices',

  // COOPERATIVE_CULTURES = '/dashboard/cooperative-cultures',
  COOPERATIVE_FAZENDAS = '/dashboard/cooperative-fazendas',
  COOPERATIVE_PRODUCERS = '/dashboard/cooperative-producers',
  COOPERATIVE_PRODUCERS_DETAILS = '/dashboard/cooperative-producers/details',

  TECHNICIAN_CULTURES = '/dashboard/technician-cultures',
  TECHNICIAN_FAZENDAS = '/dashboard/technician-fazendas',
  TECHNICIAN_PRODUCERS = '/dashboard/technician-producers',
  TECHNICIAN_COOPERATIVE = '/dashboard/technician-cooperative',

  ADMIN_CULTURES = '/dashboard/admin-cultures',
  ADMIN_FAZENDAS = '/dashboard/admin-fazendas',
  ADMIN_PRODUCERS = '/dashboard/admin-producers',
  ADMIN_COOPERATIVES = '/dashboard/admin-cooperatives',
  ADMIN_ASSOCIATION = '/dashboard/admin-association',
  ADMIN_SETTINGS = '/dashboard/settings',
  ADMIN_BLOG = '/dashboard/blog',
  ADMIN_TECHNICIAN = '/dashboard/technician',
  ADMIN_LOCATION = '/dashboard/location',
  ADMIN_PARTNER = '/dashboard/partner',

  ROOT_USERS = '/dashboard/root-users',
  ROOT_LOGS = '/dashboard/root-logs',
}

export enum DashboardView {
  DASHBOAD = '/dashboard',
  PRODUCER_FAZENDA = '/dashboard/fazenda',
  PRODUCER_FAZENDA_DETAILS = '/dashboard/fazenda',
  PRODUCER_COOPERATIVE = '/dashboard/cooperative',

  // COOPERATIVE_CULTURES = '/dashboard/cooperative-cultures',
  COOPERATIVE_FAZENDAS = '/dashboard/cooperative-fazendas',
  COOPERATIVE_PRODUCERS = '/dashboard/cooperative-producers',

  TECHNICIAN_CULTURES = '/dashboard/technician-cultures',
  TECHNICIAN_FAZENDAS = '/dashboard/technician-fazendas',
  TECHNICIAN_PRODUCERS = '/dashboard/technician-producers',
  TECHNICIAN_COOPERATIVE = '/dashboard/technician-cooperative',

  ADMIN_CULTURES = '/dashboard/admin-cultures',
  ADMIN_FAZENDAS = '/dashboard/admin-fazendas',
  ADMIN_PRODUCERS = '/dashboard/admin-producers',
  ADMIN_COOPERATIVES = '/dashboard/admin-cooperatives',
  ADMIN_ASSOCIATION = '/dashboard/admin-association',

  ADMIN_SETTINGS = '/dashboard/settings',
  ADMIN_BLOG = '/dashboard/blog',
  ADMIN_TECHNICIAN = '/dashboard/technician',
  ADMIN_PARTNER = '/dashboard/partner',
  ADMIN_LOCATION = '/dashboard/location',
  ROOT_USERS = '/dashboard/root-users',
  ROOT_LOGS = '/dashboard/root-logs',
}
export enum DashboardSubView {
  PRODUCER_FAZENDA_DETAILS = '/dashboard/fazenda/details',
  PRODUCER_DETAILS = '/dashboard/producers/details',
  COOPERATIVE_PRODUCER_DETAILS = '/dashboard/cooperative-producers/details',
  COOPERATIVE_FAZENDA_DETAILS = '/dashboard/cooperative-fazendas/details',
  COOPERATIVE_DETAILS = '/dashboard/cooperative/details',
  TECHNICIAN_PRODUCER_DETAILS = '/dashboard/technician-producers/details',
  TECHNICIAN_FAZENDA_DETAILS = '/dashboard/technician-fazendas/details',
  TECHNICIAN_COOPERATIVE_DETAILS = '/dashboard/technician-cooperative/details',
  ADMIN_FAZENDA_DETAILS = '/dashboard/admin-fazendas/details',
  ADMIN_PRODUCER_DETAILS = '/dashboard/admin-producers/details',
  ADMIN_COOPERATIVE_DETAILS = '/dashboard/admin-cooperatives/details',
}

export default ROUTES;
