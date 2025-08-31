import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { Sku, SkuStatus } from '../src/sku/entities/sku.entity';

async function createSku(
  app: INestApplication<App>,
  sku?: string,
): Promise<string> {
  const parameters = {
    sku: sku ?? 'TEST-E2E-1',
    comercialDescription: 'COMERCIAL-DESCRIPTION-TEST',
    description: 'COMERCIAL-DESCRIPTION-TEST',
  };

  const response = await request(app.getHttpServer())
    .post('/sku/register')
    .send(parameters);

  return (response.body as { id: string }).id;
}

describe('App (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('sku', () => {
    it('/sku/register (POST)', () => {
      const parameters = {
        sku: 'TEST-E2E-POST',
        comercialDescription: 'COMERCIAL-DESCRIPTION-TEST',
        description: 'COMERCIAL-DESCRIPTION-TEST',
      };

      return request(app.getHttpServer())
        .post('/sku/register')
        .send(parameters)
        .expect(201)
        .expect((response) => {
          const body = response.body as Sku;
          return (
            body.sku === parameters.sku &&
            body.comercialDescription === parameters.comercialDescription &&
            body.status === SkuStatus.COMPLETED_REGISTER
          );
        });
    });

    it('/sku (GET)', () => {
      return request(app.getHttpServer()).get('/sku').expect(200);
    });

    it('/sku/:id (GET)', async () => {
      const SKU_ID = await createSku(app, 'TEST-GET-ONE');
      return request(app.getHttpServer()).get(`/sku/${SKU_ID}`).expect(200);
    });

    it('/sku/:id (PATCH)', async () => {
      const SKU_ID = await createSku(app, 'TEST-PATCH-1');
      const parameters = { comercialDescription: 'UPDATED DESCRIPTION TEST' };
      return request(app.getHttpServer())
        .patch(`/sku/${SKU_ID}`)
        .send(parameters)
        .expect(200)
        .expect((response) => {
          const body = response.body as Sku;
          return (
            body.comercialDescription === parameters.comercialDescription &&
            body.status === SkuStatus.PRE_REGISTER
          );
        });
    });

    it('/sku/:id/status (PATCH)', async () => {
      const SKU_ID = await createSku(app, 'TEST-PATCH-2');
      const parameters = { status: SkuStatus.CANCEL };
      return request(app.getHttpServer())
        .patch(`/sku/${SKU_ID}/status`)
        .send(parameters)
        .expect(200)
        .expect((response) => {
          const body = response.body as Sku;
          return body.status === parameters.status;
        });
    });
  });
});
