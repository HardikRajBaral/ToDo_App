import { Request,Response,NextFunction } from "express";
import  jwt from "jsonwebtoken";
import { config } from "../config/config";


declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const Authenticate= (req:Request, res:Response, next:NextFunction):void=>{
    try{
        const token=req.header("Authorization") as string;
        if (!token){
         res.status(400).json({message:"token is required"})
         return
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