import { Provider } from '@nestjs/common';
import { SkuService } from '../../sku/sku.service';
import { Sku, SkuStatus } from '../../sku/entities/sku.entity';

export const skuMock: Sku = {
  id: '1',
  sku: 'SKU-2025-0001',
  comercialDescription: 'Lâmpada LED 9W Bivolt',
  description:
    'Lâmpada LED econômica de 9W, bivolt, formato bulbo E27, luz branca fria (6500K).',
  status: SkuStatus.PRE_REGISTER,
};

export const skuServiceMock: Provider<SkuService> = {
  provide: SkuService,
  useValue: {
    create: jest.fn().mockResolvedValue(skuMock),
    findAll: jest.fn().mockResolvedValue([skuMock]),
    findOne: jest.fn().mockResolvedValue(skuMock),
    updateInfo: jest.fn().mockResolvedValue(skuMock),
    updateStatus: jest.fn().mockResolvedValue(skuMock),
  } as unknown as SkuService,
};
