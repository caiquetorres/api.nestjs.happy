import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module';
import { ImageModule } from './modules/image/image.module';
import { OrphanageModule } from './modules/orphanage/orphanage.module';

@Module({
    imports: [AuthModule, UserModule, ImageModule, OrphanageModule]
})
export class AppModule {}
