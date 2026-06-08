import mongoose  from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true,
    },
    email:{
        type:String,
        required :true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required :true,
        min:6
    },
    dob:{
        type:String,
      
    },
    phone:{
        type:String,
        
    }
})

export const User=mongoose.model("User",UserSchema) 