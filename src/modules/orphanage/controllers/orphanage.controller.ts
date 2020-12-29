import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put
} from '@nestjs/common'
import {
    CrudRequest,
    GetManyDefaultResponse,
    ParsedRequest
} from '@nestjsx/crud'

import { CreateOrphanagePayload } from '../models/create-orphanage.payload'
import { OrphanageProxy } from '../models/orphanage.proxy'
import { UpdateOrphanagePayload } from '../models/update-orphanage.payload'

import { OrphanageService } from '../services/orphanage.service'

import { mapCrud } from 'src/utils/crud'

@Controller('orphanages')
export class OrphanageController {
    public constructor(private readonly orphanageService: OrphanageService) {}

    @Post()
    public async create(
        @Body() createOrphanagePayload: CreateOrphanagePayload
    ): Promise<OrphanageProxy> {
        const entity = await this.orphanageService.create(
            createOrphanagePayload
        )
        return entity.toProxy()
    }

    @Get(':id')
    public async get(
        @Param('id') orphanageId: number
    ): Promise<OrphanageProxy> {
        const entity = await this.orphanageService.listOne(orphanageId)
        return entity.toProxy()
    }

    @Get()
    public async getMany(
        @ParsedRequest() crudRequest: CrudRequest
    ): Promise<GetManyDefaultResponse<OrphanageProxy> | OrphanageProxy[]> {
        const getMany = await this.orphanageService.listMany(crudRequest)
        return mapCrud(getMany)
    }

    @Get('/pendents')
    public async getManyPendents(
        @ParsedRequest() crudRequest: CrudRequest
    ): Promise<GetManyDefaultResponse<OrphanageProxy> | OrphanageProxy[]> {
        const originalSearchParams = [...crudRequest.parsed.search.$and]
        crudRequest.parsed.search = {
            $and: [{ pendent: true }, ...originalSearchParams]
        }

        const getMany = await this.orphanageService.listMany(crudRequest)
        return mapCrud(getMany)
    }

    @Get('/not-pendents')
    public async getManyNotPendents(
        @ParsedRequest() crudRequest: CrudRequest
    ): Promise<GetManyDefaultResponse<OrphanageProxy> | OrphanageProxy[]> {
        const originalSearchParams = [...crudRequest.parsed.search.$and]
        crudRequest.parsed.search = {
            $and: [{ pendent: false }, ...originalSearchParams]
        }

        const getMany = await this.orphanageService.listMany(crudRequest)
        return mapCrud(getMany)
    }

    @Put('/:id/accept')
    public async acceptPendecy(
        @Param('id') orphanageId: number
    ): Promise<void> {
        await this.orphanageService.update(orphanageId, { pendent: true })
    }

    @Patch(':id')
    public async update(
        @Param('id') orphanageId: number,
        @Body() updateOrphanagePayload: UpdateOrphanagePayload
    ): Promise<void> {
        await this.orphanageService.update(orphanageId, updateOrphanagePayload)
    }

    @Delete(':id')
    public async delete(@Param('id') orphanageId: number): Promise<void> {
        await this.orphanageService.delete(orphanageId)
    }
}
