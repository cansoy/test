import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

const useLogout = () => {
    const [logout,setLogout]=useState(false)
    const [cookies,setCookies,removeCookie]=useCookies()

    useEffect(()=>{
        const controller=new AbortController()
        fetch(`${import.meta.env.VITE_SERVER_PATH}/logout`,{credentials:"include",signal:controller.signal})
            .then(res=>{
                return res.json()
            })
            .then(data=>{
                removeCookie("login")
                setLogout(true)
            })

        return()=>{
            controller.signal.aborted
        }
    },[])

  return {logout}
}

export default useLogout