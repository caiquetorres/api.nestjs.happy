import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
    UseInterceptors
} from '@nestjs/common'
import {
    Crud,
    CrudRequest,
    CrudRequestInterceptor,
    GetManyDefaultResponse,
    ParsedRequest
} from '@nestjsx/crud'

import { Roles } from 'src/decorators/roles/roles.decorator'

import { JwtAuthGuard } from 'src/guards/jwt/jwt.guard'
import { RolesAuthGuard } from 'src/guards/roles/roles.guard'

import { ImageEntity } from '../entities/image.entity'

import { CreateImagePayload } from '../models/create-image.payload'
import { ImageProxy } from '../models/image.proxy'

import { ImageService } from '../services/image.service'

import { mapCrud } from 'src/utils/crud'

import { RoleTypes } from 'src/models/roles.enum'

/**
 * The main app's image controller
 */
@Crud({
    model: {
        type: ImageEntity
    },
    params: {
        orphanageId: {
            disabled: true
        }
    },
    query: {
        join: {
            orphanage: {}
        }
    }
})
@Controller('orphanages/:orphanageId/images')
export class ImageController {
    public constructor(private readonly imageService: ImageService) {}

    /**
     * Method that can create a new image and save it in the database
     * @param orphanageId stores the orphanage id
     * @param createImagePayload stores the new image data
     */
    @Post()
    public async create(
        @Param('orphanageId') orphanageId: number,
        @Body() createImagePayload: CreateImagePayload
    ): Promise<ImageProxy[]> {
        const images = await this.imageService.create(
            orphanageId,
            createImagePayload
        )
        return images.map(entity => entity.toProxy())
    }

    /**
     * Method that can return only one image entity from the database
     * @param imageId stores the image id
     */
    @Get(':imageId')
    public async getOne(
        @Param('imageId') imageId: number
    ): Promise<ImageProxy> {
        const entity = await this.imageService.listOne(imageId)
        return entity.toProxy()
    }

    /**
     * Method that can return all the image entities from the database
     * based on the crud request parameter data
     * @param crudRequest stores the user request parameters
     */
    @UseInterceptors(CrudRequestInterceptor)
    @Get()
    public async getMany(
        @Param('orphanageId') orphanageId: number,
        @ParsedRequest() crudRequest: CrudRequest
    ): Promise<GetManyDefaultResponse<ImageProxy> | ImageProxy[]> {
        const getMany = await this.imageService.listMany(
            orphanageId,
            crudRequest
        )
        return mapCrud(getMany)
    }

    /**
     * Method that can delete some entity from the database
     * @param imageId stores the image id
     */
    @UseGuards(RolesAuthGuard)
    @Roles(RoleTypes.ADMIN)
    @UseGuards(JwtAuthGuard)
    @Delete(':imageId')
    public async delete(@Param('imageId') imageId: number): Promise<void> {
        await this.imageService.delete(imageId)
    }
}
