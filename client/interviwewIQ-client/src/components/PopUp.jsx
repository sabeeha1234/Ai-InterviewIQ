import React from 'react'

function PopUp({setiseditenabeled ,RenderComponent}) {
  if(!RenderComponent)return null
  return (
    <div className='absolute h-[400px] shadow-2xl flex  bg-amber-50 left-[25%] w-[400px'>UpdateProfile
    
    <div className='w-full'>
        <div className=' flex justify-end'>
            <button  onClick={()=>setiseditenabeled(false)}>Close</button>
        </div>
       <RenderComponent/>
    </div>
    
    
    </div>
  )
}

export default PopUp