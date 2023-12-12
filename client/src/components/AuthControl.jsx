import React, { useContext } from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { AuthContext }from "../context/AuthContext"
import { useCookies } from 'react-cookie'
const AuthControl = () => {
  const [cookies,setCookies]=useCookies()
  const {accesstoken,loggeduser}=useContext(AuthContext)

  return (
    <>
        <hr />
        <h1>AuthController</h1>
        <hr />
        {
          accesstoken || cookies.login  ? (<Outlet/>):(<Navigate to={"/login"}/>)
        }
    </>
  )
}

export default AuthControl