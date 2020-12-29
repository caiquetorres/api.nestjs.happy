import { CustomDecorator, SetMetadata } from '@nestjs/common'

/**
 * Decorator that can set the roles allowed to access some route
 * @param roles stores all the roles allowed
 */
export const Roles = (...roles: string[]): CustomDecorator<string> =>
    SetMetadata('roles', roles)
