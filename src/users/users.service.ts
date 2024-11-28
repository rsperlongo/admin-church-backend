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
import * as bycript from 'bcrypt';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';

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
    
    const passwordValid = await bycript.compare(password, user.password)
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    if(user && passwordValid) {
      return user;
    }
    
    return toUserDto(user);
  }

  async findByPayload({ email }: any): Promise<UserDto> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    // Generate a token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    await this.usersRepository.save(user);

    // Send email (you'll need to set up a mailer service)
    await this.sendResetEmail(user.email, token);
  }

  async sendResetEmail(email: string, token: string): Promise<void> {
    const  transporter = nodemailer.createTransport({
      auth: {
        user: 'ricardo.sperlongo@gmail.com',
        pass: 'Lme363nc@23+'
      }
    })
    console.log(
      `Reset link: http://your-frontend-url/reset-password?token=${token}`,
    );

    const resetUrl = `http://your-frontend-url/reset-password?token=${token}`;

    await transporter.sendMail({
      to: email,
      subject: 'Password reset',
      text: `Click the link to reset your password ${resetUrl}`,
      html: `<a href="${resetUrl}">Reset your password</a>`,
    })
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { resetToken: token },
    });
    if (!user || user.resetTokenExpiry < new Date()) {
      throw new Error('Invalid or expired token');
    }

    // Update password
    const hashedPassword = await bycript.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await this.usersRepository.save(user);
  }

  
  // USERS CRUD

  async findAll() {
    return this.usersRepository.find();
  }

  async update(id: string, updateUser: UpdateUsersDto) {
    const user = await this.usersRepository.preload({
       id,
       ...updateUser
    });

    if(!user) {
      throw new NotFoundException(`Member ${id} not found`)
    }
    return user
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id }
    });

    if (!user) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return this.usersRepository.remove(user);
  }
}
