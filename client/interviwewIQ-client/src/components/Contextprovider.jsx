import React, { createContext, useEffect, useState } from 'react'
export const UserProvider = createContext()


function Contextprovider({children}) {
    const [userdetails,setuserdetails]=useState({})
    useEffect(()=>{
        const  newdetails=JSON.parse(localStorage.getItem("user"))
        setuserdetails(newdetails)

    },[])
  return (

   <>
   <UserProvider.Provider value={{userdetails}}>
    {children}
   </UserProvider.Provider>
   
   </>
  )
}

export default Contextprovider