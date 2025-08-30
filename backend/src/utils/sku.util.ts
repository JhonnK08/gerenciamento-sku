import { Sku as PrismaSku } from '@sku-management/prisma/client';
import { Sku } from 'src/sku/entities/sku.entity';
import { parsePrismaStatus } from './status.util';

export function parsePrismaSku(sku: PrismaSku): Sku {
  return {
    id: sku.id,
    sku: sku.sku,
    status: parsePrismaStatus(sku.status),
    comercialDescription: sku.comercialDescription ?? undefined,
    description: sku.description ?? undefined,
  };
}
