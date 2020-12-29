export const isBoolean = 'It is required to send a valid boolean value.'
export const isArray = 'It is required send a valid array.'
export const isNumber = 'It is required to send a number.'
export const isString = 'It is required to send a valid text.'
export const isJSON = 'It is required send a valid JSON.'
export const isUrl = 'It is required to send a valid url.'
export const isBase64 = 'It is required to send a valid base64 string.'
export const isEmail = 'It is required to send a valid e-mail.'
export const isMobilePhone =
    'It is required to send a valid telephone number. Ex: (015) 90000-0000'
export const isNotEmpty = 'It is not allowed to send a blanck text.'
export const unauthorized = 'You have no permission to access those sources'

export function entityNotFoundDefaultMessage(
    identifier: string | number
): string {
    return `The entity identified by ${identifier} was not found`
}
