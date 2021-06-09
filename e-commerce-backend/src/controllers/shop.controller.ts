import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { CreateShopDto } from 'src/dto/create-shop.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ShopService } from 'src/services/shop.service';
import { Response } from 'express';

@Controller('/api/v1/shops')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  public async addShop(
    @Body() createShopDto: CreateShopDto,
    @Res() res: Response,
  ): Promise<void> {
    const createdShop = await this.shopService.addShop(createShopDto);
    res.json({ shop: createdShop });
  }

  @Get('all')
  public async getAllShops(@Res() res: Response): Promise<void> {
    res.json({ shops: await this.shopService.getAllShops() });
  }
}
