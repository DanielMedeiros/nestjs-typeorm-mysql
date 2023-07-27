import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { authRegisterDTO } from '../src/testing/auth-register.mock';
import { Role } from '../src/enums/role.enum';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('Registrar um novo usuário', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(authRegisterDTO);

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');
  });

  it('Tentar fazer login com novo usuario', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: authRegisterDTO.email,
        password: authRegisterDTO.password,
      });

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');

    accessToken = response.body.accessToken;
  });

  it('Obter os dados do usuário logado', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/me')
      .set('Authorization', `bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.id).toEqual('number');
    expect(response.body.role).toEqual(Role.User);
  });

  it('Registrar um novo usuário como administrador', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        ...authRegisterDTO,
        role: Role.Admin,
        email: 'teste@email.com',
      });

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');

    accessToken = response.body.accessToken;
  });

  it('Validar se a função do novo usuário ainda é User', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/me')
      .set('Authorization', `bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.id).toEqual('number');
    expect(response.body.role).toEqual(Role.User);
  });

  // it('Tentar ver a lista de todos os usuários', async () => {
  //   const response = await request(app.getHttpServer())
  //     .get('/users')
  //     .set('Authorization', `bearer ${accessToken}`)
  //     .send();

  //   expect(response.statusCode).toEqual(403);
  //   expect(response.body.error).toEqual('Forbidden');
  // });
});
