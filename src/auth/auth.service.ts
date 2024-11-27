import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../@core/domain/dto/Users.dto';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload-interfaces';
import { LoginUserDto } from '../@core/domain/dto/User-login.dto';

import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/@core/domain/dto/createUser.dto';
import { Auth, google } from 'googleapis';
// import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  oauthClient: Auth.OAuth2Client;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    //private readonly emailService: EmailService
  ) {
    const clientID = this.configService.get('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');
    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  public async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);

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
      username: user.email,
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

  private _createToken({ email, password }: UserDto): any {
    const expiresIn = process.env.EXPIRESIN;

    const user: JwtPayload = { email, password };
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


  // async forgotPassword(email: string): Promise<void> {
  //   const user = dbUsers.find((user) => user.email === email);

  //   if (!user) {
  //     throw new NotFoundException(`No user found for email: ${email}`);
  //   }
  //   await this.emailService.sendResetPasswordLink(email)
  // }

  // async sendResetEmail(email: string, token: string): Promise<void> {
  //   // Implement email sending logic (using Nodemailer or any email service)
  //   console.log(`Reset link: http://your-frontend-url/reset-password?token=${token}`);
  // }

  // async resetPassword(token: string, password: string) {
  //   const email = await this.emailService.decodeConfirmationToken(token)

  //   const user = dbUsers.find((user => user.email === email));

  //   if(!user) {
  //     throw new NotFoundException(`No user found for email: ${email}`)
  //   }

  //   user.password = password;
  //   delete user.resetToken;
  // }
}


