import { EUserRoles } from 'src/enums/user-roles.enum';

export class CreateUserDto {
  readonly email: string;
  password: string;
  readonly name: string;
  role: EUserRoles;
}
