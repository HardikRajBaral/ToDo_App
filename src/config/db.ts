import mongoose from "mongoose"
import { config } from "./config"

const connectDB =async()=>{
    try{
        await mongoose.connection.on('connected',()=>{
            console.log('connected on DataBase')
        })
        await mongoose.connection.on('error',()=>{
            console.log('error on connecting DataBase')
        })
        await mongoose.connect(config.databaseUrl as string)
    }catch( error){
        console.log('cannot connect to database')
        process.exit(1)
    }
}