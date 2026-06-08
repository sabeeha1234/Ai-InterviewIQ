import React from 'react'

function UpdateProfile({setiseditenabeled}) {
  return (
    <div className='absolute h-[400px] shadow-2xl flex  bg-amber-50 left-[25%] w-[400px'>UpdateProfile
    
    <div className='w-full'>
        <div className=' flex justify-end'>
            <button  onClick={()=>setiseditenabeled(false)}>Close</button>
        </div>
        <div>
            <form></form>
        </div>
    </div>
    
    
    </div>
  )
}

export default UpdateProfile