import { NextFunction, Request, Response } from "express";
import { LoginRegisterUserRequest, UserResponse } from "../models/user-model";
import { UserService } from "../services/user-service";
import { UserRequest } from "../types/user-request";

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            //pass the info (parameters)
            const request: LoginRegisterUserRequest = req.body as LoginRegisterUserRequest
            //hubungkan antara userservice dan routing
            const response: UserResponse = await UserService.register(request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginRegisterUserRequest = req.body as LoginRegisterUserRequest
            const response: UserResponse = await UserService.login(request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    //so can take user, type data User
    static async logout(req: UserRequest, res:Response, next: NextFunction) {
        try {
            const  response = await UserService.logout(req.user!)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}