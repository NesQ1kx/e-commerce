import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { EventService } from 'src/services/event.service';

@Controller('/api/v1/events')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get('')
  public async getEvent(@Res() res: Response): Promise<void> {
    res.json(await this.eventService.getEvent());
  }
}
