import { ImageEntity } from '../entities/image.entity'

export class ImageProxy {
    public id: number
    public imageUrl: string

    public constructor(entity: ImageEntity) {
        this.id = entity.id
        this.imageUrl = entity.imageUrl
    }
}
