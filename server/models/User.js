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
    age:{
        type:String,
        min :14,
        max:70
    },
    phone:{
        type:String,
        
    }
})

export const User=mongoose.model("User",UserSchema) 