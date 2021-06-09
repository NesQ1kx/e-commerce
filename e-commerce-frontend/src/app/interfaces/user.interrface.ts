import { EUserRoles } from '../enums/user-roles.enum';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: EUserRoles;
}
