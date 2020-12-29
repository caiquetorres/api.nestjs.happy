import { Controller } from '@nestjs/common'

import { User } from 'src/decorators/user/user.decorator'

import { TokenProxy } from '../models/token.proxy'

import { AuthService } from '../services/auth.service'

import { RequestUser } from 'src/utils/type.shared'

@Controller('auth')
export class AuthController {
    public constructor(private readonly authService: AuthService) {}

    /**
     * Method that can return the token
     * @param requestUser stores the base data
     */
    public async signIn(@User() requestUser: RequestUser): Promise<TokenProxy> {
        const token = await this.authService.signIn(requestUser)
        return { token }
    }
}
