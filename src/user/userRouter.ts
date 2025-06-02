import express, { NextFunction,  Request, Response }  from "express";
import { createUser } from "./userContorller";
import app from "../../app";

const userRouter= express.Router();

const createUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createUser(req, res, next);
  } catch (error) {
    next(error);
  }
};

userRouter.post("/register", createUserMiddleware);
export default userRouter

