
import jwt from 'jsonwebtoken'

export function authmiddleware(req,res,next){
    
    if(!req.headers.authorization){
        res.status(401).json({message:`token not provded`})
    }
     const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "token not provided"
        });
    }

    const token = authHeader.split(" ")[1];

   
    try{
      const userPayload=jwt.verify(token,process.env.JWT_TOKEN)
     console.log(userPayload,"payload return from verify")

     
     req.user = userPayload

     next()
    }catch(err){
        //token is expired 
        if(err.name === "TokenExpiredError"){
            return res.status(401).json({message:"token expired"})
        }
        //token is invalid
        if(err.name === "JsonWebTokenError"){
            return res.status(401).json({message:"invalid token"})
        }
        //internal server err
        res.status(500).json({message:"internal server error"})

    }
      

   
    

}