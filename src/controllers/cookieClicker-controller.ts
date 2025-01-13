import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { CookieClickerService } from "../services/cookieClicker-service";
import { CookieClickerUpdateRequest } from "../models/cookieClicker-model";
import { CookieClickerValidation } from "../validations/cookieClicker-validation";

export class CookieClickerController {
    static async getCookieClicker(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await CookieClickerService.getCookieClickerData(req.user!);

            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateCookieClicker(req: UserRequest, res: Response, next: NextFunction) {
        try {
            // Validate request body
            CookieClickerValidation.UPDATE.parse(req.body);

            const request: CookieClickerUpdateRequest = req.body as CookieClickerUpdateRequest;
            const response = await CookieClickerService.updateCookieClickerData(req.user!, request);

            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
}
