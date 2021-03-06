import {
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserEntity } from 'src/modules/user/entities/user.entity'

import { LoginPayload } from '../models/login.payload'

import { comparePassword } from 'src/utils/password'
import { RequestUser } from 'src/utils/type.shared'

import * as DefaultValidationErrorMessage from '../../../models/default-validation-messages'

/**
 * The main app's auth service
 */
@Injectable()
export class AuthService {
    public constructor(private readonly jwtService: JwtService) {}

    /**
     * Method that can return the token
     * @param requestUser stores the base data
     */
    public async signIn(requestUser: RequestUser): Promise<string> {
        return await this.jwtService.signAsync(requestUser)
    }

    /**
     * Method that can validate if the user exists in the database and if
     * the password that is being passed in parameters matches with the one
     * saved in the database
     * @param loginPayload stores the data that will be tested
     */
    public async authenticate(
        loginPayload: LoginPayload
    ): Promise<RequestUser> {
        const { email, password } = loginPayload
        const entity = await UserEntity.findOne({ email })

        if (!entity)
            throw new NotFoundException(
                DefaultValidationErrorMessage.entityNotFound(email)
            )

        const passwordIsMatch = await comparePassword(password, entity.password)

        if (!passwordIsMatch)
            throw new UnauthorizedException(
                DefaultValidationErrorMessage.unauthorized
            )

        return {
            email,
            id: entity.id,
            roles: entity.roles
        }
    }
}
