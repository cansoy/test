import React, { useEffect } from 'react'
import { Link, useLocation,Navigate } from 'react-router-dom'
import useRefreshToken from "../hooks/useRefreshToken"

const Users = () => {
  const location =useLocation()
  const {loading,err,fake,data}=useRefreshToken(location.pathname)

  if (fake) {
    return (
      <>
        <Navigate to={"/login"}/>
      </>
    )
  }

  return (
    <div>
      <p>Users</p>
      <hr />
        <p>{loading ? ("LOADING...."):("")}</p>
      <hr />
      <br /><br />
      <Link to={"/"}>Back Home </Link>
      <hr />
      <hr />
      {
        data ? 
        (data.data.map(user=>{
          return  <ul key={Math.random()}>
                      <li>{user.name}</li>
                      <li>{user.username}</li>
                      <hr />
                  </ul>
          })
        )
        :
        ("Loading....")
      }
    </div>
  )
}

export default Users