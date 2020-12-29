import { Module } from '@nestjs/common'

import { AuthService } from './services/auth.service'
import { JwtStrategyService } from './services/jwt.strategy.service'
import { LocalStrategyService } from './services/local.strategy.service'

@Module({
    providers: [AuthService, JwtStrategyService, LocalStrategyService],
    exports: [AuthService]
})
export class AuthModule {}
