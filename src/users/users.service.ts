import { UpdateUsersDto } from '../@core/domain/dto/Update-user.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersDto } from 'src/@core/domain/dto/Users.dto';
import { LoginUserDto } from 'src/@core/domain/dto/User-login.dto';
import UserEntity from 'src/@core/domain/entities/users.entity';
import { toUserDto } from 'src/shared/mapper';
import { Repository } from 'typeorm';
import User from '../@core/domain/entities/users.entity';
import { CreateUserDto } from 'src/@core/domain/dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new User();

    newUser.username = createUserDto.username;
    newUser.password = createUserDto.password;

    return await this.usersRepository.save(newUser);
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    return await this.usersRepository.save(newUser);
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

  async findByPayload({ username }): Promise<UsersDto> {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async update(id: string, updateUsers: UpdateUsersDto) {
    const user = await this.usersRepository.preload({
      id,
      ...updateUsers,
    });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return this.usersRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return this.usersRepository.remove(user);
  }
}
