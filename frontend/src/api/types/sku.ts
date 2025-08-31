export const SkuStatus = {
  PRE_REGISTER: 'PRE_REGISTER',
  COMPLETED_REGISTER: 'COMPLETED_REGISTER',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  CANCEL: 'CANCEL',
} as const;

export type SkuStatus = keyof typeof SkuStatus;

export interface Sku {
  id: string;
  sku: string;
  description?: string;
  comercialDescription?: string;
  status: SkuStatus;
}

export interface RegisterSkuPayload {
  sku: string;
  description?: string;
  comercialDescription?: string;
}

export interface UpdateSkuInfoPayload {
  comercialDescription?: string;
}

export interface UpdateSkuStatusPayload {
  status: SkuStatus;
}
