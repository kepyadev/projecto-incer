import React from 'react';

import SvgAnalitic from '../../components/svg/analitic';
import SvgBlog from '../../components/svg/blog';
import SvgCooperative from '../../components/svg/cooperative';
import SvgCulture from '../../components/svg/culture';
import SvgDashboard from '../../components/svg/dashboard';
import SvgFazenda from '../../components/svg/fazenda';
import SvgProducer from '../../components/svg/producer';
import SvgSetting from '../../components/svg/settings';
import ROUTES, { DashboardSubView, DashboardView } from '../../constants/routes';
import { UserRole } from '../../types/user';
import AssociationAdminView from './views/admin/views/association';
import BlogPrice from './views/admin/views/blog';
import CooperativeAdminView from './views/admin/views/cooperatives';
import CooperativeDetailViewAdmin from './views/admin/views/cooperatives/details';
import CultureAdminView from './views/admin/views/culture';
import FazendaAdminView from './views/admin/views/fazendas';
// import LocationView from './views/admin/views/location';
import PartnerView from './views/admin/views/partner';
import ProducersAdminView from './views/admin/views/producers';
import SubEntities from './views/admin/views/subentities';
import TechnicianView from './views/admin/views/technician';
// import CulturaCooperativeView from './views/cooperative/views/culturas';
import FazendaCooperativeView from './views/cooperative/views/fazendas';
import ProducersCooperativeView from './views/cooperative/views/producers';
import Producer from './views/producer';
import CooperativaProducerView from './views/producer/views/cooperativa';
import FazendasView from './views/producer/views/fazendas';
import LogsView from './views/root/views/logs';
import UsersView from './views/root/views/users';
import FazendaDetail from './views/shared/components/fazenda/details';
import CooperativeProducerDetail from './views/shared/components/producers/details';
import CooperativeTechnicianView from './views/technician/views/cooperatives';
import CooperativeDetailViewTechnician from './views/technician/views/cooperatives/details';
import CultureTechnicianView from './views/technician/views/culture';
import FazendaTechnicianView from './views/technician/views/fazendas';
import ProducersTechnicianView from './views/technician/views/producers';
import TechnicianProducerDetail from './views/technician/views/producers/details';

// eslint-disable-next-line import/prefer-default-export
export const dashboardOptions = {
  [DashboardView.DASHBOAD]: {
    text: 'Dashboard',
    path: SvgDashboard,
    url: ROUTES.DASHBOARD,
    component: <Producer />,
    roles: [
      UserRole.Producer,
      UserRole.Cooperative,
      UserRole.Technician,
      UserRole.Admin,
      UserRole.Root,
      UserRole.GeneralAnalitic,
    ],
  },
  [DashboardView.PRODUCER_FAZENDA]: {
    text: 'Fazendas',
    path: SvgFazenda,
    url: ROUTES.PRODUCER_FAZENDA,
    component: <FazendasView />,
    roles: [UserRole.Producer],
  },
  [DashboardView.PRODUCER_COOPERATIVE]: {
    text: 'Coop & Assoc',
    path: SvgCooperative,
    url: ROUTES.PRODUCER_COOPERATIVE,
    component: <CooperativaProducerView />,
    roles: [UserRole.Producer],
  },
  // COOPERATIVE MODULE
  /*   [DashboardView.COOPERATIVE_CULTURES]: {
    text: 'Culturas',
    path: SvgCulture,
    url: ROUTES.COOPERATIVE_CULTURES,
    component: <CulturaCooperativeView />,
    roles: [UserRole.Cooperative],
  }, */
  [DashboardView.COOPERATIVE_FAZENDAS]: {
    text: 'Fazendas',
    path: SvgFazenda,
    url: ROUTES.COOPERATIVE_FAZENDAS,
    component: <FazendaCooperativeView />,
    roles: [UserRole.Cooperative],
  },
  [DashboardView.COOPERATIVE_PRODUCERS]: {
    text: 'Produtores',
    path: SvgProducer,
    url: ROUTES.COOPERATIVE_PRODUCERS,
    component: <ProducersCooperativeView />,
    roles: [UserRole.Cooperative],
  },

  // TECHNICIAN
  [DashboardView.TECHNICIAN_CULTURES]: {
    text: 'Culturas',
    path: SvgCulture,
    url: ROUTES.TECHNICIAN_CULTURES,
    component: <CultureTechnicianView />,
    roles: [UserRole.Technician],
  },
  [DashboardView.TECHNICIAN_FAZENDAS]: {
    text: 'Fazendas',
    path: SvgFazenda,
    url: ROUTES.TECHNICIAN_FAZENDAS,
    component: <FazendaTechnicianView />,
    roles: [UserRole.Technician],
  },
  [DashboardView.TECHNICIAN_PRODUCERS]: {
    text: 'Produtores',
    path: SvgProducer,
    url: ROUTES.TECHNICIAN_PRODUCERS,
    component: <ProducersTechnicianView />,
    roles: [UserRole.Technician],
  },
  [DashboardView.TECHNICIAN_COOPERATIVE]: {
    text: 'Coop & Assoc',
    path: SvgCooperative,
    url: ROUTES.TECHNICIAN_COOPERATIVE,
    component: <CooperativeTechnicianView />,
    roles: [UserRole.Technician],
  },

  // ADMIN
  [DashboardView.ADMIN_CULTURES]: {
    text: 'Culturas',
    path: SvgCulture,
    url: ROUTES.ADMIN_CULTURES,
    component: <CultureAdminView />,
    roles: [UserRole.Admin],
  },
  [DashboardView.ADMIN_FAZENDAS]: {
    text: 'Fazendas',
    path: SvgFazenda,
    url: ROUTES.ADMIN_FAZENDAS,
    component: <FazendaAdminView />,
    roles: [UserRole.Admin],
  },
  [DashboardView.ADMIN_PRODUCERS]: {
    text: 'Produtores',
    path: SvgProducer,
    url: ROUTES.ADMIN_PRODUCERS,
    component: <ProducersAdminView />,
    roles: [UserRole.Admin],
  },
  [DashboardView.ADMIN_COOPERATIVES]: {
    text: 'Cooperativas',
    path: SvgCooperative,
    url: ROUTES.ADMIN_COOPERATIVES,
    component: <CooperativeAdminView />,
    roles: [UserRole.Admin],
  },

  [DashboardView.ADMIN_ASSOCIATION]: {
    text: 'Associação',
    path: SvgCooperative,
    url: ROUTES.ADMIN_ASSOCIATION,
    component: <AssociationAdminView />,
    roles: [UserRole.Admin],
  },
  [DashboardView.ADMIN_TECHNICIAN]: {
    text: 'Técnicos',
    path: SvgProducer,
    url: ROUTES.ADMIN_TECHNICIAN,
    component: <TechnicianView />,
    roles: [UserRole.Admin],
  },
  [DashboardView.ADMIN_PARTNER]: {
    text: 'Parceiros',
    path: SvgProducer,
    url: ROUTES.ADMIN_PARTNER,
    component: <PartnerView />,
    roles: [UserRole.Admin],
  },
  /*   [DashboardView.ADMIN_LOCATION]: {
    text: 'Provincias',
    path: SvgProducer,
    url: ROUTES.ADMIN_LOCATION,
    component: <LocationView />,
    roles: [UserRole.Admin],
  }, */
  [DashboardView.ADMIN_SETTINGS]: {
    text: 'Configurações',
    path: SvgSetting,
    url: ROUTES.ADMIN_SETTINGS,
    component: <SubEntities />,
    roles: [UserRole.Admin],
  },
  [DashboardView.ADMIN_BLOG]: {
    text: 'Indicadores',
    path: SvgBlog,
    url: ROUTES.ADMIN_BLOG,
    component: <BlogPrice />,
    roles: [UserRole.Admin],
  },

  // ROOT
  [DashboardView.ROOT_USERS]: {
    text: 'Utilizadores',
    path: SvgProducer,
    url: ROUTES.ROOT_USERS,
    component: <UsersView />,
    roles: [UserRole.Root],
  },
  [DashboardView.ROOT_LOGS]: {
    text: 'Logs',
    path: SvgAnalitic,
    url: ROUTES.ROOT_LOGS,
    component: <LogsView />,
    roles: [UserRole.Root],
  },
};

export const dashboardSubViewOptions = {
  [DashboardSubView.PRODUCER_FAZENDA_DETAILS]: {
    compenent: <FazendaDetail />,
    role: [UserRole.Producer],
  },
  [DashboardSubView.PRODUCER_DETAILS]: {
    compenent: <CooperativeProducerDetail />,
    role: [UserRole.Producer],
  },
  [DashboardSubView.COOPERATIVE_PRODUCER_DETAILS]: {
    compenent: <CooperativeProducerDetail />,
    role: [UserRole.Cooperative, UserRole.Technician],
  },
  [DashboardSubView.COOPERATIVE_FAZENDA_DETAILS]: {
    compenent: <FazendaDetail />,
    role: [UserRole.Cooperative],
  },
  [DashboardSubView.COOPERATIVE_DETAILS]: {
    compenent: <CooperativeProducerDetail />,
    role: [UserRole.Producer],
  },
  [DashboardSubView.TECHNICIAN_PRODUCER_DETAILS]: {
    compenent: <TechnicianProducerDetail />,
    role: [UserRole.Technician],
  },
  [DashboardSubView.TECHNICIAN_FAZENDA_DETAILS]: {
    compenent: <FazendaDetail />,
    role: [UserRole.Technician],
  },
  [DashboardSubView.TECHNICIAN_COOPERATIVE_DETAILS]: {
    compenent: <CooperativeDetailViewTechnician />,
    role: [UserRole.Technician],
  },
  [DashboardSubView.ADMIN_FAZENDA_DETAILS]: {
    compenent: <FazendaDetail />,
    role: [UserRole.Admin],
  },
  [DashboardSubView.ADMIN_PRODUCER_DETAILS]: {
    compenent: <CooperativeProducerDetail />,
    role: [UserRole.Admin],
  },
  [DashboardSubView.ADMIN_COOPERATIVE_DETAILS]: {
    compenent: <CooperativeDetailViewAdmin />,
    role: [UserRole.Admin],
  },
};
