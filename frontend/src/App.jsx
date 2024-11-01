import React from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom"
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
// import Logout from './pages/Logout'
import MyBlog from './pages/MyBlog'
import Footer from './components/Footer'
import CreateBlog from './pages/CreateBlog'
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <div>
      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* <Route path='/logout' element={<Logout />} /> */}
        <Route path='/my-blogs' element={<MyBlog />} />
        <Route path='/create-blog' element={<CreateBlog />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App