import {
    Controller,
    Get,
    Param,
    Post,
    UnsupportedMediaTypeException,
    UseGuards
} from '@nestjs/common'

import { User } from 'src/decorators/user/user.decorator'

import { JwtAuthGuard } from 'src/guards/jwt/jwt.guard'

import { CreateUserPayload } from '../models/create-user.payload'
import { UserProxy } from '../models/user.proxy'

import { UserService } from '../services/user.service'

import { RequestUser } from 'src/utils/type.shared'

/**
 * The main app's user controller
 */
@Controller('users')
export class UserController {
    public constructor(private readonly userService: UserService) {}

    /**
     * Method that can create a new user and save it in the database
     * @param createUserPayload stores the new user data
     */
    @Post()
    public async create(
        createUserPayload: CreateUserPayload
    ): Promise<UserProxy> {
        const entity = await this.userService.create(createUserPayload)
        return entity.toProxy()
    }

    /**
     * Method that can return only one user entity from the database
     * @param userId stores the user id
     */
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async get(@Param('id') userId: number): Promise<UserProxy> {
        const entity = await this.userService.get(userId)
        return entity.toProxy()
    }

    /**
     * Method that can return the logged user data
     * @param requestUser stores the user base data
     */
    @UseGuards(JwtAuthGuard)
    @Get('me')
    public async getMe(@User() requestUser: RequestUser): Promise<UserProxy> {
        const entity = await this.userService.get(requestUser.id)
        return entity.toProxy()
    }
}
