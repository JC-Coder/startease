import AppError from "../../common/utils/appError.js";
import {catchAsync} from "../../common/utils/errorHandler.js";
import {UserModel} from "../schemas/user.schema.js";

export const createUser = catchAsync(async (req, res) => {
    const user = await UserModel.create(req.body);

    return res.status(201).json({
        success: true,
        data: user,
        message: 'User created',
    });
})

export const getUserById = catchAsync(async (req, res) => {
    if(!req.params.id){
        throw new AppError('User id is required', 400);
    }

    const user = await UserModel.findById(req.params.id);

    if (!user){
        throw new AppError('User not found', 404);
    }

    return res.status(200).json({
        success: true,
        data: user
    });
})