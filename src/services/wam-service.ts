import { User } from "@prisma/client";
import { toWAMResponse, WhackAMoleResponse, WhackAMoleUpdateRequest } from "../models/wam-model";
import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response.error";
import { Validation } from "../validations/validation";


export class WAMService{

    static async createWAMData(user: User): Promise<string> {

        await prismaClient.whack_A_Mole.create({
            data: {
                user_id: user.id,
                mole_chosen: "",
                music_chosen: "",
                timed_highscore: 0,
                endless_highscore: 0,
                intense_highscore: 0,
            },
        });
    
        return "WAM data created successfully!";
    }
    
    static async getWAMData(user: User): Promise<WhackAMoleResponse>{
        const whack_a_mole = await prismaClient.whack_A_Mole.findUnique({
            where: {
                user_id : user.id
            }
        })

        if(!whack_a_mole) {
            throw new ResponseError(400, "Whack-A-Mole data not found")
        }
        return toWAMResponse(whack_a_mole)
    }

    static async updateWAMData(user:User, req: WhackAMoleUpdateRequest):Promise<string>{
        const wam = await prismaClient.whack_A_Mole.findFirst({
            where:{
                user_id: user.id
            }
        })

        if(!wam){
            throw new ResponseError(400, "WAM Data not found!")
        }

        await prismaClient.whack_A_Mole.update({
            where: {
                user_id: user.id
            },
            data: {
                mole_chosen: req.mole_chosen,
                music_chosen: req.music_chosen,
                timed_highscore: req.timed_highscore,
                endless_highscore: req.endless_highscore,
                intense_highscore: req.intense_highscore
            }
        })
        return "Data Updated Successfully!"
    }
}