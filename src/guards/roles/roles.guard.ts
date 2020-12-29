import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { RequestUser } from 'src/utils/type.shared'
import * as DefaultValidationMessage from '../../models/default-validation-messages'

@Injectable()
export class RolesAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const roles = new Reflector().get<string[]>(
            'roles',
            context.getHandler()
        )

        if (!roles) return true

        const user: RequestUser = context.switchToHttp().getRequest().user

        if (!user)
            throw new UnauthorizedException(
                DefaultValidationMessage.unauthorized
            )

        const hasRoles = () =>
            user.roles.split('|').some((role: string) => roles.includes(role))

        if (user.roles && hasRoles()) return true

        throw new UnauthorizedException(DefaultValidationMessage.unauthorized)
    }
}
