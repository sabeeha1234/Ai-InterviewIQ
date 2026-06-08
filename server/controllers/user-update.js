import jwt from 'jsonwebtoken'
import { User } from "../models/User.js";

export async function updateuser(req,res){


const userid = req.user.id
const body = req.body

try{
     // Exclude password and email

        if(body.password){
            delete body.password
        }

        if(body.email){
            delete body.email
        }
const updatedUser=await User.findByIdAndUpdate(userid,body,{new:true,runValidators:true}).select('-password')
if(!updatedUser){
    return res.status(404).json({message:"user not found"})
}
res.status(201).json({message:"ok"})
}catch(err){
res.status(500).json({message:err.message})
}

}