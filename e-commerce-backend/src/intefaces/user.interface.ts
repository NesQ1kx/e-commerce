import { EUserRoles } from 'src/enums/user-roles.enum';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: EUserRoles;
}
