import { Request,Response,NextFunction } from "express";
import  jwt from "jsonwebtoken";
import { config } from "../config/config";

export interface AuthernticatedRequest extends Request{
userId:string
}

const Authenticate= async(req:AuthernticatedRequest, res:Response, next:NextFunction)=>{
    try{
        const token=req.header("Authorization");
        if (!token){
            return res.status(400).json({message:"token is required"})
        }
        
        const parrsedToken= token.split(" ")[1];
        const decodedToken= jwt.verify(parrsedToken,config.jwtSecret as string);
        req.userId=decodedToken.sub as string;
        next();
        
    }catch(error){
        next(error);
    }
}

export default Authenticate