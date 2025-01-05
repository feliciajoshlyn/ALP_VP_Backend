import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { FsService } from "../services/fs-service";
import { FidgetSpinnerScoreUpdate, FidgetSpinnerUpdateRequest } from "../models/fs-model";

export class FsController {
    static async getFs(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await FsService.getFsData(req.user!)

            res.status(201).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateSettingFs(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: FidgetSpinnerUpdateRequest = req.body as FidgetSpinnerUpdateRequest
            const response = await FsService.changeFsSetting(req.user!, request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateScoreFs(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: FidgetSpinnerScoreUpdate = req.body as FidgetSpinnerScoreUpdate
            const response = await FsService.updateFsScore(req.user!, request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}