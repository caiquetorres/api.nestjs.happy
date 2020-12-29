import { GetManyDefaultResponse } from '@nestjsx/crud'

import { ToProxy } from 'src/common/to-proxy'

/**
 * Function that can convert all the entities that were being passed in their
 * respective proxies
 * @param value stores the complete data that is returned from the service
 * class
 * @param params stores the default params that, if exists, will be passed
 * in the "ToProxy" method params parameter
 */
export function mapCrud<
    TEntity extends ToProxy<ReturnType<TEntity['toProxy']>>
>(
    value: TEntity | TEntity[],
    ...params: Parameters<TEntity['toProxy']>
): ReturnType<TEntity['toProxy']> | ReturnType<TEntity['toProxy']>[]

/**
 * Function that can convert all the entities that were being passed in their
 * respective proxies
 * @param value stores the complete data that is returned from the service
 * class
 * @param params stores the default params that, if exists, will be passed
 * in the "ToProxy" method params parameter
 */
export function mapCrud<
    TEntity extends ToProxy<ReturnType<TEntity['toProxy']>>
>(
    value: TEntity[] | GetManyDefaultResponse<TEntity>,
    ...params: Parameters<TEntity['toProxy']>
):
    | ReturnType<TEntity['toProxy']>[]
    | GetManyDefaultResponse<ReturnType<TEntity['toProxy']>>

/**
 * Function that can convert all the entities that were being passed in their
 * respective proxies
 * @param value stores the complete data that is returned from the service
 * class
 * @param params stores the default params that, if exists, will be passed
 * in the "ToProxy" method params parameter
 */
export function mapCrud<
    TEntity extends ToProxy<ReturnType<TEntity['toProxy']>>
>(
    value: TEntity | TEntity[] | GetManyDefaultResponse<TEntity>,
    ...params: Parameters<TEntity['toProxy']>
):
    | ReturnType<TEntity['toProxy']>
    | ReturnType<TEntity['toProxy']>[]
    | GetManyDefaultResponse<ReturnType<TEntity['toProxy']>> {
    if (Array.isArray(value))
        return value.map(entity => entity.toProxy(...params))

    if (isGetMany(value))
        return {
            ...value,
            data: value.data.map(entity => entity.toProxy(...params))
        }

    return value.toProxy()
}

/**
 * Function that checks if the "value" parameter is of the type
 * "GetManyDefautlResponse"
 * @param value stores the data that will be validated
 */
export function isGetMany<
    TEntity extends ToProxy<ReturnType<TEntity['toProxy']>>
>(
    value: TEntity | TEntity[] | GetManyDefaultResponse<TEntity>
): value is GetManyDefaultResponse<TEntity> {
    return hasDataProperty(value) && Array.isArray(value.data)
}

/**
 * Function that checks if the "value" parameter has the "data" property
 * @param value stores the data that will be validated
 */
export function hasDataProperty(value: unknown): value is { data: unknown[] } {
    return value.hasOwnProperty('data')
}
