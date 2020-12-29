import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { OrphanageEntity } from './entities/orphanage.entity'

import { OrphanageService } from './services/orphanage.service'

import { OrphanageController } from './controllers/orphanage.controller'

@Module({
    imports: [TypeOrmModule.forFeature([OrphanageEntity])],
    controllers: [OrphanageController],
    providers: [OrphanageService],
    exports: [OrphanageService]
})
export class OrphanageModule {}
