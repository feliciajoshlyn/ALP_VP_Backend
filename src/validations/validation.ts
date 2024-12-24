import { ZodType } from "zod";

//pakai generic karena validasi datanya bisa apa saja
export class Validation {
    static validate<T>(schema: ZodType, data: T): T {
        return schema.parse(data)
    }
}