import {
    ConflictException,
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'

import { User } from 'src/decorators/user/user.decorator'

import { UserEntity } from '../entities/user.entity'

import { CreateUserPayload } from '../models/create-user.payload'

import { encryptPassword } from 'src/utils/password'

import * as DefaultValidationMessages from '../../../models/default-validation-messages'
import { RoleTypes } from 'src/models/roles.enum'

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
    public constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>
    ) {
        super(repository)
    }

    /**
     * Method that can create a new user and save it in the database
     * @param createUserPayload stores the new user data
     */
    public async create(
        createUserPayload: CreateUserPayload
    ): Promise<UserEntity> {
        const { password, roles, ...rest } = createUserPayload

        const hasUserWithEmail = await UserEntity.findOne({
            email: createUserPayload.email
        })

        if (hasUserWithEmail)
            throw new ConflictException(
                DefaultValidationMessages.entityConflict(
                    createUserPayload.email
                )
            )

        const encryptedPassword = await encryptPassword(password)

        const entity = new UserEntity({
            password: encryptedPassword,
            roles: roles ?? RoleTypes.GUEST,
            ...rest
        })

        return await entity.save()
    }

    /**
     * Method that can return only one user entity from the database
     * @param userId stores the user id
     */
    public async get(userId: number): Promise<UserEntity> {
        const entity = await UserEntity.findOne({ id: userId })

        if (!entity)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFound(userId)
            )

        return entity
    }

    public async update(): Promise<void> {
        return null
    }

    public async delete(): Promise<void> {
        return null
    }
}
