import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { WAMService } from "../services/wam-service";
import { WhackAMoleUpdateRequest } from "../models/wam-model";

export class WAMController {
    static async getWAM(req: UserRequest, res: Response, next: NextFunction){
        try {
            const response = await WAMService.getWAMData(req.user!)

            res.status(201).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateWAM(req: UserRequest, res: Response, next: NextFunction){
        try {
            const request: WhackAMoleUpdateRequest = req.body as WhackAMoleUpdateRequest
            const response = await WAMService.updateWAMData(req.user!, request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}