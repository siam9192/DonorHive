import { useEffect, useState } from "react"

const useLoadingBounce = (isLoading:boolean,duration=2000) => {
 const [bouncedLoading,setBouncedLoading] = useState(true);
 useEffect(()=>{
    const timeout = setTimeout(()=>{
        if(isLoading){
            setBouncedLoading(false)
        }
    },duration)
    return ()=>clearTimeout(timeout)
 },[isLoading])
 return bouncedLoading;
}

export default useLoadingBounce