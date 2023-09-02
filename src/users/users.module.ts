import { UsersService } from 'src/users/users.service';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from 'src/@core/domain/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
