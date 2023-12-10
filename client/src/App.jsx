import {useState} from 'react'
import {Routes,Route} from "react-router-dom"

import AuthControl from "./components/AuthControl"
import Home from './components/Home'
import Users from "./components/Users"
import Todos from "./components/Todos"
import Albums from "./components/Albums"
import Logout from "./components/Logout"

import Login from "./components/Login"

const App = () => {

  return (
    <>
      <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route element={<AuthControl/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/todos' element={<Todos/>}/>
            <Route path='/albums' element={<Albums/>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path='*' element={<Home/>}/>
          </Route>
      </Routes>
    </>
  )
}

export default App