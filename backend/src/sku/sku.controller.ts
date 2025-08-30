import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { SkuService } from './sku.service';
import { CreateSkuDto } from './dto/create-sku.dto';
import { UpdateSkuInfoDto } from './dto/update-sku-info.dto';
import { UpdateSkuStatusDto } from './dto/update-sku-status.dto';

@Controller('sku')
export class SkuController {
  constructor(private readonly skuService: SkuService) {}

  @Post('/register')
  register(@Body() createSkuDto: CreateSkuDto) {
    return this.skuService.create(createSkuDto);
  }

  @Get()
  findAll() {
    return this.skuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skuService.findOne(id);
  }

  @Patch(':id')
  updateInfo(
    @Param('id') id: string,
    @Body() updateSkuInfoDto: UpdateSkuInfoDto,
  ) {
    return this.skuService.updateInfo(id, updateSkuInfoDto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateSkuStatusDto: UpdateSkuStatusDto,
  ) {
    return this.skuService.updateStatus(id, updateSkuStatusDto);
  }
}
