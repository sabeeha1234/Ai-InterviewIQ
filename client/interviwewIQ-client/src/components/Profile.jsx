import { useContext, useState } from "react"
import { UserProvider } from "./Contextprovider"
import moment from 'moment'

import PopUp from "./PopUp"
import UpdateProfileForm from "./UpdateProfileForm"


function Profile() {
 
  const {userdetails} = useContext(UserProvider)
  const [iseditenabeled,setiseditenabeled]=useState(false)

 




  function calcage(dob){
    if(!dob) return null 
    const age = moment().diff(dob,"years")
    return age

  }
  return (
    <div className="h-screen relative">
   {iseditenabeled?<PopUp setiseditenabeled={setiseditenabeled} RenderComponent={UpdateProfileForm}/>:null}
      <div className="h-40 mt-10 border">
        <div className="flex justify-end">
          <button className="mr-2 cursor-pointer"  onClick={() => setiseditenabeled(!iseditenabeled)}>Edit</button>
        </div>
        <div>
          <p>Name:{userdetails.name}</p>
        </div>
        <div>
          <p>Email:{userdetails.email}</p>
        </div>
        <div>
          <p>age:{userdetails.dob?calcage(userdetails.dob):"N/A"}</p>
        </div>
        <div>
          <p>Phone-no:{userdetails.phone}</p>
        </div>

      </div>
    </div>
  )
}

export default Profile