import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventsDto } from 'src/@core/domain/dto/events.dto';
import { EventsEntity } from 'src/@core/domain/entities/events.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(EventsEntity)
        private readonly eventsRepository: Repository<EventsEntity>
    ) {}

    async create(events: EventsDto) {
        const newEvent = this.eventsRepository.create(events)
        await this.eventsRepository.save(newEvent)
        return newEvent

    }

    async findAll() {
        return this.eventsRepository.find();
    }
}
