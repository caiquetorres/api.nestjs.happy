import { Module } from '@nestjs/common'

import { AuthService } from './services/auth.service'
import { JwtStrategyService } from './services/jwt.strategy.service'
import { LocalStrategyService } from './services/local.strategy.service'

import { AuthController } from './controllers/auth.controller'

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategyService, LocalStrategyService],
    exports: [AuthService]
})
export class AuthModule {}
