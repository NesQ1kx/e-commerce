import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { EventController } from 'src/controllers/event.controller';
import { EventSchema } from 'src/schemas/event.schema';
import { EventService } from 'src/services/event.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'events', schema: EventSchema }]),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
