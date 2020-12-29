import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'

import { ImageEntity } from '../entities/image.entity'
import { OrphanageEntity } from 'src/modules/orphanage/entities/orphanage.entity'

import { CreateImagePayload } from '../models/create-image.payload'
import { ImageProxy } from '../models/image.proxy'

import * as DefaultValidationMessages from '../../../models/default-validation-messages'

@Injectable()
export class ImageService extends TypeOrmCrudService<ImageEntity> {
    public constructor(
        @InjectRepository(ImageEntity)
        private readonly repository: Repository<ImageEntity>
    ) {
        super(repository)
    }

    public async create(
        saveImagePayload: CreateImagePayload
    ): Promise<ImageEntity | ImageEntity[]> {
        const { orphanageId, imagesUrl } = saveImagePayload

        const orphanage = await OrphanageEntity.findOne({
            id: orphanageId
        })
        if (!orphanage)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFound(orphanageId)
            )

        return this.repository.save(
            imagesUrl.map<Partial<ImageEntity>>(imageUrl => ({
                imageUrl,
                orphanage
            }))
        )
    }

    public async listOne(imageId: number): Promise<ImageProxy> {
        const entity = await ImageEntity.findOne({ id: imageId })

        if (!entity)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFound(imageId)
            )

        return entity
    }

    public async listMany(
        crudRequest: CrudRequest
    ): Promise<GetManyDefaultResponse<ImageProxy> | ImageProxy[]> {
        return this.getMany(crudRequest)
    }

    public async delete(imageId: number): Promise<void> {
        const existsImage = await OrphanageEntity.exists(imageId)
        if (!existsImage)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFound(imageId)
            )

        await ImageEntity.delete({ id: imageId })
    }
}
