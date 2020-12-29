import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { AuthService } from './auth.service'

import { RequestUser } from 'src/utils/type.shared'

import { Strategy } from 'passport-local'

/**
 * The local strategy class
 *
 * This class stores the logic needed to validate the user credentials
 */
@Injectable()
export class LocalStrategyService extends PassportStrategy(Strategy) {
    public constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        })
    }

    /**
     * Method that will test the data that the user is trying to send
     * @param username stores the email value - must be "username" - that will be tested
     * @param password stores the password value that will be tested
     */
    public async validate(
        username: string,
        password: string
    ): Promise<RequestUser> {
        return this.authService.authenticate({ email: username, password })
    }
}
