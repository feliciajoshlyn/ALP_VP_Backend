import { z, ZodType } from "zod";

export class UserValidation {
    static readonly LOGREG: ZodType = z.object({
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100)
    })
}