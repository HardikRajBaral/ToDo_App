import { NextFunction ,Request, Response} from "express";
import  todoModel  from "./todoModel";

import { AuthernticatedRequest } from "../middleware/Authenticate";
const createTodo= async (req:Request, res:Response,next:NextFunction)=>{
    try{
            const { title, description,Duedate } = req.body;
            const _req=req as AuthernticatedRequest
        const newtodo =await todoModel.create({
            userName: _req.userId,
            
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

const updateTodo = async (req:Request, res:Response,next:NextFunction)=>{
    const {title,description,Duedate}=req.body;
    if(!title||!description||!Duedate){
        return res.status(400).json({message:"All fields are required"});
    }
    const todoId= req.params.todoID;

    if(!todoId){
        return res.status(400).json({message:"Todo ID is required"});
    }
    const todo= await todoModel.findOne({_id:todoId});
    if(!todo){
        return res.status(400).json({message:"Todo does not exist"});
    }
    
    const _req= req as AuthernticatedRequest;
    if (todo.userName.toString() !== _req.userId){
        return res.status(400).json({message:"You are not authorized to update this todo"});
    }

    const updatedTodo= await todoModel.findOneAndUpdate(
        {
            _id:todoId
        },
        {
            title,
            description,
            Duedate
        },
        {
            new:true
        }
    )
    res.json(updatedTodo);


}


const listtodos= async (req:Request, res:Response,next:NextFunction)=>{
 
}


export { createTodo,updateTodo}