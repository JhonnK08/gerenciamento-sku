import { CreateSkuDto } from '../../sku/dto/create-sku.dto';
import { UpdateSkuInfoDto } from '../../sku/dto/update-sku-info.dto';
import { UpdateSkuStatusDto } from '../../sku/dto/update-sku-status.dto';
import { SkuStatus } from '../../sku/entities/sku.entity';
import { skuMock } from './sku.service.mock';

export const createSkuDtoMock: CreateSkuDto = {
  sku: skuMock.sku,
  comercialDescription: skuMock.comercialDescription,
  description: skuMock.description,
};

export const updateSkuInfoDtoMock: UpdateSkuInfoDto = {
  comercialDescription: skuMock.comercialDescription as string,
};

export const updateSkuStatusDtoMock: UpdateSkuStatusDto = {
  status: SkuStatus.CANCEL,
};
