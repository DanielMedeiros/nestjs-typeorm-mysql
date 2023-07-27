import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { userServiceMock } from '../testing/user-service.mock';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { RoleGuard } from '../guards/role.guard';
import { UserService } from './user.service';
import { userEntityList } from '../testing/user-entity-list.mock';
import { createUserDTO } from '../testing/create-user-dto.mock';
import { updatePutUserDTO } from '../testing/upate-put-user-dto.mock';
import { updatePatchUserDTO } from '../testing/upate-patch-user-dto.mock';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('Validar a definição', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Teste da aplicação dos Guards neste controller', () => {
    test('Se os guards estão aplicados ', () => {
      const guards = Reflect.getMetadata('__guards__', UserController);

      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });

  describe('Create', () => {
    test('Create Method ', async () => {
      const result = await userController.create(createUserDTO);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    test('Read Method ', async () => {
      const result = await userController.read();

      expect(result).toEqual(userEntityList);
    });
  });

  describe('Show', () => {
    test('Show Method ', async () => {
      const result = await userController.show(1);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    test('Update Method ', async () => {
      const result = await userController.update(updatePutUserDTO, 1);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update Partial', () => {
    test('Update Partial Method ', async () => {
      const result = await userController.updatePartial(updatePatchUserDTO, 1);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    test('Delete Method ', async () => {
      const result = await userController.delete(1);

      expect(result).toEqual({ success: true });
    });
  });
});
