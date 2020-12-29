import { Column, Entity, ManyToOne } from 'typeorm'

import { BaseEntity } from 'src/common/base-entity'
import { OrphanageEntity } from 'src/modules/orphanage/entities/orphanage.entity'

@Entity('images')
export class ImageEntity extends BaseEntity {
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
}
