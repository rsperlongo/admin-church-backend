import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
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

    async findOne(id: string): Promise<EventsEntity[]> {
        const events = await this.eventsRepository.find({ where: { id}  });

        if(!events) {
            throw new HttpException(`Member ${id} not found`, HttpStatus.NOT_FOUND)
        }

        return events;
    }

    async update(id: string, updateEvents: EventsEntity) {
        const events = await this.eventsRepository.preload({
            id;
            ...updateEvents
        });
        if(!events) {
            throw new HttpException(`Event ${id} not found`, HttpStatus.NOT_FOUND)
        }
        return events;
    }

    async remove(id: string) {
        const events = await this.eventsRepository.findOne({ where: { id } });

        if(!events) {
            throw new NotFoundException(`Member ${id} not found`);
        }
        return this.eventsRepository.remove(events);
    }
}
