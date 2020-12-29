/**
 * Function that can check if the string is null or undefined
 * @param value stores the string data
 */
export function isNullOrUndefined(value: unknown): boolean {
    return value === null || value === undefined
}
