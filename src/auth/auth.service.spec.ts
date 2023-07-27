import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { jwtServiceMock } from '../testing/jwt-service.mock';
import { userServiceMock } from '../testing/user-service.mock';
import { mailerServiceMock } from '../testing/mailer-service.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { accessToken } from '../testing/access-token.mock';
import { jwtPayload } from '../testing/jwt-payload.mock';
import { authRegisterDTO } from '../testing/auth-register.mock';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userRepositoryMock,
        jwtServiceMock,
        userServiceMock,
        mailerServiceMock,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Validar a definição', () => {
    expect(authService).toBeDefined();
  });

  describe('Token', () => {
    it('createToken method', async () => {
      const { accessToken } = await authService.createToken(userEntityList[0]);
      expect(accessToken).toEqual(accessToken);
    });
    it('checkToken method', async () => {
      const result = await authService.checkToken(accessToken);
      expect(result).toEqual(jwtPayload);
    });

    it('isValidToken method', async () => {
      const result = await authService.isValidToken(accessToken);
      expect(result).toEqual(true);
    });
  });
  describe('Autenticação', () => {
    it('Login method', async () => {
      const result = await authService.login('daniel@email.com', '123456');
      expect(result).toEqual({ accessToken });
    });

    it('Forget method', async () => {
      const result = await authService.forget('joao@email.com');
      expect(result).toEqual({ success: true });
    });

    it('Reset method', async () => {
      const { accessToken } = await authService.reset(
        'daniel@email.com',
        '123456',
      );
      expect(accessToken).toEqual(accessToken);
    });

    it('Register method', async () => {
      const { accessToken } = await authService.register(authRegisterDTO);
      expect(accessToken).toEqual(accessToken);
    });
  });
});
