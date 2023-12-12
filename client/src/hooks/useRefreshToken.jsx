import React, { useEffect, useState } from 'react'

const useRefreshToken = (serverpath) => {
    const [loading,setLoading]=useState(false)
    const [err,setErr]=useState(false)
    const [data,setData]=useState(null)
    const [fake,setFake]=useState(null)
    const [typeerr,setTypeerr]=useState(null)

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
            if (res.status!==200) {
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
          .catch(err=>{
            console.log("err exist ! ###SOLVE IT### !",err.name)
            if (err.name==="TypeError") {
              setTypeerr(`Type Error Exist ! ${Math.floor(Math.random()*1000)}`)
            }
            if (err.name==="AbortError") {
              // Or omit error !
              console.clear()
            }
          })
      
      return()=>{
        controller.abort()
      }

    },[serverpath])

  return {loading,err,fake,typeerr,data}
}

export default useRefreshToken