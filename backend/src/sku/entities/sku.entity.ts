export enum SkuStatus {
  PRE_REGISTER = 'PRE_REGISTER',
  COMPLETED_REGISTER = 'COMPLETED_REGISTER',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  CANCEL = 'CANCEL',
}

export class Sku {
  id: string;
  sku: string;
  description?: string;
  comercialDescription?: string;
  status: SkuStatus;
}

export const AllowedTransitionStatus = [
  SkuStatus.ACTIVE,
  SkuStatus.INACTIVE,
  SkuStatus.PRE_REGISTER,
  SkuStatus.COMPLETED_REGISTER,
] as const;
