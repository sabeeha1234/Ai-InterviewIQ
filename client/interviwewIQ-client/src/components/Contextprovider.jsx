import React, { createContext, useEffect, useState } from 'react'
export const UserProvider = createContext()


function Contextprovider({children}) {
    const [userdetails,setuserdetails]=useState({})
  
    console.log("RAW:", localStorage.getItem("user"))
console.log("PARSED:", JSON.parse(localStorage.getItem("user")))

    useEffect(() => {
  const newdetails = JSON.parse(localStorage.getItem("user"));

  console.log("localStorage user:", newdetails);

  setuserdetails(newdetails);
}, []);

console.log("Provider state:", userdetails);
  return (

   <>
   <UserProvider.Provider value={{userdetails}}>
    {children}
   </UserProvider.Provider>
   
   </>
  )
}

export default Contextprovider