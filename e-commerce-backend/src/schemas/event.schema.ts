import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  type: String,
  code: String,
  description: String,
  shop: { type: mongoose.Schema.Types.ObjectId, ref: 'shops' },
});
