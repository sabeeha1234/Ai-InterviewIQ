import { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import axios from "axios"


function Login() {
  const [usercredentials,setusercred]=useState({email:"",password:" "})
  const navigate = useNavigate()

  function handlechange(e){
    const {name,value}=e.target
    const newCred={...usercredentials}
    newCred[name]=value
    setusercred(newCred)
  }

  async function login(e){
    e.preventDefault()
    try{
      const data = await axios.post(`http://localhost:4000/auth/login`,usercredentials)

      console.log(data,"data")
      localStorage.setItem("token",data.data.token)
      localStorage.setItem("user",JSON.stringify(data.data.userDetails))
      navigate("/")


    }catch(err){
      toast.error(err.response.data.message)

    }

  }


  return (
    <>
    <div>

      <form onSubmit={login}>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email"onChange={handlechange} required  name="email" id="email"  value={usercredentials.email}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" onChange={handlechange} required name="password" id="password"  value={usercredentials.password}/>
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>



      </form>
    </div>
    
    </>
  )
}

export default Login