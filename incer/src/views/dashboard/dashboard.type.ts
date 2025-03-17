import { DashboardView } from '../../constants/routes';
import { IUser } from '../../types/user';

export const hasPermission = (
  userActive: IUser | null,
  dashboardOption: Record<string, any>,
  option: DashboardView
): boolean | Error => {
  if (!isValidRoute(dashboardOption, option)) return new Error('Rota inexistente');
  return userActive && dashboardOption[option].roles.includes(userActive?.role);
};

export const isValidRoute = (routes: Record<string, any>, route: string) =>
  Object.keys(routes).includes(route);
