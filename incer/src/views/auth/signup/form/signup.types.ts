import { Cooperative, Producer } from '../../../../constants/entities';
import { User } from '../../../../constants/user';
import { UserRole } from '../../../../types/user';

export interface SignupFormData {
  [User.Email]?: string;
  [User.FirstName]: string;
  [User.LastName]: string;
  [User.Password]: string;
  [User.ConfirmPassword]: string;
  [User.Phone]: number;
  [User.Role]: UserRole;
  [Producer.Nif]: string;
  [Producer.CompanyName]: string;
  [Cooperative.Presindet]?: string;
  [Cooperative.isCooperative]?: string;
  [Producer.isProducer]?: string;
}
