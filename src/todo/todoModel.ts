import mongoose from "mongoose";
import { title } from "process";
import userModel from "../user/userModel";
const todoModel= new mongoose.Schema({
    userName:{
        type:userModel,
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
    Duedate:{
        type:Date,
        required:true
    },
    
})
export default mongoose.model("Todo",todoModel)