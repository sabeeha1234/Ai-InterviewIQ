import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose  from 'mongoose'
import cors from 'cors'
const app = express()
app.use(cors())


mongoose.connect(process.env.DB_URI).then(()=>{
    console.log("db connected ")
}).catch((err)=>{
    console.log(err.message)
})


const port=process.env.port
app.listen(port,()=>{
    console.log(`server listening on port ${port}`)
})