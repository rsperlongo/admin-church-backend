import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsEntity } from 'src/@core/domain/entities/events.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventsEntity])],
  providers: [EventsService],
  controllers: [EventsController]
})
export class EventsModule {}
