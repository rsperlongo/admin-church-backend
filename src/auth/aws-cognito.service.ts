import { Injectable } from "@nestjs/common";
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from "amazon-cognito-identity-js";
import AuthLoginUserDto from "src/@core/domain/dto/auth-login-user-aws";
import AuthRegisterUserDto from "src/@core/domain/dto/auth-register-user-aws";

@Injectable()
export class AwsCognitoService {
    private userPool: CognitoUserPool

    constructor() {
        this.userPool = new CognitoUserPool({
            UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
            ClientId: process.env.AWS_COGNITO_CLIENT_ID,
        })
    }

    async registerUser(authRegisterDTO: AuthRegisterUserDto) {
        const { email, password } = authRegisterDTO;

        return new Promise((resolve, reject) => {
            this.userPool.signUp(
                email,
                password,
                [
                    new CognitoUserAttribute({
                        Name: 'name',
                        Value: email,
                    })
                ],
                null,
                (err, result) => {
                    if (!result) {
                        reject(err)
                    } else {
                        resolve(result.user)
                    }
                }
            )
        })
    }

    async authenticateUser(authLoginUserDto: AuthLoginUserDto) {
        const { email, password } = authLoginUserDto; 
        const userData = {
            Username: email,
            Pool: this.userPool,
        }

        const authenticationDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        });

        const userCognito = new CognitoUser(userData);

        return new Promise((resolve, reject) => {
            userCognito.authenticateUser(authenticationDetails, {
                onSuccess: (result) => {
                    resolve({
                        accesToken: result.getAccessToken().getJwtToken(),
                        refreshToken: result.getRefreshToken().getToken(),
                    });
                },
                onFailure: (err) => {
                    reject()
                }
            })
        })
    }
}