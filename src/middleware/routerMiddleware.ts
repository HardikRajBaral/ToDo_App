import { NextFunction ,Request, Response} from "express";
import { createUser, loginUser } from "../user/userContorller";
import { create } from "domain";
import { createTodo, updateTodo,deleteTodo, singleTodo } from "../todo/todoController";
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
    await createTodo(req,res,next);

  }catch(error){
    next(error);
  }

}

const updateTodoMiddleware=async (req:Request, res:Response, next:NextFunction)=>{
  try{
    await updateTodo(req,res,next);

  }catch(error){
    next(error);
  }


}
const deleteTodoMiddleware=async (req:Request, res:Response, next:NextFunction)=>{
  try{
    await deleteTodo(req,res,next);
  }catch(error){
    next(error);
  }
}

const singleTodoMiddleware=async (req:Request, res:Response, next:NextFunction)=>{
  try{
    await singleTodo(req,res,next);
  }catch(error){
    next(error);
  }
}
export {createTodoMiddleware,loginUserMiddleware,updateTodoMiddleware,createUserMiddleware,deleteTodoMiddleware,singleTodoMiddleware};