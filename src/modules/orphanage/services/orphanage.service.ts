import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'

import { OrphanageEntity } from '../entities/orphanage.entity'

import { CreateOrphanagePayload } from '../models/create-orphanage.payload'
import { UpdateOrphanagePayload } from '../models/update-orphanage.payload'

import * as DefaultValidationMessages from '../../../models/default-validation-messages'

/**
 * The main app's orphanage service
 */
@Injectable()
export class OrphanageService extends TypeOrmCrudService<OrphanageEntity> {
    public constructor(
        @InjectRepository(OrphanageEntity)
        repository: Repository<OrphanageEntity>
    ) {
        super(repository)
    }

    /**
     * Method that can create a new orphanage and save it in the database
     * @param createOrphanagePayload stores the new orphanage data
     */
    public async create(
        createOrphanagePayload: CreateOrphanagePayload
    ): Promise<OrphanageEntity> {
        const entity = new OrphanageEntity({
            ...createOrphanagePayload,
            pendent: true
        })

        return await entity.save()
    }

    /**
     * Method that can return only one orphanage entity from the database
     * @param orphanageId stores the orphanage id
     */
    public async listOne(orphanageId: number): Promise<OrphanageEntity> {
        const entity = await OrphanageEntity.findOne({ id: orphanageId })

        if (!entity)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFound(orphanageId)
            )

        return entity
    }

    /**
     * Method that can return all the orphanages entities from the database
     * based on the crud request parameter data
     * @param crudRequest stores the user request parameters
     */
    public async listMany(
        crudRequest: CrudRequest
    ): Promise<GetManyDefaultResponse<OrphanageEntity> | OrphanageEntity[]> {
        return await this.getMany(crudRequest)
    }

    /**
     * Method that can change some entity data based on it payload
     * @param orphanageId stores the orphanage id
     * @param updateOrphanagePayload stores the new orphanage data
     */
    public async update(
        orphanageId: number,
        updateOrphanagePayload: UpdateOrphanagePayload
    ): Promise<void> {
        const existsUser = await OrphanageEntity.exists(orphanageId)
        if (!existsUser)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFound(orphanageId)
            )

        await OrphanageEntity.update(
            { id: orphanageId },
            updateOrphanagePayload
        )
    }

    /**
     * Method that can delete some entity from the database
     * @param orphanageId stores the orphanage data
     */
    public async delete(orphanageId: number): Promise<void> {
        const existsUser = await OrphanageEntity.exists(orphanageId)
        if (!existsUser)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFound(orphanageId)
            )

        await OrphanageEntity.delete({ id: orphanageId })
    }
}
