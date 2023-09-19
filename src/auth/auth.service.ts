import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../@core/domain/dto/Users.dto';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload-interfaces';
import { LoginUserDto } from '../@core/domain/dto/User-login.dto';

import * as bycript from 'bcrypt';
import { CreateUserDto } from 'src/@core/domain/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  public async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    const hashedPassword = await bycript.hash(userDto.password, 10);

    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };
    try {
      const createdUser = await this.usersService.create({
        ...userDto,
        password: hashedPassword,
      });
      createdUser.password = undefined;
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken(user);

    return {
      email: user.email,
      ...token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken({ email }: UserDto): any {
    const expiresIn = process.env.EXPIRESIN;

    const user: JwtPayload = { email };
    const accessToken = this.jwtService.sign(user, {
      secret: process.env.JWT_SECRET,
      expiresIn: '60h',
    });
    console.log(accessToken);
    return {
      expiresIn,
      accessToken,
    };
  }
}


