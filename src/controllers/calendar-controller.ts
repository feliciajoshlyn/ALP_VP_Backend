import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { CalendarEntryCreateRequest, CalendarResponse } from "../models/calendar-model";
import { CalendarService } from "../services/calendar-service";
import { ResponseError } from "../errors/response.error";

export class CalendarController {

    static async createEntry(req: UserRequest, res: Response, next: NextFunction) {
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
            const dateString = req.headers['x-date'] as string
            
            if (!dateString) {
                throw new ResponseError(400, "Date is required!")
            }

            const date = new Date(dateString)

            if (isNaN(date.getTime())) {
                throw new ResponseError(400, "Invalid date format!")
            }

            const response = await CalendarService.getCalEntry(req.user!, date)

            if (!response) {
                res.status(404).json({
                    message: "No entry found for the specified date",
                });
            }

            res.status(200).json({
                data: response
            })

        } catch (error) {
            next(error)
        }
    }

    static async getEntryList(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await CalendarService.getCalEntries(req.user!)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateEntry(req: UserRequest, res: Response, next: NextFunction) {
        try {
            //pakai CalendarResponse cz need id
            const request: CalendarResponse = req.body as CalendarResponse
            const response = await CalendarService.updateEntry(req.user!, Number(req.params.calendar_id), request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}