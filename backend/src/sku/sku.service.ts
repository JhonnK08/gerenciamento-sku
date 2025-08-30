import { Injectable } from '@nestjs/common';
import { CreateSkuDto } from './dto/create-sku.dto';
import { UpdateSkuInfoDto } from './dto/update-sku-info.dto';
import { UpdateSkuStatusDto } from './dto/update-sku-status.dto';
import { Sku } from './entities/sku.entity';
import { PrismaService } from 'src/database/prisma.service';
import { SkuStatus } from '@sku-management/prisma/client';
import { parsePrismaStatus } from 'src/utils/status.util';
import { parsePrismaSku } from 'src/utils/sku.util';
import { SkuStatusPolicy } from './policies/sku-status.policy';

@Injectable()
export class SkuService {
  constructor(private prisma: PrismaService) {}

  async create(createSkuDto: CreateSkuDto): Promise<Sku> {
    try {
      const skuDatabase = await this.prisma.sku.create({
        data: {
          sku: createSkuDto.sku,
          comercialDescription: createSkuDto.comercialDescription,
          description: createSkuDto.description,
          status: SkuStatus.COMPLETED_REGISTER,
        },
      });

      console.log('skuDatabase', skuDatabase);

      return parsePrismaSku(skuDatabase);
    } catch (error) {
      console.log('Error on prisma insert: ', error);
      throw new Error('Error on database insert.');
    }
  }

  async findAll(): Promise<Sku[]> {
    try {
      const allSkus = await this.prisma.sku.findMany();

      return allSkus.map(parsePrismaSku);
    } catch (error) {
      console.log('Error on prisma search: ', error);
      throw new Error('Error on search database results.');
    }
  }

  async findOne(id: string): Promise<Sku | null> {
    try {
      const sku = await this.prisma.sku.findFirst({
        where: {
          id: id,
        },
      });

      if (!sku) {
        return null;
      }

      return parsePrismaSku(sku);
    } catch (error) {
      console.log('Error on find sku on prisma: ', error);
      throw new Error('Error on find data in database.');
    }
  }

  async updateInfo(
    id: string,
    updateSkuInfoDto: UpdateSkuInfoDto,
  ): Promise<Sku> {
    try {
      const skuUpdated = await this.prisma.sku.update({
        data: {
          comercialDescription: updateSkuInfoDto.comercialDescription,
          status: SkuStatus.PRE_REGISTER,
        },
        where: {
          id: id,
        },
      });

      return parsePrismaSku(skuUpdated);
    } catch (error) {
      console.log('Error on update sku on prisma: ', error);
      throw new Error('Error on update data on database.');
    }
  }

  async updateStatus(
    id: string,
    updateSkuStatusDto: UpdateSkuStatusDto,
  ): Promise<Sku> {
    try {
      const sku = await this.prisma.sku.findUnique({ where: { id } });
      if (!sku) throw new Error('SKU not found.');

      if (
        !SkuStatusPolicy.canChangeStatus(
          parsePrismaStatus(sku.status),
          updateSkuStatusDto.status,
        )
      ) {
        throw new Error(
          `Cannot change status from ${sku.status} to ${updateSkuStatusDto.status}.`,
        );
      }

      const updatedSku = await this.prisma.sku.update({
        data: {
          status: updateSkuStatusDto.status,
        },
        where: {
          id,
        },
      });

      return parsePrismaSku(updatedSku);
    } catch (error) {
      console.log('Error on update sku status on prisma: ', error);
      throw new Error('Error on update data on database.');
    }
  }
}
