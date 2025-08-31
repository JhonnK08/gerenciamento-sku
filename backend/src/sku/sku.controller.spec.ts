import { Test, TestingModule } from '@nestjs/testing';
import { SkuController } from './sku.controller';
import { skuMock, skuServiceMock } from '../test/__mocks__/sku.service.mock';
import {
  createSkuDtoMock,
  updateSkuInfoDtoMock,
  updateSkuStatusDtoMock,
} from '../test/__mocks__/sku.dto.mock';

describe('SkuController', () => {
  let controller: SkuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkuController],
      providers: [skuServiceMock],
    }).compile();

    controller = module.get<SkuController>(SkuController);
  });

  describe('register', () => {
    it('should create sku successfully', async () => {
      const result = await controller.register(createSkuDtoMock);
      expect(result).toBeDefined();
      expect(result.sku).toBe(skuMock.sku);
      expect(result.description).toBe(skuMock.description);
      expect(result.comercialDescription).toBe(skuMock.comercialDescription);
      expect(result.id).toBe(skuMock.id);
      expect(result.status).toBe(skuMock.status);
    });
  });

  describe('findAll', () => {
    it('should find all skus successfully', async () => {
      const result = await controller.findAll();
      expect(result).toBeDefined();
      expect(result.length).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should find sku by id successfully', async () => {
      const result = await controller.findOne(skuMock.id);
      expect(result).toBeDefined();
      expect(result?.id).toBe(skuMock.id);
      expect(result?.status).toBe(skuMock.status);
    });
  });

  describe('updateInfo', () => {
    it('should update info successfully', async () => {
      const result = await controller.updateInfo(
        skuMock.id,
        updateSkuInfoDtoMock,
      );
      expect(result).toBeDefined();
      expect(result.id).toBe(skuMock.id);
      expect(result.comercialDescription).toBe(skuMock.comercialDescription);
    });
  });

  describe('updateStatus', () => {
    it('should update sku status successfully', async () => {
      const result = await controller.updateStatus(
        skuMock.id,
        updateSkuStatusDtoMock,
      );
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.status).toBe(skuMock.status);
    });
  });
});
