import { EEventsTypes } from '../enums/events-types.enum';

export interface IEvent {
  _id: string;
  type: EEventsTypes;
  link: string;
  expireIn: number;
  description: string;
  shop: string;
}

export interface ISaleEvent extends IEvent {
  saleAmount: number;
}

export interface IPromoCodeEvent extends IEvent {
  code: string;
}

export interface ICashbackEvent extends IEvent {
  cashbackAmount: number;
}
