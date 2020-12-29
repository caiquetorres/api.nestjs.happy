import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ImageEntity } from './entities/image.entity'

import { ImageService } from './services/image.service'

import { ImageController } from './controllers/image.controller'

@Module({
    imports: [TypeOrmModule.forFeature([ImageEntity])],
    controllers: [ImageController],
    providers: [ImageService],
    exports: [ImageService]
})
export class ImageModule {}
