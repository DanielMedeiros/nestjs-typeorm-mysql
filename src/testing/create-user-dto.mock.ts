import { Role } from '../enums/role.enum';
import { CreateUserDTO } from '../user/dto/create-user.dto';

export const createUserDTO: CreateUserDTO = {
  birthAt: '2000-01-01',
  email: 'email@email.com',
  name: 'Anonimo name',
  password: '123456',
  role: Role.Admin,
};
