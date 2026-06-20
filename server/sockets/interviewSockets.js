function interviewSocket(socket){
    socket.on("first-message",(data)=>{
        console.log("first message recieved ",data)
        socket.emit("confirm-password",{message:"first message recieved good to start interview"})
    })
    socket.on("disconnect",(data)=>{
        console.log("socket disconned")
    })

}
export default interviewSocket