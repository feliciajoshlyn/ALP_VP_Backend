import { z, ZodType } from "zod";

export class CookieClickerValidation {
    static readonly UPDATE: ZodType = z.object({
        total_cookies: z.number().min(0),
        upgrade_power: z.number().min(1),
    });
}
