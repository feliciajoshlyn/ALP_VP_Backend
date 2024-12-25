import { z, ZodType } from "zod";

export class CalendarValidation {
    static readonly CREATE: ZodType = z.object({
        date: z
            .string()
            .refine((val) => !isNaN(Date.parse(val)), {
                message: "Invalid date format!",
            }),
        note: z.string().max(1000),
        moods: z.array(z.number().int()).max(3).nonempty(),
    });
}
