import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ScrollToTop from './scrolltop'
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
import Payment from './component/payment-methode'
import Search from './component/search'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route element={<Regist />}>
          <Route path='login/' element={<Login />} />
          <Route path='register/' element={<Register />} />
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='cart/' element={<Cart />} />
        <Route path='profile/' element={<Profile />} />
        <Route path='chat/' element={<Chat />} />
        <Route path='detail/:id' element={<Detail />} />
        <Route path='order/' element={<Order />} />
        <Route path='payment/' element={<Payment />} />
        <Route path='search/' element={<Search />} />
      </Routes>
    </Router>
  )
}

export default App
