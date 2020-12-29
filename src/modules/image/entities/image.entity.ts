import { Column, Entity, ManyToOne } from 'typeorm'

import { BaseEntity } from 'src/common/base-entity'
import { OrphanageEntity } from 'src/modules/orphanage/entities/orphanage.entity'

import { ImageProxy } from '../models/image.proxy'
import { ToProxy } from 'src/common/to-proxy'

@Entity('images')
export class ImageEntity extends BaseEntity implements ToProxy<ImageProxy> {
    public constructor(partial: Partial<ImageEntity>) {
        super()
        Object.assign(this, partial)
    }

    @Column({
        type: 'text',
        nullable: false
    })
    public imageUrl: string

    @ManyToOne(
        () => OrphanageEntity,
        orphanage => orphanage.images,
        {
            onDelete: 'CASCADE'
        }
    )
    public orphanage: OrphanageEntity

    public toProxy(): ImageProxy {
        return new ImageProxy(this)
    }
}
