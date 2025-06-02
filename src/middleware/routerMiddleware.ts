import { NextFunction ,Request, Response} from "express";
import { createUser, loginUser } from "../user/userContorller";

const createUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createUser(req, res, next);
  } catch (error) {
    next(error);
  }
};

const loginUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await loginUser(req, res, next);
  } catch (error) {
    next(error);
  }
};



export {createUserMiddleware,loginUserMiddleware};