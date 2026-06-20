import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify";
import { api } from "../apis/interceptors";
import socket from "../InterviewSockets.js";
import { texttoSpeech } from "../utils/speech.js";

function Home() {
  const aiContentContainer=useRef()
  const airesponse ="\"Acquainted\" means **having a slight or superficial knowledge of someone or something, or having met someone without knowing them well.**\n\nHere's a breakdown of its meaning and usage:\n\n1.  **For People:**\n    *   You know someone casually, perhaps you've met them a few times or have been introduced.\n    *   They are not a close friend, but also not a complete stranger.\n    *   **Example:** \"I am acquainted with his sister; we met at a party once.\" or \"He's an acquaintance from work, not a close friend.\"\n\n2.  **For Things/Information:**\n    *   You have some familiarity or knowledge about a subject, fact, or situation, but perhaps not a deep or expert understanding.\n    *   **Example:** \"Are you acquainted with the details of the new policy?\" or \"I'm not fully acquainted with the local customs yet.\"\n\n**Key Nuances:**\n\n*   **Less than \"knowing well\" or \"being friends\":** It implies a level of familiarity that is more than a stranger but less than intimacy.\n*   **Often implies an introduction:** You often become acquainted with someone after being introduced.\n*   **Can be one-sided:** You can be acquainted with a fact without the fact being acquainted with you!\n\n**Related word:**\n\n*   **Acquaintance (noun):**\n    *   A person whom one knows slightly but who is not a close friend.\n    *   The state of being acquainted.\n\nIn short, \"acquainted\" suggests a basic level of familiarity or knowledge."
 const[userText,setUserText]=useState("")
 async function callAI(e) {
  e.preventDefault()
  if(!userText){
    toast("Add promt to AI")
    return
  }
   try{
      const response = await api.post('/interview/liveInterview', {prompt : userText })

      console.log(response,response?.data?.data,'ai response')

      aiContentContainer.current.innerText = response.data.data

    }catch(err){
      console.log(err,'error while calling ai')

      toast.error(err.message)
    }

    console.log("calling ai",userText)
  
 }

 function sendfirstmessage(){
  socket.emit("first-message",{message:"lets start interview"})
 }
 
useEffect(()=>{
 socket.connect()
 socket.on("confirm-password",(data)=>{
  console.log("data for comnforming interview",data)

  if(data.message){
    texttoSpeech(data.message)
  }
 });
 return ()=>{
  
  socket.off("confirm-password")

   socket.disconnect()
 }
},[])

//   useEffect(()=>{
//   aiContentContainer.current.innerText =airesponse
//  },[])
  return (
    <div className="h-[900px] flex flex-col">
    {/*<form  className="flex justify-center gap-4 mt-4" onSubmit={callAI}>
      <textarea type="text" className="w-80 border shadow-2xl " placeholder="Ask AI" onChange={(e)=>setUserText(e.target.value)}/>
      <input type="submit" value="submit" disabled={!userText.length?true:false} className={` ${!userText.length ?"bg-white":"bg-blue-600 cursor-pointer" }  rounded`} />
    </form>
    <div ref={aiContentContainer}>   </div>
      */}
      <button onClick={sendfirstmessage}>Send First Message</button>
      <button>Get Interview Question</button>


      <button onClick={()=>texttoSpeech}>Speak</button>

    </div>
  )
}

export default Home
 /*
 1. A function that should accept text and convert into speech
 2. User will click a button  called start then start talking (giving answer)
 3. A function that should listen to speech and convert it into text
 4. User will click a button called stop to stop giving answer
 5. User can have one more button which says re-attempt to replace current answer
 6. User can have one more button whcih says No-Answer in red color 
 7. Once user gives answer then there should be a button saying submit answer
 
 
 */