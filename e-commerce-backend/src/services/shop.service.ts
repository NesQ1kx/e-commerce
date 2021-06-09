import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShopDto } from 'src/dto/create-shop.dto';
import { IShop } from 'src/intefaces/shop.interface';

@Injectable()
export class ShopService {
  constructor(@InjectModel('shops') private shopModel: Model<IShop>) {}

  public async addShop(createShopDto: CreateShopDto): Promise<IShop> {
    const createdShop = new this.shopModel(createShopDto);
    return createdShop.save();
  }

  public async getAllShops(): Promise<IShop[]> {
    return this.shopModel.find();
  }
}
