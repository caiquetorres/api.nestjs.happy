import { UserEntity } from '../entities/user.entity'

export class UserProxy {
    public id: number
    public email: string
    public phone: string
    public roles: string

    public constructor(entity: UserEntity) {
        this.id = entity.id
        this.email = entity.email
        this.phone = entity.phone
        this.roles = entity.roles
    }
}
