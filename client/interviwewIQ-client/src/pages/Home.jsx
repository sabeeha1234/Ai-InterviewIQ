import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify";
import { api } from "../apis/interceptors";
import socket from "../InterviewSockets.js";
import {startListeinng,stopListening,texttoSpeech  } from "../utils/speech.js";
import aiDummy from "../assets/dummy-ai.png"
import INTERVIEW_STAGES from "../constants.js";

function Home() {

  const aiContentContainer=useRef()
  const airesponse ="\"Acquainted\" means **having a slight or superficial knowledge of someone or something, or having met someone without knowing them well.**\n\nHere's a breakdown of its meaning and usage:\n\n1.  **For People:**\n    *   You know someone casually, perhaps you've met them a few times or have been introduced.\n    *   They are not a close friend, but also not a complete stranger.\n    *   **Example:** \"I am acquainted with his sister; we met at a party once.\" or \"He's an acquaintance from work, not a close friend.\"\n\n2.  **For Things/Information:**\n    *   You have some familiarity or knowledge about a subject, fact, or situation, but perhaps not a deep or expert understanding.\n    *   **Example:** \"Are you acquainted with the details of the new policy?\" or \"I'm not fully acquainted with the local customs yet.\"\n\n**Key Nuances:**\n\n*   **Less than \"knowing well\" or \"being friends\":** It implies a level of familiarity that is more than a stranger but less than intimacy.\n*   **Often implies an introduction:** You often become acquainted with someone after being introduced.\n*   **Can be one-sided:** You can be acquainted with a fact without the fact being acquainted with you!\n\n**Related word:**\n\n*   **Acquaintance (noun):**\n    *   A person whom one knows slightly but who is not a close friend.\n    *   The state of being acquainted.\n\nIn short, \"acquainted\" suggests a basic level of familiarity or knowledge."
 const[userText,setUserText]=useState("")
 const [answer,setanswer]=useState("")
 const[question,setquestion]=useState("Hello ,Iam Your AI Interviwer")
 const[userstopped,setuserstopped]=useState(false)
 const [buttontext,setbuttontext]=useState("Start Interview")
 const [currentstate,setcurrentstate]=useState(INTERVIEW_STAGES.DID_NOT_ANSWERED_YET)
 const [Aispeaking,setAispeaking]=useState("")
 const [interviewStarted, setInterviewStarted] = useState(false)
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

 function handleButtonText(){
  //on click of start ,enable mike and listen to answer , change button text from start to stop
  if(currentstate == INTERVIEW_STAGES.DID_NOT_ANSWERED_YET){

   if(!interviewStarted){
      socket.emit("start-interview", {
         stack: "MERN",
         difficultyLevel: "Fresher"
      })

      setInterviewStarted(true)
   } else {
      startListeinng(setanswer)
   }

   setbuttontext("Stop Listening")
   setcurrentstate(INTERVIEW_STAGES.ANSWERING)
}

  //on clicking on stop ,disable mike and change button text to submit 
  if(currentstate === INTERVIEW_STAGES.ANSWERING){
    stopListening()
    setbuttontext("Submit Answer")
    setcurrentstate(INTERVIEW_STAGES.COMPLETED_ANSWERING)
  }
  

  //on click to submit ,answer should be send to backend thorough socket and get new question text ,with button text start
    if(currentstate == INTERVIEW_STAGES.COMPLETED_ANSWERING){
      // setbuttontext("Start")
      // setanswer("")
      // setcurrentstate(INTERVIEW_STAGES.DID_NOT_ANSWERED_YET)
      //emit event to socket and get next question and update queston state
         socket.emit("submit-answer", {
      answer
      })

      setbuttontext("Stop Listening")
      setanswer("")
      setcurrentstate(INTERVIEW_STAGES.ANSWERING)

    }
  
 }
 
useEffect(() => {
  socket.connect()

  socket.on("connect", () => {
    console.log("Connected:", socket.id)
  })

socket.on("ai-question", (data) => {
  setquestion(data.question)

  texttoSpeech(data.question, setAispeaking, () => {
      startListeinng(setanswer)
  })
})
  socket.on("error", (err) => {
    console.log(err)
  })

  return () => {
    socket.off("connect")
    socket.off("ai-question")
    socket.off("error")
    socket.disconnect()
  }
}, [])

//   useEffect(()=>{
//   aiContentContainer.current.innerText =airesponse
//  },[])
  return (
    <div className=" h-screen flex justify-center relative">
    {/*<form  className="flex justify-center gap-4 mt-4" onSubmit={callAI}>
      <textarea type="text" className="w-80 border shadow-2xl " placeholder="Ask AI" onChange={(e)=>setUserText(e.target.value)}/>
      <input type="submit" value="submit" disabled={!userText.length?true:false} className={` ${!userText.length ?"bg-white":"bg-blue-600 cursor-pointer" }  rounded`} />
    </form>
    <div ref={aiContentContainer}>   </div>
      */}
      {/* <button onClick={sendfirstmessage}>Send First Message</button>
      <button>Get Interview Question</button>


      <button onClick={()=>startListeinng(setanswer)}>Speak</button>
      <br />
      <button onClick={stopListening}>Get Answer</button> */}
       <div className="absolute top-10">
        <img src={aiDummy} alt="Could not load image" className={`h-60 ${Aispeaking ? "opacity-100":"opacity-50"}`} />
        <h3 className="font-bold text-2xl">{question}</h3>

       </div>
        

        {/* <div className="mt-100 space-x-4 ">
           <textarea value={answer} onChange={(e)=>{setanswer(e.target.value)}} className="border  w-190 rounded shadow-2xl"></textarea>
          <button className="text-white text-center bg-blue-400 cursor-pointer rounded w-18 h-10 " onClick={handleButtonText}>{buttontext}</button>
        </div> */}
        <div className=" flex items-center gap-4">
        <textarea value={answer} onChange={(e) => setanswer(e.target.value)}className="border w-[760px] rounded shadow-2xl h-14 mt-100"/>
       <button className={`text-white bg-blue-400 cursor-pointer rounded w-36 h-12 px-4 mt-100
        ${currentstate === INTERVIEW_STAGES.DID_NOT_ANSWERED_YET ? "bg-blue-400": currentstate === INTERVIEW_STAGES.ANSWERING ?"bg-red-500": "bg-emerald-400"}` }onClick={handleButtonText}>{buttontext}</button>
        </div>

       
    

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