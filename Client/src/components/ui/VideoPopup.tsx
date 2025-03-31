import React, { ReactNode, useEffect, useState } from 'react'

interface IProps {
    children:ReactNode
}

const VideoPopup = ({children}:IProps) => {
    const [isOpen,setIsOpen] = useState(false)
  

    useEffect(()=>{
        document.body.style.overflow  = isOpen ? 'hidden':''
    },[isOpen])

 
  return (
  <>
  <div onClick={()=>setIsOpen(true)} className='size-fit'>
    {
        children
    }
  </div>
   {
    isOpen === true &&  <div className='bg-gray-900/70 fixed inset-0 flex justify-center items-center flex-col z-50' onClick={()=>setIsOpen(false)}>
    <div onClick={(e)=>e.stopPropagation()} className='lg:w-[900px]    lg:h-[500px] md:w-10/12 w-full md:h-[60vh]  h-[50vh] '>
    <iframe className='w-full h-full' src="https://www.youtube.com/embed/NSAOrGb9orM?si=V1vzh3rzMwrX8EAE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    </div>
    </div>
   }
  </>
  )
}

export default VideoPopup