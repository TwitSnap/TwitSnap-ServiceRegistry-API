export class StatusNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, StatusNotFoundError.prototype);
    }
}