import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from 'src/@core/domain/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  async createUser(
    id: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    return await this.usersRepository.create({
      id,
      username,
      password,
      firstName,
      lastName,
    });
  }

  async getUser(username: string) {
    return this.usersRepository.findOne({
      where: { username },
    });
  }

  async getAll() {
    return this.usersRepository.find();
  }
}
