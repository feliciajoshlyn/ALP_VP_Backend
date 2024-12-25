import { z, ZodType } from "zod";

export class WAMValidation {
    static readonly UPDATE: ZodType = z.object({
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100)
    })
}