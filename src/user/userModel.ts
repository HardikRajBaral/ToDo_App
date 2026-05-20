import mongoose from "mongoose";

const userModel= new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    
   email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
    }
    
},{timestamps:true})
export default mongoose.model("User",userModel)
