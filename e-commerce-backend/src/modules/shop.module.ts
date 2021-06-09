import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopController } from 'src/controllers/shop.controller';
import { ShopSchema } from 'src/schemas/shop.schema';
import { ShopService } from 'src/services/shop.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'shops', schema: ShopSchema }])],
  providers: [ShopService],
  controllers: [ShopController],
})
export class ShopModule {}
