import { Calendar, CalendarMood } from "@prisma/client";

export interface CalendarEntryCreateRequest {
    date: string;
    note: string;
    moods: number[];
}

export interface CalendarResponse {
    id: number;
    date: string;
    note: string;
    moods: number[];
}

//combines jadi satu (single type) di Calendar but having the additional attributes of calendar mood
export function toCalendarResponse(
    calendar: Calendar & { CalendarMood: CalendarMood[] }
): CalendarResponse {
    return {
        id: calendar.id,
        date: calendar.date.toISOString(),
        note: calendar.note,
        moods: calendar.CalendarMood.map((cm) => cm.mood_id),
        //this extracts the mood_id from the iteration (related) entry and moods
    };
}

export function toCalendarResponseList(calendar: (Calendar & { CalendarMood: CalendarMood[]})[] ): CalendarResponse[] {
    const result = calendar.map((data) => {
        return {
            id: data.id,
            date: data.date.toISOString(),
            note: data.note,
            moods: data.CalendarMood.map((cm) => cm.mood_id)
        }
    })

    return result
}
