import { Test, TestingModule } from '@nestjs/testing';
import { SkuService } from './sku.service';
import { prismaServiceMock } from '../test/__mocks__/prisma.service.mock';
import {
  createSkuDtoMock,
  updateSkuInfoDtoMock,
  updateSkuStatusDtoMock,
} from '../test/__mocks__/sku.dto.mock';
import { PrismaService } from '../database/prisma.service';
import { SkuStatus } from './entities/sku.entity';
import { skuMock } from '../test/__mocks__/sku.service.mock';
import { skuMock as prismaSkuMock } from '../test/__mocks__/prisma.service.mock';
import { SkuStatus as PrismaSkuStatus } from '@sku-management/prisma/client';

describe('SkuService', () => {
  let service: SkuService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkuService, prismaServiceMock],
    }).compile();

    service = module.get<SkuService>(SkuService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create sku successfully returning COMPLETED_REGISTER status', async () => {
      const prismaCreateSpy = jest.spyOn(prismaService.sku, 'create');

      const result = await service.create(createSkuDtoMock);
      expect(prismaCreateSpy).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.status).toBe(SkuStatus.COMPLETED_REGISTER);
    });

    it('should throw an error on database error', async () => {
      const prismaCreateSpy = jest.spyOn(prismaService.sku, 'create');

      prismaCreateSpy.mockRejectedValueOnce(new Error('Test error'));

      await expect(service.create(createSkuDtoMock)).rejects.toThrow(
        'Error on database insert.',
      );
      expect(prismaCreateSpy).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return successfully with no skus registered', async () => {
      const prismaFindManySpy = jest.spyOn(prismaService.sku, 'findMany');

      prismaFindManySpy.mockResolvedValueOnce([]);

      const result = await service.findAll();
      expect(result).toBeDefined();
      expect(result.length).toBe(0);
      expect(prismaFindManySpy).toHaveBeenCalled();
    });

    it('should return successfully the list of skus registered', async () => {
      const prismaFindManySpy = jest.spyOn(prismaService.sku, 'findMany');

      const result = await service.findAll();
      expect(result).toBeDefined();
      expect(result.length).toBe(1);
      expect(prismaFindManySpy).toHaveBeenCalled();
    });

    it('should throw an error on database error', async () => {
      const prismaFindManySpy = jest.spyOn(prismaService.sku, 'findMany');

      prismaFindManySpy.mockRejectedValueOnce(new Error('Test error'));

      await expect(service.findAll()).rejects.toThrow(
        'Error on search database results.',
      );
      expect(prismaFindManySpy).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return null when sku was not found', async () => {
      const prismaFindFirstSpy = jest.spyOn(prismaService.sku, 'findFirst');

      prismaFindFirstSpy.mockResolvedValueOnce(null);

      const result = await service.findOne(skuMock.id);
      expect(result).toBe(null);
      expect(prismaFindFirstSpy).toHaveBeenCalled();
    });

    it('should return successfully when sku was found', async () => {
      const prismaFindFirstSpy = jest.spyOn(prismaService.sku, 'findFirst');

      const result = await service.findOne(skuMock.id);
      expect(result).toBeDefined();
      expect(result?.id).toBe(skuMock.id);
      expect(prismaFindFirstSpy).toHaveBeenCalled();
    });

    it('should throw an error on database error', async () => {
      const prismaFindFirstSpy = jest.spyOn(prismaService.sku, 'findFirst');

      prismaFindFirstSpy.mockRejectedValueOnce(new Error('Test error'));

      await expect(service.findOne(skuMock.id)).rejects.toThrow(
        'Error on find data in database.',
      );
      expect(prismaFindFirstSpy).toHaveBeenCalled();
    });
  });

  describe('updateInfo', () => {
    it('should update successfully the info and return PRE_REGISTER status', async () => {
      const prismaUpdateSpy = jest.spyOn(prismaService.sku, 'update');

      const result = await service.updateInfo(skuMock.id, updateSkuInfoDtoMock);
      expect(result).toBeDefined();
      expect(result.id).toBe(skuMock.id);
      expect(prismaUpdateSpy).toHaveBeenCalled();
      expect(prismaUpdateSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: SkuStatus.PRE_REGISTER,
          }) as unknown,
        }) as unknown,
      );
    });

    it('should throw an error on database error', async () => {
      const prismaUpdateSpy = jest.spyOn(prismaService.sku, 'update');

      prismaUpdateSpy.mockRejectedValueOnce(new Error('Test error'));

      await expect(
        service.updateInfo(skuMock.id, updateSkuInfoDtoMock),
      ).rejects.toThrow('Error on update data on database.');
      expect(prismaUpdateSpy).toHaveBeenCalled();
    });
  });

  describe('updateStatus', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return successfully the new status updated', async () => {
      const prismaFindUniqueSpy = jest.spyOn(prismaService.sku, 'findUnique');
      const prismaUpdateSpy = jest.spyOn(prismaService.sku, 'update');

      const result = await service.updateStatus(
        skuMock.id,
        updateSkuStatusDtoMock,
      );
      expect(result).toBeDefined();
      expect(result.id).toBe(skuMock.id);
      expect(result.status).toBe(skuMock.status);
      expect(prismaFindUniqueSpy).toHaveBeenCalled();
      expect(prismaUpdateSpy).toHaveBeenCalled();
      expect(prismaUpdateSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: SkuStatus.CANCEL,
          }) as unknown,
        }) as unknown,
      );
    });

    it('should throw an error when the current status is CANCEL', async () => {
      const prismaFindUniqueSpy = jest.spyOn(prismaService.sku, 'findUnique');
      const prismaUpdateSpy = jest.spyOn(prismaService.sku, 'update');

      prismaFindUniqueSpy.mockResolvedValueOnce({
        ...prismaSkuMock,
        status: PrismaSkuStatus.CANCEL,
      });

      await expect(
        service.updateStatus(skuMock.id, updateSkuStatusDtoMock),
      ).rejects.toThrow('Cannot change CANCELED status.');
      expect(prismaFindUniqueSpy).toHaveBeenCalled();
      expect(prismaUpdateSpy).not.toHaveBeenCalled();
    });

    it('should throw an error when transition is not allowed on policy', async () => {
      const prismaFindUniqueSpy = jest.spyOn(prismaService.sku, 'findUnique');
      const prismaUpdateSpy = jest.spyOn(prismaService.sku, 'update');

      prismaFindUniqueSpy.mockResolvedValueOnce({
        ...prismaSkuMock,
        status: PrismaSkuStatus.ACTIVE,
      });

      await expect(
        service.updateStatus(skuMock.id, {
          status: SkuStatus.COMPLETED_REGISTER,
        }),
      ).rejects.toThrow(
        `Cannot change status from ${SkuStatus.ACTIVE} to ${SkuStatus.COMPLETED_REGISTER}.`,
      );
      expect(prismaFindUniqueSpy).toHaveBeenCalled();
      expect(prismaUpdateSpy).not.toHaveBeenCalled();
    });

    it('should throw an error when transition is not allowed on INACTIVE policy', async () => {
      const prismaFindUniqueSpy = jest.spyOn(prismaService.sku, 'findUnique');
      const prismaUpdateSpy = jest.spyOn(prismaService.sku, 'update');

      prismaFindUniqueSpy.mockResolvedValueOnce({
        ...prismaSkuMock,
        status: PrismaSkuStatus.INACTIVE,
      });

      await expect(
        service.updateStatus(skuMock.id, {
          status: SkuStatus.COMPLETED_REGISTER,
        }),
      ).rejects.toThrow(
        `Cannot change status from ${SkuStatus.INACTIVE} to ${SkuStatus.COMPLETED_REGISTER}.`,
      );
      expect(prismaFindUniqueSpy).toHaveBeenCalled();
      expect(prismaUpdateSpy).not.toHaveBeenCalled();
    });

    it('should throw an error on find sku on database', async () => {
      const prismaFindUniqueSpy = jest.spyOn(prismaService.sku, 'findUnique');
      const prismaUpdateSpy = jest.spyOn(prismaService.sku, 'update');

      prismaFindUniqueSpy.mockRejectedValueOnce(new Error('Test error'));

      await expect(
        service.updateStatus(skuMock.id, updateSkuStatusDtoMock),
      ).rejects.toThrow('Error on update data on database.');
      expect(prismaFindUniqueSpy).toHaveBeenCalled();
      expect(prismaUpdateSpy).not.toHaveBeenCalled();
    });

    it('should throw an error on update database', async () => {
      const prismaFindUniqueSpy = jest.spyOn(prismaService.sku, 'findUnique');
      const prismaUpdateSpy = jest.spyOn(prismaService.sku, 'update');

      prismaUpdateSpy.mockRejectedValueOnce(new Error('Test error'));

      await expect(
        service.updateStatus(skuMock.id, updateSkuStatusDtoMock),
      ).rejects.toThrow('Error on update data on database.');
      expect(prismaFindUniqueSpy).toHaveBeenCalled();
      expect(prismaUpdateSpy).toHaveBeenCalled();
    });
  });
});
