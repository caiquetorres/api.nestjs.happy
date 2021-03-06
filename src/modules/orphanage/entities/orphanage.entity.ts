import { Column, Entity, OneToMany } from 'typeorm'

import { BaseEntity } from 'src/common/base-entity'
import { ImageEntity } from 'src/modules/image/entities/image.entity'

import { OrphanageProxy } from '../models/orphanage.proxy'
import { ToProxy } from 'src/common/to-proxy'

@Entity('orphanages')
export class OrphanageEntity extends BaseEntity
    implements ToProxy<OrphanageProxy> {
    public constructor(partial: Partial<OrphanageEntity>) {
        super()
        Object.assign(this, partial)
    }

    @Column({
        type: 'varchar',
        nullable: false
    })
    public local: string

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    public name: string

    @Column({
        type: 'text',
        nullable: false
    })
    public about: string

    @Column({
        type: 'varchar',
        length: 15,
        nullable: false
    })
    public whatsapp: string

    @Column({
        type: 'text',
        nullable: false
    })
    public instructions: string

    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    public openOnWeekends: boolean

    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    public pendent: boolean

    @OneToMany(
        () => ImageEntity,
        image => image.orphanage
    )
    public images: ImageEntity[]

    public toProxy(): OrphanageProxy {
        return new OrphanageProxy(this)
    }
}
