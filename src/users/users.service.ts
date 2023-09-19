import { UpdateUsersDto } from '../@core/domain/dto/Update-user.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/@core/domain/dto/Users.dto';
import { LoginUserDto } from 'src/@core/domain/dto/User-login.dto';
import { toUserDto } from 'src/shared/mapper';
import { Repository } from 'typeorm';
import User from '../@core/domain/entities/users.entity';
import { CreateUserDto } from 'src/@core/domain/dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new User();

    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;

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

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    return await this.usersRepository.save(newUser);
  }

  async findByLogin({ email, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOne({
      where: { email },
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

  async findByPayload({ email }: any): Promise<UserDto> {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
