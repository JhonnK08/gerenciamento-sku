import { AllowedCurrentTransitionStatus, SkuStatus } from '../entities/sku.entity';

export class SkuStatusPolicy {
  static canChangeStatus(current: SkuStatus, next: SkuStatus): boolean {
    const allowedTransitions: Record<
      (typeof AllowedCurrentTransitionStatus)[number],
      SkuStatus[]
    > = {
      [SkuStatus.PRE_REGISTER]: [SkuStatus.CANCEL],
      [SkuStatus.COMPLETED_REGISTER]: [SkuStatus.ACTIVE, SkuStatus.CANCEL],
      [SkuStatus.ACTIVE]: [SkuStatus.INACTIVE],
      [SkuStatus.INACTIVE]: [SkuStatus.ACTIVE, SkuStatus.PRE_REGISTER],
    };

    if (current === SkuStatus.CANCEL) {
      throw new Error('Cannot change CANCELED status.');
    }

    return allowedTransitions[current].includes(next);
  }
}
