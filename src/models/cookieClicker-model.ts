import { CookieClicker } from "@prisma/client";

export interface CookieClickerUpdateRequest {
    total_cookies: number;
    upgrade_power: number;
}

export interface CookieClickerResponse {
    id: number;
    total_cookies: number;
    upgrade_power: number;
}

export function toCookieClickerResponse(cookieClicker: CookieClicker): CookieClickerResponse {
    return {
        id: cookieClicker.id,
        total_cookies: cookieClicker.total_cookies,
        upgrade_power: cookieClicker.upgrade_power,
    };
}
