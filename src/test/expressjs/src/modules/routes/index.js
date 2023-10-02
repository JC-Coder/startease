import {Router} from "express";

const router = Router();
import {userRoutes} from "./user.route.js";


export const setRoutes = () => {
    router.use('/user', userRoutes());
    return router;
};