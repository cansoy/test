import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
      <p>Home Components !</p>
      <br />
      <Link to={"/users"}>Users</Link>
      <br />
      <Link to={"/todos"}>Todos</Link>
      <br />
      <Link to={"/albums"}>Albums</Link>
      <br />
      <Link to={"/logout"}>Logout</Link>
      <br /><br />
    </div>
  )
}

export default Home