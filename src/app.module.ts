import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './modules/auth/auth.module'
import { ImageModule } from './modules/image/image.module'
import { OrphanageModule } from './modules/orphanage/orphanage.module'
import { UserModule } from './modules/user/user.module'

@Module({
    imports: [
        AuthModule,
        UserModule,
        ImageModule,
        OrphanageModule,
        TypeOrmModule.forRoot(),
        ConfigModule.forRoot({
            envFilePath: '.env'
        })
    ]
})
export class AppModule {}
