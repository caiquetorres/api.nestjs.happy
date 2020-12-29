import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GetManyDefaultResponse } from '@nestjsx/crud'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'

import { ImageEntity } from '../entities/image.entity'

import { ImageProxy } from '../models/image.proxy'

@Injectable()
export class ImageService extends TypeOrmCrudService<ImageEntity> {
    public constructor(
        @InjectRepository(ImageEntity)
        private readonly repository: Repository<ImageEntity>
    ) {
        super(repository)
    }

    public async create(): Promise<ImageProxy> {
        return null
    }

    public async listOne(): Promise<ImageProxy> {
        return null
    }

    public async listMany(): Promise<GetManyDefaultResponse<ImageProxy>> {
        return null
    }

    public async delete(): Promise<void> {
        return null
    }
}
