import mongoose  from "mongoose"
import {User} from "../../models/User.js"
import bcrypt from "bcryptjs"
import { generatejwttoken } from "../../utils/generatejwttoken.js"

export const signup = async(req,res)=>{

const {name,email,password,age,phone}= req.body


try{
    //check if the emailid is valid
    const isValidUser = await mongoose.connection.collection(process.env.VALID_USERS_COLLECTION).findOne({email})
if(!isValidUser){
  return   res.status(400).json({message:"this email id is not in accio environment"})
}
console.log(isValidUser,'isvaliduser')


//check if email exists already in our databae
const isUserAlreadyExists =await User.findOne({email})

if(isUserAlreadyExists){
    return res.status(400).json({message:"email already exists"})
}

//bcrypt  ---- // password hashing
req.body.password = await bcrypt.hash(password,10)

const newUser =await User.create(req.body)
res.status(201).json({message:"ok",newUser})

}catch(err){
    res.status(500).json({message:err.message})
}


}

export const login = async(req,res)=>{
    //take emailid and password
    const {email,password}=req.body

    if(!email || !password)return res.status(400).json({message:"email and pass is required"})

    //verify if emailid exists in user
    const user = await User.findOne({email})
    console.log(user)

    if(!user){
        return res.status(400).json({message:"user dosent exist"})
    }



    //verify password using bcrypt
    //bcryt.compre(userentpass , collpass)

    const match = await bcrypt.compare(password,user.password)
    if(!match){
        return res.status(400).json({message:"incorrect password"})
    }
   

    //generate jwt token
    const token = generatejwttoken({email:user.email,id:user._id})


    //send resopnse token
     const userDetails={
        name:user.name,
        email:user.email,
        age:user.age||null,
        phone:user.phone,
     }



    
    res.status(200).json({message:"ok",userDetails,token})
}



