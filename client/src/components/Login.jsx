import React, { useContext, useState } from 'react'
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import {jwtDecode} from "jwt-decode"
import {useCookies} from "react-cookie"

const Login = () => {
  const navigate =useNavigate()
  const {setAccestoken,setLoggeduser}=useContext(AuthContext)
  const [name,setName]=useState("muhammed")
  const [pwd,setPwd]=useState("cansoy")
  const [err,setErr]=useState(null)
  const [loading,setLoading]=useState(false)
  const [cookies,setCookie]=useCookies()

  const fncSubmit=async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const response=await fetch(`${import.meta.env.VITE_SERVER_PATH}/login`,{
        method:"POST",
        headers:{
          "content-type":"application/json",
          "x-name":"result-cansoy"
        },
        body:JSON.stringify({username:name,password:pwd}),
        credentials:"include"
      })

      if (response.status===401 && response.statusText==="Unauthorized") {
        setLoading(false)
      return setErr(`You Failed ! ${Math.floor(Math.random()*9999)}`)
      }
      const data =await response.json()
      setErr(null)
      setLoading(false)
      setLoggeduser(jwtDecode(data.accesstoken))
      setAccestoken(data.accesstoken)
      setCookie("login","isAuthenticated")
      navigate("/")
    } catch (error) {
      return setErr("Server Error Exist !")
    }
    
  }

  return (
    <div>
      <h4>Login</h4>
      <hr />
      <p>{err ? (err):("")}</p>
      <form onSubmit={fncSubmit}>
        <p>User Name:</p>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
        <br /><br />
        <p>Password:</p>
        <input type="text" value={pwd} onChange={(e)=>setPwd(e.target.value)}/>
        <br /><br />
        <p>{loading ? ("Loging..."):("")}</p>
        <input type="submit"/>
      </form>
    </div>
  )
}

export default Login