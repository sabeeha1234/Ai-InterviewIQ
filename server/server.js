import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose  from 'mongoose'
import authRouter from './routes/auth.js'
import cors from 'cors'
import userRouter from './routes/user.js'
import interviewRouter from './routes/interview.js'
import http from 'http'
import {Server} from 'socket.io'
import interviewSocket from './sockets/interviewSockets.js'
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
app.use("/user",userRouter)
app.use("/interview",interviewRouter)

//create new server for socket io
const server = http.createServer()
//create innstance for socket.io by proving server info
const io = new Server(server ,{
    cors:"*",
    methods:["GET","POST"]
})
//once connection io established exec callback
io.on("connection",(socket)=>{
    console.log(socket.id,"socketid")

   interviewSocket(socket)
    console.log("socket connection established")


})

const port=process.env.PORT


// app.listen(port,()=>{
//     console.log(`server listening on port ${port}`)
// })

//change app express default server from socket server 
server.listen(port,()=>{
    console.log(`server listening on port ${port}`)
})

