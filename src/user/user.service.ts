import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDTO) {
    if (
      await this.userRepository.exist({
        where: {
          email: data.email,
        },
      })
    ) {
      throw new BadRequestException('Este email já está sendo usado.');
    }

    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    const user = await this.userRepository.create(data);

    return this.userRepository.save(user);
  }

  async list() {
    return await this.userRepository.find();
  }

  async show(id: number) {
    await this.existId(id);
    return await this.userRepository.findOneBy({
      id,
    });
  }

  async update(
    id: number,
    { name, email, password, birthAt, role }: UpdatePutUserDTO,
  ) {
    await this.existId(id);

    const salt = await bcrypt.genSalt();

    password = await bcrypt.hash(password, salt);

    this.userRepository.update(id, {
      name,
      email,
      password,
      birthAt: birthAt ? new Date(birthAt) : null,
      role,
    });

    return this.show(id);
  }

  async updatePartial(
    id: number,
    { name, email, password, birthAt, role }: UpdatePatchUserDTO,
  ) {
    const data: any = {};

    await this.existId(id);

    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }

    if (email) {
      data.email = email;
    }

    if (password) {
      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);
      data.password = password;
    }

    if (name) {
      data.name = name;
    }

    if (role) {
      data.role = role;
    }

    await this.userRepository.update(id, data);

    return this.show(id);
  }

  async delete(id: number) {
    await this.existId(id);

    await this.userRepository.delete(id);

    return true;
  }

  async existId(id: number) {
    if (
      !this.userRepository.exist({
        where: {
          id,
        },
      })
    ) {
      throw new NotFoundException(`Usuário com id ${id} não existe!!`);
    }
  }
}
