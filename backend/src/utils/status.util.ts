import { SkuStatus as PrismaSkuStatus } from '@sku-management/prisma/client';
import { SkuStatus } from '../sku/entities/sku.entity';

export function parsePrismaStatus(status: PrismaSkuStatus): SkuStatus {
  switch (status) {
    case 'COMPLETED_REGISTER':
      return SkuStatus.COMPLETED_REGISTER;
    case 'ACTIVE':
      return SkuStatus.ACTIVE;
    case 'INACTIVE':
      return SkuStatus.INACTIVE;
    case 'CANCEL':
      return SkuStatus.CANCEL;
    case 'PRE_REGISTER':
      return SkuStatus.PRE_REGISTER;
    default:
      throw new Error(`Unknown status: ${String(status)}`);
  }
}
