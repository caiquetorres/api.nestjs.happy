import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from '../entities/user.entity'

import { CreateUserPayload } from '../models/create-user.payload'
import { UpdateUserPayload } from '../models/update-user.payload'

import { encryptPassword } from 'src/utils/password'
import { RequestUser } from 'src/utils/type.shared'
import { hasPermission } from 'src/utils/validations'

import * as DefaultValidationMessages from '../../../models/default-validation-messages'
import { RoleTypes } from 'src/models/roles.enum'

/**
 * The main app's user service
 */
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
            roles: roles ?? RoleTypes.ADMIN,
            ...rest
        })

        return await entity.save()
    }

    /**
     * Method that can return only one user entity from the database
     * @param userId stores the user id
     */
    public async listOne(userId: number): Promise<UserEntity> {
        const entity = await UserEntity.findOne({ id: userId })

        if (!entity)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFound(userId)
            )

        return entity
    }

    /**
     * Method that can change some entity data based on it payload
     * @param requestUser stores the user base data
     * @param userId stores the user id
     * @param updateUserPayload stores the new user data
     */
    public async update(
        requestUser: RequestUser,
        userId: number,
        updateUserPayload: UpdateUserPayload
    ): Promise<void> {
        if (!hasPermission(requestUser, userId))
            throw new UnauthorizedException(
                DefaultValidationMessages.unauthorized
            )

        const existsUser = await UserEntity.exists(userId)
        if (!existsUser)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFound(userId)
            )

        await UserEntity.update({ id: userId }, updateUserPayload)
    }

    /**
     * Method that can delete some user from the database
     * @param requestUser stores the user base data
     * @param userId stores the user id
     */
    public async delete(
        requestUser: RequestUser,
        userId: number
    ): Promise<void> {
        if (!hasPermission(requestUser, userId))
            throw new UnauthorizedException(
                DefaultValidationMessages.unauthorized
            )

        const existsUser = await UserEntity.exists(userId)
        if (!existsUser)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFound(userId)
            )

        await UserEntity.delete({ id: userId })
    }
}
