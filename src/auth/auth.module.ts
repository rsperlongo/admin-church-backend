import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from './local.auth';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from 'src/@core/domain/entities/users.entity';
import { AwsCognitoService } from './aws-cognito.service';
import { AWSAuthController } from './aws-auth.controller';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
    //  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [AuthService, AwsCognitoService, UsersService, LocalStrategy],
  controllers: [AuthController, AWSAuthController],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
