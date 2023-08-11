import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import UserEntity from 'src/@core/domain/entities/users.entity';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('auth/signup')
  async createUser(
    @Body('password') password: string,
    @Body('username') username: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('id') id: string,
  ): Promise<UserEntity> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser(
      username,
      hashedPassword,
      firstName,
      lastName,
      id,
    );
    return result;
  }

  @Get('/users')
  async getUsers() {
    return await this.usersService.getAll();
  }
}
