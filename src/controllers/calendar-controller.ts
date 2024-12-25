import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { CalendarEntryCreateRequest } from "../models/calendar-model";
import { CalendarService } from "../services/calendar-service";

export class CalendarController {

    static async createEntry(req: UserRequest, res: Response, next: NextFunction){
        try {
            const request: CalendarEntryCreateRequest = req.body as CalendarEntryCreateRequest
            const response = await CalendarService.createCalEntry(req.user!, request)

            res.status(201).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getEntry(req: UserRequest, res: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}