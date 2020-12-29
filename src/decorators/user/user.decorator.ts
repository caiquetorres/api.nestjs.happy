import { createParamDecorator, ExecutionContext } from '@nestjs/common'

/**
 * Decorator that can get from the request the user property
 */
export const User = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        return context.switchToHttp().getRequest().user
    }
)
