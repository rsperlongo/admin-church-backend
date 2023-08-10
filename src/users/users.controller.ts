import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/@core/infra/schema/user.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('auth/signup')
  async createUser(
    @Body('password') password: string,
    @Body('username') username: string,
  ): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser(username, hashedPassword);
    return result;
  }

  @Get('/users')
  async getUsers(query: object) {
    return await this.usersService.getAll(query);
  }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.usersService.deleteUser(id);
  // }

  // @Get(':id')
  // async getOneUser(@Param('id') id: string) {
  //   return this.usersService.getUserById(id);
  // }
}
