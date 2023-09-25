/**
 * Create a new instance of the AppError class.
 *
 * @param {string} message - The error message.
 * @param {number} statusCode - The HTTP status code associated with the error.
 * @param {boolean} [isOperational=true] - Indicates if the error is operational or not.
 * @param {string} [stack=''] - The error stack trace.
 */

export default class AppError extends Error {
        constructor(message, statusCode, data) {
            super(message);

            this.statusCode = statusCode;
            this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
            this.isOperational = true;
            this.data = data;

            Error.captureStackTrace(this, this.constructor);
        }
}