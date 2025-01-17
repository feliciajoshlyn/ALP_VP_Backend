import express from "express"
import { authMiddleWare } from "../middlewares/auth-middleware"
import { UserController } from "../controllers/user-controller"
import { WAMController } from "../controllers/wam-controller"
import { CalendarController } from "../controllers/calendar-controller"
import { FsController } from "../controllers/fs-controller"
import { CookieClickerController } from "../controllers/cookieClicker-controller";

export const protectedRouter = express.Router()
protectedRouter.use(authMiddleWare)

protectedRouter.delete("/api/logout", UserController.logout)

protectedRouter.get("/api/wam", WAMController.getWAM)
protectedRouter.put("/api/wam", WAMController.updateWAM)

protectedRouter.get("/api/fs", FsController.getFs)
protectedRouter.put("/api/fs/setting", FsController.updateSettingFs)
protectedRouter.put("/api/fs/score", FsController.updateScoreFs)

protectedRouter.get("/api/cookie-clicker", CookieClickerController.getCookieClicker);
protectedRouter.put("/api/cookie-clicker", CookieClickerController.updateCookieClicker);
    
protectedRouter.post("/api/entry", CalendarController.createEntry)
protectedRouter.get("/api/entry", CalendarController.getEntryList)
protectedRouter.get("/api/entry-detail", CalendarController.getEntry)
protectedRouter.put("/api/entry/:calendar_id", CalendarController.updateEntry)
protectedRouter.put("/api/entry-detail", CalendarController.createOrUpdate)
