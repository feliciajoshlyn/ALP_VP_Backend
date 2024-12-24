import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response.error";

export const authMiddleWare = async (
    req: UserRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.get("X-API-TOKEN")

    if(token){
        const user = await prismaClient.user.findFirst({
            where:{
                token: token
            }
        })

        if(user){
            //masukin user ke logged in user
            req.user = user
            //lanjut ke previous activity / next
            next()

            return
        }
    }

    next(new ResponseError(403, "You are forbidden to access this page"))
}