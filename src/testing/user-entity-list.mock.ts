import { Role } from '../enums/role.enum';
import { UserEntity } from '../user/entity/user.entity';

export const userEntityList: UserEntity[] = [
  {
    name: 'Daniel Medeiros',
    email: 'daniel@email.com',
    birthAt: new Date('2000-01-01'),
    password: '$2b$10$LmZI0OmqOW0rjw1XvIuMuOtYFmgX7usleAwTtaY03cQzbYUKD4rOa',
    role: Role.Admin,
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Maria Ribeiro',
    email: 'maria@email.com',
    birthAt: new Date('2000-01-01'),
    password: '123456',
    role: Role.Admin,
    id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Alice Noronha',
    email: 'alice@email.com',
    birthAt: new Date('2000-01-01'),
    password: '123456',
    role: Role.Admin,
    id: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
