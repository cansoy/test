import React, { useContext } from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { AuthContext }from "../context/AuthContext"

const AuthControl = () => {
  const {accesstoken,loggeduser}=useContext(AuthContext)

  return (
    <>
        <hr />
        <h1>AuthController</h1>
        <hr />
        {
          accesstoken ? (<Outlet/>):(<Navigate to={"/login"}/>)
        }
    </>
  )
}

export default AuthControl