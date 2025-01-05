import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { FidgetSpinnerResponse, FidgetSpinnerScoreUpdate, FidgetSpinnerUpdateRequest, toFidgetSpinnerResponse } from "../models/fs-model";
import { ResponseError } from "../errors/response.error";
import { Validation } from "../validations/validation";
import { FidgetSpinnerValidation } from "../validations/fs-validation";

export class FsService {
    
    static async createFsData(user: User): Promise<string> {

        await prismaClient.fidgetSpinner.create({
            data: {
                user_id: user.id,
                spinner_chosen: 0,
                music_chosen: 0,
                spins_score: 0,
            },
        });

        return "FS data successfully created :D";
    }


    static async getFsData(user: User): Promise<FidgetSpinnerResponse>{
        const fidget_spinner = await prismaClient.fidgetSpinner.findUnique({
            where: {
                user_id: user.id
            }
        })

        if(!fidget_spinner) {
            throw new ResponseError(400, "Sadly... Fidget Spinner data not found")
        }

        return toFidgetSpinnerResponse(fidget_spinner)
    }


    static async changeFsSetting(user: User, req: FidgetSpinnerUpdateRequest): Promise<string>{
        const fidget_spinner = await prismaClient.fidgetSpinner.findFirst({
            where:{
                user_id: user.id
            }
        })

        if (!fidget_spinner) {
            throw new ResponseError(400, "Sadly... Fidget Spinner data not found")
        }

        // // validate the setting choice
        // const reqSpinScore = Validation.validate(FidgetSpinnerValidation.UPDATE, req)

        await prismaClient.fidgetSpinner.update({
            where:{
                user_id: user.id
            },
            data: {
                spinner_chosen: req.spinner_chosen,
                music_chosen: req.music_chosen
            }
        })

        return "Setting Updated Successfully!"
    }

    static async updateFsScore(user: User, req: FidgetSpinnerScoreUpdate): Promise<number>{

        const fidget_spinner = await prismaClient.fidgetSpinner.findFirst({
            where:{
                user_id: user.id
            }
        })

        if (!fidget_spinner) {
            throw new ResponseError(400, "Sadly... Fidget Spinner data not found")
        }

        await prismaClient.fidgetSpinner.update({
            where:{
                user_id: user.id
            },
            data: {
                spins_score: req.spins_score
            }
        })

        return fidget_spinner.spins_score
    }
}