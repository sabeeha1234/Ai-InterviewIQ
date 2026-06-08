import React, { useContext, useState } from 'react'
import { UserProvider } from './Contextprovider'
import { toast } from 'react-toastify'
import axios from 'axios'
import { api } from '../apis/interceptors'

function UpdateProfileForm() {
    const {userdetails}= useContext(UserProvider)
    const [user,setUser]=useState(userdetails)

    function updateform(value,keyname){
        const newDetails={...user}
        newDetails[keyname]=value
        setUser(newDetails)

    }
    async function  updateprofile(e){
        e.preventDefault()
        //compare prev data(userdetails) and new data(user)
        const updatedrecords={}
            for(let key in userdetails){
                if(userdetails[key]!==user[key])updatedrecords[key]=user.name
            }
        try{
            // const update = axios.patch(`http://localhost:4000/user/updateprofile`,updatedrecords,{
            //     headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
            // })
            const update = await api.patch('/user/updateprofile',updatedrecords)
            console.log(update)

        }catch(err){
            console.log(err.message)
            toast.error(err.message)
        }
    }
  return (
    <div>
         <form className="flex flex-col gap-3" onSubmit={updateprofile} >
          <div>
            <label htmlFor="name">Name</label>
            <input
              className="border"
              required
              type="text"
              name="name"
              id="name"
              value={user.name}
              onChange={(e)=>updateform(e.target.value,"name")}
             
            />
            {/* //inorder to get the pointer on input when clicked on labelname use id  */}
          </div>
          
         
        
          <div>
            <label htmlFor="age">dob</label>
            <input
              className="border"
              type="date"
              name="dob"
              id="dob"
              value={user.dob}
               onChange={(e)=>updateform(e.target.value,"dob")}
             
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              className="border"
              required
              type="text"
              name="phone"
              id="phone"
              value={user.phone}
               onChange={(e)=>updateform(e.target.value,"phone")}
              
            />
          </div>

          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
        
    </div>
  )
}

export default UpdateProfileForm