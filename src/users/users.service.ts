import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersDto } from 'src/@core/domain/dto/Users.dto';
import { LoginUserDto } from 'src/@core/domain/dto/user-login.dto';
import UserEntity from 'src/@core/domain/entities/users.entity';
import { toUserDto } from 'src/shared/mapper';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(userData: UsersDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async getById(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getByEmail(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UsersDto> {
    const user = await this.usersRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    if (user?.password !== password) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return toUserDto(user);
  }

  async findByPayload({ username }: any) {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async findAll() {
    return this.usersRepository.find();
  }
}
