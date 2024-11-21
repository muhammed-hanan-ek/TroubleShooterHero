import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Authentication from './pages/Authentication'
import Dashboard from './pages/Dashboard'
import Notification from './pages/Notification'




function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Authentication/>}/>
        <Route path='/Notification' element={<Notification/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
      </Routes>
    </>
  )
}

export default App
