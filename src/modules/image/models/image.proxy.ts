import { ImageEntity } from '../entities/image.entity'

import { OrphanageProxy } from 'src/modules/orphanage/models/orphanage.proxy'

export class ImageProxy {
    public imageUrl: string
    public orphanage?: OrphanageProxy

    public constructor(entity: ImageEntity) {
        this.imageUrl = entity.imageUrl
        this.orphanage = entity.orphanage
            ? entity.orphanage.toProxy()
            : undefined
    }
}
