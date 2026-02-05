/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { HttpExceptionFilter } from './../src/common/filters/http-exception.filter';
import { TransformInterceptor } from './../src/common/interceptors/transform.interceptor';

describe('App Controller (e2e)', () => {
  let app: INestApplication;
  const testEmail = `test_${Date.now()}@example.com`;
  const testPassword = 'password123';
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth Flow', () => {
    it('/api/auth/register (POST) - should register a new user', () => {
      return request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          email: testEmail,
          password: testPassword,
          name: 'Test User',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.message).toBe('User registered successfully');
          expect(res.body.data).toBeNull();
        });
    });

    it('/api/auth/register (POST) - should fail if user already exists', () => {
      return request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          email: testEmail,
          password: testPassword,
          name: 'Test User',
        })
        .expect(401);
    });

    it('/api/auth/login (POST) - should login and return a token', () => {
      return request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: testEmail,
          password: testPassword,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveProperty('access_token');
          accessToken = res.body.data.access_token;
        });
    });

    it('/api/auth/login (POST) - should fail with invalid credentials', () => {
      return request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: testEmail,
          password: 'wrongpassword',
        })
        .expect(401);
    });
  });

  describe('User Profile', () => {
    it('/api/users/me (GET) - should return user profile', () => {
      return request(app.getHttpServer())
        .get('/api/users/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          console.log('Response body:', res.body);

          expect(res.body.data.user).toHaveProperty('id');
          expect(res.body.data.user.email).toBe(testEmail);
        });
    });

    it('/api/users/me (GET) - should fail without token', () => {
      return request(app.getHttpServer()).get('/api/users/me').expect(401);
    });
  });

  describe('Logout Flow', () => {
    it('/api/auth/logout (POST) - should logout user', () => {
      return request(app.getHttpServer())
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toBe('User logged out successfully');
          expect(res.body.data).toBeNull();
        });
    });

    it('/api/auth/logout (POST) - should fail without token', () => {
      return request(app.getHttpServer()).post('/api/auth/logout').expect(401);
    });
  });
});
