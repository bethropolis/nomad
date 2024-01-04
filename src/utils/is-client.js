/**
 * Checks if the code is running on the client-side.
 *
 * @return {boolean} Returns true if the code is running on the client-side, false otherwise.
 */
export function isClient() {
    return typeof window !== "undefined";
}