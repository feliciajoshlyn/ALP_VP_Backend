import express from "express"
import { authMiddleWare } from "../middlewares/auth-middleware"
import { UserController } from "../controllers/user-controller"

export const protectedRouter = express.Router()
protectedRouter.use(authMiddleWare)

protectedRouter.delete("/api/logout", UserController.logout)