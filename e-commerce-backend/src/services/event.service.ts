import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEvent } from 'src/intefaces/event.interface';

@Injectable()
export class EventService {
  constructor(@InjectModel('events') private eventModel: Model<IEvent>) {}

  public async getEvent(): Promise<IEvent> {
    return this.eventModel.findOne({ type: 'code' });
  }
}
