export default {};

/**
 * Wether a url is going outside, or just stays inside
 * @param url
 * @returns True or False
 */
export function externalUrl(url: string){
    return url.match(/^(http(s)?|ftp):\/\//) !== null;
}


/**
 * Checks the inequality of to values
 * @param value Value
 * @param expected What it should be
 * @param error What to display if it is equal
 */
// eslint-disable-next-line
export function assert(value: any, expected: any, error: string) {
    if (value == expected){
        throw TypeError(error);
    }
}
