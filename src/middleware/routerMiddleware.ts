import { NextFunction ,Request, Response} from "express";
import { createUser, loginUser } from "../user/userContorller";
import { create } from "domain";
import { createTodo } from "../todo/todoController";
import { AuthernticatedRequest } from "../middleware/Authenticate";

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


const createTodoMiddleware=async (req:Request, res:Response, next:NextFunction)=>{
  try{
    await createTodo(req as AuthernticatedRequest,res,next);

  }catch(error){
    next(error);
  }

}



export {createUserMiddleware,loginUserMiddleware,createTodoMiddleware};