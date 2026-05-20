import { NextFunction, Request, Response } from "express";
import { createTodo, deleteTodo, singleTodo, updateTodo } from "../todo/todoController";
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
export { createTodoMiddleware, createUserMiddleware, deleteTodoMiddleware, loginUserMiddleware, singleTodoMiddleware, updateTodoMiddleware };
