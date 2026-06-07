import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose  from 'mongoose'
import authRouter from './routes/auth.js'
import cors from 'cors'
const app = express()
app.use(cors())

app.use(express.json()); 

mongoose.connect(process.env.DB_URI).then(()=>{
    console.log("db connected ")
  
}).catch((err)=>{
    console.log(err.message)
})



// app.post("/auth/signup",(req,res)=>{
//     console.log("api hitting directly")

// })

app.use("/auth",authRouter)

const port=process.env.PORT
app.listen(port,()=>{
    console.log(`server listening on port ${port}`)
})
