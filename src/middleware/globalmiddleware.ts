import { NextFunction,Response,Request } from "express";
import { HttpError } from "http-errors";
import { config } from "../config/config";

const globalErrorHandler=(err: HttpError | null, req: Request, res:Response, next:NextFunction)=>{
    if(err){
        next(err);
    }
    const statusCode= err?.statusCode || 500

    return res.status(statusCode).json ({
        message: err?.message,
        errorStack:config.env=='development'?err?.stack:" ",

    })
}    

export default globalErrorHandler;