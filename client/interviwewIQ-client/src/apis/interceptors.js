import axios from 'axios'
// import {useNavigate} from "react-router-dom"

// const api = axios.create(`http://localhost:4000`)
const api = axios.create({baseURL : `http://localhost:4000`})
// const navigate = useNavigate()

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem(`token`)

    if(token){
       
 config.headers.Authorization =`Bearer ${token}`
    }
   
    return config


},(err)=>{
    return Promise.reject(err)

})
api.interceptors.response.use((config)=>{
    return config
}, (err)=>{
    console.log(err.status,err.response.data.message)
    const errMessage = err?.response?.data?.message

    if(err.status == 401 && (errMessage == "Invalid token" || errMessage == "Token expired")){
        localStorage.clear()

        window.location.href = `http://localhost:5173/signup`

        toast.error(errMessage)
        return
    }

    return Promise.reject(err)
})

export{api}




