export default class AppError extends Error {
    constructor(code, message, cause = null) {
        super(message + (cause ? `，原因：${cause.message}` : ''));
        this.code = code;
        this.cause = cause;
    }
}
