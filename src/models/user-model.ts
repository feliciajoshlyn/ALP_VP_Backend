import { User } from "@prisma/client"

export interface LoginRegisterUserRequest {
    username: string,
    password: string
}

export interface UserResponse {
    username: string,
    token?: string
}

//convert from database to like user response (a user)
export function toUserResponse(user: User): UserResponse {
    return {
        username: user.username,
        token: user.token ?? ""
    }
}