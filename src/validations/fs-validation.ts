import { z, ZodType } from "zod"
    export class FidgetSpinnerValidation {
        static readonly UPDATE: ZodType = z.object({
            spinner_chosen: z.number().min(0).max(3),
            music_chosen: z.number().min(0).max(3)
        })
 }