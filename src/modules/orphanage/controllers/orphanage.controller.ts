import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    UseGuards,
    UseInterceptors
} from '@nestjs/common'
import {
    CrudRequest,
    CrudRequestInterceptor,
    GetManyDefaultResponse,
    ParsedRequest
} from '@nestjsx/crud'

import { Roles } from 'src/decorators/roles/roles.decorator'

import { JwtAuthGuard } from 'src/guards/jwt/jwt.guard'
import { RolesAuthGuard } from 'src/guards/roles/roles.guard'

import { CreateOrphanagePayload } from '../models/create-orphanage.payload'
import { OrphanageProxy } from '../models/orphanage.proxy'
import { UpdateOrphanagePayload } from '../models/update-orphanage.payload'

import { OrphanageService } from '../services/orphanage.service'

import { mapCrud } from 'src/utils/crud'

import { RoleTypes } from 'src/models/roles.enum'

/**
 * The main app's orphanage controller
 */
@Controller('orphanages')
export class OrphanageController {
    public constructor(private readonly orphanageService: OrphanageService) {}

    /**
     * Method that can create a new orphanage and save it in the database
     * @param createOrphanagePayload stores the new orphanage data
     */
    @Post()
    public async create(
        @Body() createOrphanagePayload: CreateOrphanagePayload
    ): Promise<OrphanageProxy> {
        const entity = await this.orphanageService.create(
            createOrphanagePayload
        )
        return entity.toProxy()
    }

    /**
     * Method that can return only one orphanage entity from the database
     * @param orphanageId stores the orphanage id
     */
    @Get(':id')
    public async getOne(
        @Param('id') orphanageId: number
    ): Promise<OrphanageProxy> {
        const entity = await this.orphanageService.listOne(orphanageId)
        return entity.toProxy()
    }

    /**
     * Method that can return all the orphanages entities from the database
     * based on the crud request parameter data
     * @param crudRequest stores the user request parameters
     */
    @UseInterceptors(CrudRequestInterceptor)
    @Get()
    public async getMany(
        @ParsedRequest() crudRequest: CrudRequest
    ): Promise<GetManyDefaultResponse<OrphanageProxy> | OrphanageProxy[]> {
        const getMany = await this.orphanageService.listMany(crudRequest)
        return mapCrud(getMany)
    }

    /**
     * Method that can return all the orphanages that are not pendent from
     * the database
     * @param crudRequest stores the user request parameters
     */
    @UseInterceptors(CrudRequestInterceptor)
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

    /**
     * Method that can return all the orphanages that are pendent from the
     * database
     * @param crudRequest stores the user request parameters
     */
    @UseGuards(RolesAuthGuard)
    @Roles(RoleTypes.ADMIN)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(CrudRequestInterceptor)
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

    /**
     * Method that can change the "pendent" property of some specific orphanage
     * @param orphanageId stores the orphanage id
     */
    @UseGuards(RolesAuthGuard)
    @Roles(RoleTypes.ADMIN)
    @UseGuards(JwtAuthGuard)
    @Put('/:id/accept')
    public async acceptPendecy(
        @Param('id') orphanageId: number
    ): Promise<void> {
        await this.orphanageService.update(orphanageId, { pendent: true })
    }

    /**
     * Method that can change some entity data based on it payload
     * @param orphanageId stores the orphanage id
     * @param updateOrphanagePayload stores the new orphanage data
     */
    @UseGuards(RolesAuthGuard)
    @Roles(RoleTypes.ADMIN)
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    public async update(
        @Param('id') orphanageId: number,
        @Body() updateOrphanagePayload: UpdateOrphanagePayload
    ): Promise<void> {
        await this.orphanageService.update(orphanageId, updateOrphanagePayload)
    }

    /**
     * Method that can delete some entity from the database
     * @param orphanageId stores the orphanage data
     */
    @UseGuards(RolesAuthGuard)
    @Roles(RoleTypes.ADMIN)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    public async delete(@Param('id') orphanageId: number): Promise<void> {
        await this.orphanageService.delete(orphanageId)
    }
}
