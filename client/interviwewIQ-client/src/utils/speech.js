import {toast} from 'react-toastify'
function texttoSpeech(text){

    if(!text)return toast("text is not provided to speak")
   const  speechSynthesis = window.speechSynthesis

   if(!speechSynthesis){
    toast("Browser not supporting ,please enable speaker from browser")
    return
   }

   //if any text is being spoken currently cancle it and strat new speech
    speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    console.log(utterance,"utterance")
   speechSynthesis.speak(utterance)


}

function speechtoText(){

}
let  recognition = null
function startListeinng(onTranscript){
    //check if browser supports speech recognition
    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if(!speechRecognition){
        toast("your browser dosent support speech")
    }

    //create instance for speechRecognition

    recognition = new speechRecognition()

    recognition.lang="en-US"
    
    recognition.continuous = true

    //listen to all text and return this way 
    // this this is this is my this is my answer 
    recognition.intermiResults=true

    //execute when spoke

    recognition.onresult=(data)=>{
        console.log(data,"data from result event ")
        let transcript=""
        console.log(data.results)
        for(let i=0;i<data.results.length;i++){
            transcript+=data.results[i][0].transcript+" "
        }
            console.log("TRANSCRIPT:", transcript)
   
        onTranscript(transcript)
       
    }
 
    //start listening
    recognition.start()
}

function stopListening(){
    if(recognition){
        recognition.stop()
    }

}
export{texttoSpeech,speechtoText,startListeinng,stopListening}