import { NextFunction ,Request, Response} from "express";

const createTodo= async(req:Request, res:Response,next:NextFunction)=>{
    const { title, description,Duedate } = req.body;
    
}
export { createTodo}