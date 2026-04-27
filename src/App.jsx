import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'

import Regist from './regist-page'

import Home from './component/home'
import Cart from './component/cart'
import Profile from './component/profile'
import Chat from './component/chat'
import Detail from './component/detail'
import Order from './component/order'
import Login from './component/login'
import Register from './component/register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route element={<Regist />}>
          <Route path='login/' element={<Login />} />
          <Route path='register/' element={<Register />} />
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='cart/' element={<Cart />} />
        <Route path='profile/' element={<Profile />} />
        <Route path='chat/' element={<Chat />} />
        <Route path='detail/' element={<Detail />} />
        <Route path='order/' element={<Order />} />
      </Routes>
    </Router>
  )
}

export default App
