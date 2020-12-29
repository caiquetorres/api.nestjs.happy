import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'

import { RequestUser } from 'src/utils/type.shared'

import { ExtractJwt, Strategy } from 'passport-jwt'

/**
 * The jwt strategy class
 *
 * This class store all the logic needed to validate the token sended in
 * the headers
 */
@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
    public constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET')
        })
    }

    /**
     * Method that, if the token matches, will be called to put some data
     * in the request
     * @param requestUser stores the user base data
     */
    public async validate(requestUser: RequestUser): Promise<RequestUser> {
        return requestUser
    }
}
