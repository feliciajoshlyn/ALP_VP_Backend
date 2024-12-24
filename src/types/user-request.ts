import { User } from "@prisma/client";
import { Request } from "express";

//ngga masuk model karena dia type data baru
export interface UserRequest extends Request{
    user?: User
}