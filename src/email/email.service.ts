import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as Mail from 'nodemailer/lib/mailer';
import { dbUsers } from 'src/constants/user';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name)
    private nodemailerTransport: Mail; 

    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {
        this.nodemailerTransport = ({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: configService.get('EMAIL_USER'),
                pass: configService.get('EMAIL_PASSWORD')
            }
        });
    }

    private sendMail(options: Mail.options) {
        this.logger.log(`Email send to`, options.to)
        return this.nodemailerTransport.sendMail(options)
    }

    public async decodeConfirmationToken(token: string) {
        try {
            const payload = await this.jwtService.verify(token, {
                secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET')
            })
            
            if(typeof payload === 'object' && 'email' in payload) {
                return payload.mail;
            }
            throw new BadRequestException()

        } catch (error) {
            if(error?.name === 'TokenExpiredError') {
                throw new BadRequestException(
                    'Email token expired'
                )
            }
            throw new BadRequestException('Bad Confirmation token') 
        }
    }

    public async sendResetPasswordLink(email: string): Promise<void> {
        const payload = { email };

        const token = this.jwtService.sign(payload, {
           secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
           expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`
        });

        const user = dbUsers.find((user) => user.email === email);
        user.resetToken = token;

        const url = `${this.configService.get('EMAIL_RESET_PASSWORD_URL')}?token=${token}`

        const text = `Hi, \nTo reset your password, click here: ${url}`;

        return this.sendMail({
            to: email,
            subject: 'Reset your password',
            text
        })
    }
}
