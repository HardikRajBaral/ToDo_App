import { Request,Response,NextFunction } from "express";
import  jwt from "jsonwebtoken";
import { config } from "../config/config";

export interface AuthernticatedRequest extends Request{
userId:string
}

const Authenticate= (req:Request, res:Response, next:NextFunction):void=>{
    try{
        const token=req.header("Authorization") as string;
        if (!token){
            res.status(400).json({message:"token is required"})
        }
        
        const parrsedToken= token.split(" ")[1];
        const decodedToken= jwt.verify(parrsedToken,config.jwtSecret as string);
        const _req = req as AuthernticatedRequest
        _req.userId=decodedToken.sub as string;
        next();
        
    }catch(error){
        next(error);
    }
}

export default Authenticate