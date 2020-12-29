import { Column, Entity } from 'typeorm'

import { BaseEntity } from 'src/common/base-entity'

import { ToProxy } from '../../../common/to-proxy'
import { UserProxy } from '../models/user.proxy'

@Entity('users')
export class UserEntity extends BaseEntity implements ToProxy<UserProxy> {
    public constructor(partial: Partial<UserEntity>) {
        super()
        Object.assign(this, partial)
    }

    @Column({
        type: 'varchar',
        length: 30,
        nullable: false
    })
    public email: string

    @Column({
        type: 'varchar',
        nullable: false
    })
    public password: string

    @Column({
        type: 'varchar',
        length: 30,
        nullable: false
    })
    public phone: string

    @Column({
        type: 'varchar',
        length: 20,
        nullable: true
    })
    public roles: string

    public toProxy(): UserProxy {
        return new UserProxy(this)
    }
}
