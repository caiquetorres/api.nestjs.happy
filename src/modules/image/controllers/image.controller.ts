import { Controller } from '@nestjs/common'

import { CreateImagePayload } from '../models/create-image.payload'
import { ImageProxy } from '../models/image.proxy'

import { ImageService } from '../services/image.service'

import { mapCrud } from 'src/utils/crud'

@Controller('orphanages/:orphanageId/images')
export class ImageController {
    public constructor(private readonly imageService: ImageService) {}

    public async create(
        createImagePayload: CreateImagePayload
    ): Promise<ImageProxy | ImageProxy[]> {
        const images = await this.imageService.create(createImagePayload)
        return mapCrud(images)
    }

    public async getOne(imageId: number): Promise<ImageProxy> {
        const entity = await this.imageService.listOne(imageId)
        return entity.toProxy()
    }
}
