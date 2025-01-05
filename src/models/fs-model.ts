import { FidgetSpinner } from "@prisma/client";

export interface FidgetSpinnerUpdateRequest {
    spinner_chosen: number
    music_chosen: number
}

export interface FidgetSpinnerScoreUpdate {
    spins_score: number
}

export interface FidgetSpinnerResponse {
    id: number
    spinner_chosen: number
    music_chosen: number
    spins_score: number
}

export function toFidgetSpinnerResponse(fs: FidgetSpinner): FidgetSpinnerResponse{
    return {
        id: fs.id,
        spinner_chosen: fs.spinner_chosen,
        music_chosen: fs.music_chosen,
        spins_score: fs.spins_score
    }
}