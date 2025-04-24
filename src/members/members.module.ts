import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Members } from 'src/@core/domain/entities/members.entity';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Members])],
  providers: [MembersService],
  controllers: [MembersController],
})
export class MembersModule {}
