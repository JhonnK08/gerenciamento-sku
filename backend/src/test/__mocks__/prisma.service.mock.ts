import { Provider } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Sku, SkuStatus } from '@sku-management/prisma/client';

export const skuMock: Sku = {
  id: '1',
  sku: 'SKU-2025-0001',
  comercialDescription: 'Lâmpada LED 9W Bivolt',
  description:
    'Lâmpada LED econômica de 9W, bivolt, formato bulbo E27, luz branca fria (6500K).',
  status: SkuStatus.PRE_REGISTER,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const prismaMockValues = {
  sku: {
    create: jest.fn().mockResolvedValue({
      ...skuMock,
      status: SkuStatus.COMPLETED_REGISTER,
    }),
    update: jest.fn().mockResolvedValue(skuMock),
    findFirst: jest.fn().mockResolvedValue(skuMock),
    findMany: jest.fn().mockResolvedValue([skuMock]),
    findUnique: jest.fn().mockResolvedValue(skuMock),
  },
} as unknown as PrismaService;

export const prismaServiceMock: Provider<PrismaService> = {
  provide: PrismaService,
  useValue: prismaMockValues,
};
