import express from 'express'
import { createUserMiddleware, loginUserMiddleware } from "../middleware/routerMiddleware";
import {authRateLimiter} from '../utils/apiRateLimiter';


const userRouter = express.Router();

userRouter.use(authRateLimiter)

userRouter.post("/register", createUserMiddleware);
userRouter.post("/login", loginUserMiddleware);
export default userRouter

