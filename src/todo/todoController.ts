import { NextFunction ,Request, Response} from "express";
import  todoModel  from "./todoModel";

import { AuthernticatedRequest } from "../middleware/Authenticate";
const createTodo= async(req:AuthernticatedRequest, res:Response,next:NextFunction)=>{
    try{
            const { title, description,Duedate } = req.body;
        const newtodo =await todoModel.create({
            userName: req.userId,
            
            title,

            description,

            Duedate,
            });
        
            return res.status(200).json({id:newtodo._id});
    }
    catch(error){
        next(error);
    }
}
export { createTodo}