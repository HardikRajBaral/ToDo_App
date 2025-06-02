import express from 'express'
import { createUserMiddleware, loginUserMiddleware } from "../middleware/routerMiddleware";


const userRouter = express.Router();




userRouter.post("/register", createUserMiddleware);
userRouter.post("/login", loginUserMiddleware);
export default userRouter

