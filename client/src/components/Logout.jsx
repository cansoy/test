import React from 'react'
import { useNavigate,Navigate } from 'react-router-dom'
import useLogout from '../hooks/useLogout'

const Logout = () => {
  const {logout}=useLogout()

  return (
    <>
      <Navigate to={"/login"}/>
    </>
  )
}

export default Logout