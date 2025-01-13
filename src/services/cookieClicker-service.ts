import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { CookieClickerUpdateRequest, CookieClickerResponse, toCookieClickerResponse } from "../models/cookieClicker-model";
import { ResponseError } from "../errors/response.error";

export class CookieClickerService {
    static async createCookieClickerData(user: User): Promise<string> {
        await prismaClient.cookieClicker.create({
            data: {
                user_id: user.id,
                total_cookies: 0,
                upgrade_power: 1,
            },
        });

        return "Cookie Clicker data created successfully!";
    }

    static async getCookieClickerData(user: User): Promise<CookieClickerResponse> {
        const cookieClicker = await prismaClient.cookieClicker.findUnique({
            where: {
                user_id: user.id,
            },
        });

        if (!cookieClicker) {
            throw new ResponseError(400, "Cookie Clicker data not found");
        }

        return toCookieClickerResponse(cookieClicker);
    }

    static async updateCookieClickerData(user: User, req: CookieClickerUpdateRequest): Promise<string> {
        const cookieClicker = await prismaClient.cookieClicker.findFirst({
            where: {
                user_id: user.id,
            },
        });

        if (!cookieClicker) {
            throw new ResponseError(400, "Cookie Clicker data not found!");
        }

        await prismaClient.cookieClicker.update({
            where: {
                user_id: user.id,
            },
            data: {
                total_cookies: req.total_cookies,
                upgrade_power: req.upgrade_power,
            },
        });

        return "Data updated successfully!";
    }
}
