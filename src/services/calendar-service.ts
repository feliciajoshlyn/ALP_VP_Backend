import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import {
    CalendarEntryCreateRequest,
    CalendarResponse,
    MoodEntryCreateRequest,
    toCalendarResponse,
    toCalendarResponseList,
} from "../models/calendar-model";
import { CalendarValidation } from "../validations/calendar-validation";
import { Validation } from "../validations/validation";
import { ResponseError } from "../errors/response.error";

export class CalendarService {
    static async addMood(req: MoodEntryCreateRequest): Promise<string>{
        await prismaClient.mood.create({
            data:{
                type: req.type
            }
        })

        return "Data Created Successfully"
    }

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
            return toCalendarResponse({
                id: 0,
                date: date,
                note: "",
                user_id: user.id,
                CalendarMood: []
            })
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

    //pake id cz kan yg udah ada but diupdate
    static async updateEntry(user: User, calendarId: number, req: CalendarEntryCreateRequest): Promise<string> {
        const entryValidation = Validation.validate(CalendarValidation.CREATE, req)

        const entry = await prismaClient.calendar.findFirst({
            where:{
                id: calendarId,
                user_id: user.id
            }
        })

        if(!entry){
            throw new ResponseError(400, "Entry not found!")
        }

        await prismaClient.calendar.update({
            where:{
                id: calendarId,
                user_id: user.id
            },
            data: {
                date: entryValidation.date,
                note: entryValidation.note
            }
        })

        if (entryValidation.moods.length > 0) {
            // Delete existing moods for the calendar entry biar diganti
            await prismaClient.calendarMood.deleteMany({
                where: {
                    calendar_id: calendarId,
                },
            });
    
            // Add updated moods
            const moodData = entryValidation.moods.map((moodId) => ({
                calendar_id: calendarId,
                mood_id: moodId,
            }));
    
            await prismaClient.calendarMood.createMany({
                data: moodData,
            });
        }

        return "Data Updated Successfully!"
    }

    static async createOrUpdate(user: User, req: CalendarEntryCreateRequest): Promise<string> {
        const entryValidation = Validation.validate(CalendarValidation.CREATE, req)

        const date = new Date(entryValidation.date)

        const checkEntry = await prismaClient.calendar.findFirst({
            where: {
                date: date,
                user_id: user.id
            }
        })

        entryValidation.date = new Date(entryValidation.date).toISOString();

        if(checkEntry){
            await this.updateEntry(user, checkEntry.id, entryValidation)

            return "Data Updated Successfully"
        }else{
            await this.createCalEntry(user, entryValidation)
            
            return "Data Created Successfully"
        }
    }
}

