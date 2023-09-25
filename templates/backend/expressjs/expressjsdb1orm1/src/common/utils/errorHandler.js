import timeout from "connect-timeout";
import {ENVIRONMENT} from "../config/environment.js";
import {logger} from "./logger.js";

/**
 * Wraps an async function to handle errors.
 *
 * @param {function} fn - The async function to be wrapped.
 * @return {function} - The wrapped function.
 */
export const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => next(err));
    };
};

/**
 * Error handler
 */
export const handleError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Something went wrong";
    err.data = err.data || null;

    const { statusCode, message, data } = err;

    logger.error(
        `${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );

    if (err.timeout) {
        return res.status(408).send({
            success: false,
            data: null,
            message: "Request timeout",
        });
    }

    if (statusCode === 404) {
        return res.status(statusCode).json({
            success: false,
            data: null,
            message: message ?? "resource not found",
        });
    }

    if (ENVIRONMENT.APP.ENV === 'local') {
        console.log("==== Error ==== : ", err.stack);

        return res.status(statusCode).json({
            success: false,
            data: data,
            message: message,
            stackTrace: err.stack,
        });
    }

    return res.status(statusCode).json({
        success: false,
        data: data,
        message: message,
    });
};

/**
 * Timeout middleware
 */
export const timeoutMiddleware = timeout({
    time: 1000 * 60,
    message: "Request timeout",
});
