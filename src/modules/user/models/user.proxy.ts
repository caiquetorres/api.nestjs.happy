import { UserEntity } from '../entities/user.entity'

export class UserProxy {
    public email: string
    public phone: string
    public roles: string

    public constructor(entity: UserEntity) {
        this.email = entity.email
        this.phone = entity.phone
        this.roles = entity.roles
    }
}
