import {Router} from "express";
import {createUser, getUserById} from "../controllers/user.controller.js";

const router = Router();

export const userRoutes = () => {
    /**
     * get user
     */
    router.post('/', createUser)

    /**
     * get user by id
     */
    router.get('/:id', getUserById)

    return router;
}