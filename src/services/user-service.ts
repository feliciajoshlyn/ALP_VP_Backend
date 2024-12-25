import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response.error";
import { LoginRegisterUserRequest, toUserResponse, UserResponse } from "../models/user-model";
import { UserValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"
import { WAMService } from "./wam-service";


export class UserService {
    //register user
    static async register(req: LoginRegisterUserRequest):Promise<UserResponse>{
        //validate Request
        const registerRequest = Validation.validate(
            UserValidation.LOGREG,
            req
        )

        //check username
        const username = await prismaClient.user.findFirst({
            where: {
                username: registerRequest.username
            }
        })

        if(username) {
            throw new ResponseError(400, "Username already exists")
        }

        //hash password
        registerRequest.password = await bcrypt.hash(
            //10 as default
            registerRequest.password, 10
        )

        const user = await prismaClient.user.create({
            data: {
                username: registerRequest.username,
                password: registerRequest.password,
                token: uuid()
            }
        })

        await WAMService.createWAMData(user);

        return toUserResponse(user)
    }

    //pakai regis cz is the same for the parameters
    static async login(req: LoginRegisterUserRequest): Promise<UserResponse>{
        //validate first
        const loginRequest = Validation.validate(
            UserValidation.LOGREG,
            req
        )

        let user = await prismaClient.user.findFirst({
            where: {
                username: loginRequest.username
            }
        })

        if(!user){
            throw new ResponseError(400, "Invalid username or password!")
        }

        //compare password w password in database
        const passwordIsValid = await bcrypt.compare(loginRequest.password, user.password)

        if(!passwordIsValid){
            throw new ResponseError(400, "Invalid email or password!")
        }

        user = await prismaClient.user.update({
            where:{
                id: user.id
            },
            data: {
                //saves so that when they leave app it stays logged in
                token: uuid()
            }
        })

        const response = toUserResponse(user)

        return response
    }

    static async logout(user: User): Promise<String>{
        await prismaClient.user.update({
            where: {
                id: user.id
            }, 
            data: {
                token: null
                //removes token
            }
        })
        return "Logout Successful!"
    }
}