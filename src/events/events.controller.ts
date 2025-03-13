import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsDto } from 'src/@core/domain/dto/events.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Post('create')
  async createEvent(@Body() events: EventsDto) {
    return this.eventService.create(events);
  }

  @Get()
  async getEvents() {
    await this.eventService.findAll();
  }

  @Get('/:id')
  async getByIdEvents(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Patch('/:id')
  async updateEvents(
    @Param('id') id: string,
    @Body() updateEvents: EventsDto,
  ): Promise<EventsDto> {
    return await this.updateEvents(id, updateEvents);
  }

  @Delete(':id')
  async removeEvent(@Param('id') id: string) {
    return this.removeEvent(id);
  }
}
