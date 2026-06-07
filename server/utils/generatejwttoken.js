import jwt from 'jsonwebtoken'


export const generatejwttoken = (payload)=>{

    const token = jwt.sign(payload,process.env.JWT_TOKEN,{expiresIn:"7d"})

    return token
}