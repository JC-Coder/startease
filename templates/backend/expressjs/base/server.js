export const EXPRESSJS_SERVER_TEMPLATE = `
import {ENVIRONMENT} from "./common/config/environment.js";
import express from 'express';
import AppError from "./common/utils/appError.js";
import {setRoutes} from "./modules/routes/index.js";
import {catchAsync, handleError, timeoutMiddleware} from "./common/utils/errorHandler.js";
import cors from "cors";
import helmet from "helmet";
import {stream} from "./common/utils/logger.js";
import morgan from 'morgan'
{{database_config_import}}

/**
 * Default app configurations
 */
const app = express();
const port = ENVIRONMENT.APP.PORT;
const appName = ENVIRONMENT.APP.NAME;

/**
 * App Security
 */
app.use(helmet());
app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true}));
app.disable("x-powered-by");

/**
 * Logger Middleware
 */
app.use(
    morgan(ENVIRONMENT.APP.ENV !== "local" ? "combined" : "dev", { stream })
);

// append request time to all request
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

/**
 * Initialize routes
 */
app.use('/', setRoutes())

// catch 404 and forward to error handler
app.all("*", catchAsync(async (req, res) => {
    throw new AppError('route not found', 404)
}));


/**
 * Error handler middlewares
 */
app.use(timeoutMiddleware);
app.use(handleError);


/**
 * status check
 */
app.get("*", (req, res) =>
    res.send({
        Time: new Date(),
        status: "running",
    })
);


/**
 * Bootstrap server
 */
app.listen(port, () => {
        console.log('=> ' + appName + 'app listening on port' + port +'!')
        {{database_config}}
    }
);
`;
