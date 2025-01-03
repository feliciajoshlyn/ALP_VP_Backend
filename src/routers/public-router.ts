import express from "express"
import { UserController } from "../controllers/user-controller"
import { CalendarController } from "../controllers/calendar-controller"

export const publicRouter = express.Router()

publicRouter.post("/api/register", UserController.register)
publicRouter.post("/api/login", UserController.login)

publicRouter.post("/api/addmood", CalendarController.createMood)