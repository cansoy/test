import React, { useEffect, useState } from 'react'

const useRefreshToken = (serverpath) => {
    const [loading,setLoading]=useState(false)
    const [err,setErr]=useState(false)
    const [data,setData]=useState(null)
    const [fake,setFake]=useState(null)

    useEffect(()=>{
      const controller=new AbortController()
      setLoading(true)
      fetch(`${import.meta.env.VITE_SERVER_PATH}${serverpath}`,
                {   
                  headers:{"x-custom":"muhammed-cansoy"},
                  credentials:"include",
                  signal:controller.signal
                }
            )
          .then(res=>{
            if (res!==20) {
              setErr(true)
            }
            return res.json()
          })
          .then(data=>{
            if (data.err) {
              setLoading(false)
              setFake(true)
            }
            else{
              setLoading(false)
              setData(data)
            }
          })
      
      return()=>{
        controller.abort()
      }

    },[serverpath])

  return {loading,err,fake,data}
}

export default useRefreshToken