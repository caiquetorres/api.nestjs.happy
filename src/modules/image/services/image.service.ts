import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'

import { ImageEntity } from '../entities/image.entity'
import { OrphanageEntity } from 'src/modules/orphanage/entities/orphanage.entity'

import { CreateImagePayload } from '../models/create-image.payload'

import * as DefaultValidationMessages from '../../../models/default-validation-messages'

/**
 * The main app's image service
 */
@Injectable()
export class ImageService extends TypeOrmCrudService<ImageEntity> {
    public constructor(
        @InjectRepository(ImageEntity)
        private readonly repository: Repository<ImageEntity>
    ) {
        super(repository)
    }

    /**
     * Method that can create a new image and save it in the database
     * @param orphanageId stores the orphanage id
     * @param createImagePayload stores the new image data
     */
    public async create(
        orphanageId: number,
        createImagePayload: CreateImagePayload
    ): Promise<ImageEntity[]> {
        const { imagesUrl } = createImagePayload
        const orphanage = await OrphanageEntity.findOne({
            id: orphanageId
        })
        if (!orphanage)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFound(orphanageId)
            )

        const savedEntities: ImageEntity[] = []

        for (let i = 0; i < imagesUrl.length; i++) {
            const entity = new ImageEntity({
                imageUrl: imagesUrl[i],
                orphanage
            })
            await entity.save()
            savedEntities.push(entity)
        }

        return savedEntities
    }

    /**
     * Method that can return only one image entity from the database
     * @param imageId stores the image id
     */
    public async listOne(imageId: number): Promise<ImageEntity> {
        const entity = await ImageEntity.findOne({ id: imageId })

        if (!entity)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFound(imageId)
            )

        return entity
    }

    /**
     * Method that can return all the image entities from the database
     * based on the crud request parameter data
     * @param crudRequest stores the user request parameters
     */
    public async listMany(
        orphanageId: number,
        crudRequest: CrudRequest
    ): Promise<GetManyDefaultResponse<ImageEntity> | ImageEntity[]> {
        const orphanageExists = await OrphanageEntity.exists(orphanageId)
        if (!orphanageExists)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFound(orphanageId)
            )

        const originalSearchParams = [...crudRequest.parsed.search.$and]
        crudRequest.parsed.join.push({
            field: 'orphanage'
        })
        crudRequest.parsed.search = {
            $and: [{ 'orphanage.id': orphanageId }, ...originalSearchParams]
        }

        return this.getMany(crudRequest)
    }

    /**
     * Method that can delete some entity from the database
     * @param imageId stores the image id
     */
    public async delete(imageId: number): Promise<void> {
        const existsImage = await OrphanageEntity.exists(imageId)
        if (!existsImage)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFound(imageId)
            )

        await ImageEntity.delete({ id: imageId })
    }
}
