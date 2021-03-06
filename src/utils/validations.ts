import { RoleTypes } from '../models/roles.enum'
import { isNullOrUndefined } from './functions'
import { RequestUser } from './type.shared'

/**
 * Function that can test if the request user has the type "ADMIM"
 * @param requestUser stores the user basic data
 */
export function isAdminUser(requestUser: RequestUser): boolean {
    return (
        requestUser &&
        requestUser.roles &&
        hasRole(requestUser.roles, RoleTypes.ADMIN)
    )
}

/**
 * Function that can compare roles
 * @param roles stores the roles that will be compared
 * @param targetRoles stores one or more roles that will be compared as well
 */
export function hasRole(roles: string, targetRoles: string): boolean {
    return (
        !isNullOrUndefined(roles) &&
        roles.split('|').some(role => role === targetRoles)
    )
}

/**
 * Function that can check if the user (identified by "id") has the permission
 * @param userId stores the user id
 * @param requestUser stores the user basic data
 */
export function hasPermission(
    requestUser: RequestUser,
    userId: number
): boolean {
    return (
        requestUser.id == userId || hasRole(requestUser.roles, RoleTypes.ADMIN)
    )
}
