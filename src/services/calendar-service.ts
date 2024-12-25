import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import {
    CalendarEntryCreateRequest,
    CalendarResponse,
    toCalendarResponse,
    toCalendarResponseList,
} from "../models/calendar-model";
import { CalendarValidation } from "../validations/calendar-validation";
import { Validation } from "../validations/validation";

export class CalendarService {

    static async createCalEntry(
        user: User,
        req: CalendarEntryCreateRequest
    ): Promise<string> {
        const calendarRequest = Validation.validate(CalendarValidation.CREATE, req);

        const entry = await prismaClient.calendar.create({
            data: {
                date: calendarRequest.date,
                note: calendarRequest.note,
                user_id: user.id,
            },
        });

        const moods = calendarRequest.moods;

        //to add moods, link to the entry
        if (moods.length > 0) {
            const calendarMoodLinks = moods.map((moodId) => ({
                calendar_id: entry.id,
                mood_id: moodId,
            }));

            await prismaClient.calendarMood.createMany({
                data: calendarMoodLinks,
            });
        }

        return "Date Created Successfully";
    }

    static async getCalEntry(user: User, date: Date): Promise<CalendarResponse | null> {
        const entry = await prismaClient.calendar.findFirst({
            where: {
                user_id: user.id,
                date: date
            },
            include: {
                CalendarMood: { include: { mood: true } }
            }
        })

        //if there's no entry for that certain date, returns null
        if (!entry) {
            return null
        }

        return toCalendarResponse(entry)
    }

    static async getCalEntries(user: User): Promise<CalendarResponse[]> {
        const entries = await prismaClient.calendar.findMany({
            where: {
                user_id: user.id
            },
            include: {
                CalendarMood: true, // harus ada include
            },
            orderBy: {
                date: "asc"
            }
        })

        return toCalendarResponseList(entries)
    }

    //ini better pake date or calendar id
    // static async updateEntry(user: User, date: Date): Promise<CalendarResponse> {
        
    // }

}
