import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AwsCognitoService } from "./aws-cognito.service";
import AuthRegisterUserDto from "src/@core/domain/dto/auth-register-user-aws";
import AuthLoginUserDto from "src/@core/domain/dto/auth-login-user-aws";

@Controller('api/v1/auth')
export class AWSAuthController {
    constructor(private awsCognitoService: AwsCognitoService) {}

    @Post('/register')
    async register(@Body() authRegisterDTO: AuthRegisterUserDto) {
        return await this.awsCognitoService.registerUser(authRegisterDTO)
    }

    @Post('/login')
    @UsePipes(ValidationPipe)
    async login(@Body() authLoginUserDto: AuthLoginUserDto) {
        return await this.awsCognitoService.authenticateUser(authLoginUserDto)
    }
}