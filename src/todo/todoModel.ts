import mongoose from "mongoose";
import { title } from "process";
import userModel from "../user/userModel";
const todoModel= new mongoose.Schema({
    userName:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duedate:{
        type:Date,
        required:true
    },
    
},{timestamps:true})
export default mongoose.model("Todo",todoModel)