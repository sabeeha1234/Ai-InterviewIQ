import { useState } from "react"


function Signup() {
    const[formValues , setFormValues]=useState({name:"",email:"",password:"",confirmPassword:"",age:0,phone:""})//this  is js so u wrote it inn camelcase
  return (
    <>
    <div className="h-screen flex justify-center items-center ">
    <form className="flex flex-col gap-3">
        <div>
            <label htmlFor="name">Name</label>
            <input  className="border" type="text" name="name" id="name" />//inorder to get the pointer on input when clicked on labelname use id 
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input className="border" type="email" name="email" id="email" />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input  className="border"type="password" name="password" id="password" />
        </div>
        <div>
            <label htmlFor="confirm-password">Confirm-password</label>
            <input  className="border"type="password" name="confirm-password" id="confirm-password" />
        </div>
        <div>
            <label htmlFor="age">Age</label>
            <input  className="border"type="number" name="age" id="age" />
        </div>
        <div>
            <label htmlFor="phone">Phone</label>
            <input  className="border"type="text" name="phone" id="phone" />
        </div>

        <div>
            <input type="submit" value='Submit' />
        </div>



    </form>
    </div>
    
    
    </>
    
    
  )
}

export default Signup