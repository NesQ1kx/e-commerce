import * as mongoose from 'mongoose';

export const ShopSchema = new mongoose.Schema({
  name: String,
  link: String,
  image: String,
});
