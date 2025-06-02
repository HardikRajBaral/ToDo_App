import type  { NextFunction, Request, Response } from "express";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { config } from "../config/config";
import jwt from "jsonwebtoken";

const createUser= async (req:Request, res:Response,next:NextFunction)=>{
    const {userName,email,password}= req.body;
    if(!userName|| !email || !password ){
        return res.status(400).json({message:"All fields are required"})
    }
    try{
        const user= await userModel.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
    }catch (error){
        next(error);    
    }
    const hassedPassword= await bcrypt.hash(password,10);
    
    try{
        const newUser= await userModel.create(
            {
                userName,
                email,
                password:hassedPassword, 
            },  
        )
        const token =jwt.sign({sub:newUser._id},config.jwtSecret as string,{expiresIn:"7d"});

        res.status(200).json( {accessToken:token});

    }catch (error){
        next(error);
    } 
};


const loginUser= async (req:Request, res:Response,next:NextFunction)=>{
try{
        const {email,password}= req.body;
    const user= await userModel.findOne({email:email});
    if (!user){
        return res.status(400).json({message:"User does not exist"});
    }
    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({message:"Password is incorrect"});
    }
    const token =jwt.sign({sub:user._id},config.jwtSecret as string,{expiresIn:"7d"});
    res.status(200).json( {accessToken:token});
    if(!token){
        return res.status(400).json({message:"Token is not created"});
    }

}catch (error){
    next(error);
}
};

export{ createUser};