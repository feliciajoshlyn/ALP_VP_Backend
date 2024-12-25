import { Whack_A_Mole } from "@prisma/client"

export interface WhackAMoleUpdateRequest {
    mole_chosen: string
    music_chosen: string
    timed_highscore: number
    endless_highscore: number
    intense_highscore: number
}
export interface WhackAMoleResponse {
    id: number
    mole_chosen: string
    music_chosen: string
    timed_highscore: number
    endless_highscore: number
    intense_highscore: number
}

export function toWAMResponse(wam: Whack_A_Mole): WhackAMoleResponse {
    return{
        id:wam.id,
        mole_chosen: wam.mole_chosen,
        music_chosen: wam.music_chosen,
        timed_highscore: wam.timed_highscore,
        endless_highscore: wam.endless_highscore,
        intense_highscore: wam.intense_highscore
    }
}