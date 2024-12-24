import { User } from "@prisma/client";
import { toWAMResponse, WhackAMoleResponse } from "../models/wam-model";
import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response.error";

export class WAMService{

    static async getWAMData(user: User, wamId: number): Promise<WhackAMoleResponse>{
        const whack_a_mole = await prismaClient.whack_A_Mole.findUnique({
            where: {
                id: wamId,
                user_id : user.id
            }
        })

        if(!whack_a_mole) {
            throw new ResponseError(400, "Whack-A-Mole data not found")
        }
        return toWAMResponse(whack_a_mole)
    }
}