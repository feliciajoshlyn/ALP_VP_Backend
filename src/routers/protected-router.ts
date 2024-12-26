import express from "express"
import { authMiddleWare } from "../middlewares/auth-middleware"
import { UserController } from "../controllers/user-controller"
import { WAMController } from "../controllers/wam-controller"

export const protectedRouter = express.Router()
protectedRouter.use(authMiddleWare)

protectedRouter.delete("/api/logout", UserController.logout)

protectedRouter.get("/api/wam", WAMController.getWAM)
protectedRouter.put("/api/wam", WAMController.updateWAM)