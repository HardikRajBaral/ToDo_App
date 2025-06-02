import express  from "express";
import { createUser } from "./userContorller";

const userRouter= express.Router();

userRouter.post('/register',createUser)

export default userRouter

