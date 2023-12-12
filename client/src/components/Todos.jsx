import React, { useEffect } from 'react'
import { Link, useLocation,Navigate } from 'react-router-dom'
import useRefreshToken from '../hooks/useRefreshToken'

const Todos = () => {
  const location =useLocation()
  const  {loading,err,fake,data}=useRefreshToken(location.pathname)
  
  
  if (fake) {
    return (
      <>
        <Navigate to={"/logout"}/>
      </>
    )
  }

  if (err) {
    return(
      <>
        <Navigate to={"/home"}/>
      </>
    )
  }

  return (
    <div>
      <p>Todos</p>
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
                      <li>{user.title}</li>
                      <li>{user.completed ?"Okey":"Not yet"}</li>
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


export default Todos