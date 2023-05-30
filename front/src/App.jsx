import { useState,useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.scss'

import SignUp from './screens/SignUp'
import SignIn from './screens/SignIn'
import Thanks from './screens/Thanks'
import Account from './screens/Account'
import Cart from './screens/Cart'
import Orders from './components/Orders'
import Section from './Section'
import Payment from './screens/Payment'
import AdminUser from './screens/AdminUser.jsx'
import Index from './screens/Index'
import AdminOrders from "./screens/AdminOrders.jsx";
import AdminProducts from "./screens/AdminProducts.jsx";

function App() {
  return (
    <div id="root">
        <Section auth={1}>
    <Router>
      <main className="app">
        <Routes>
          <Route exact path="/" element={<Index/>} />
          <Route exact path="/account" element={<Account/>} />
          <Route exact path="/admin/users" element={<AdminUser/>} />
          <Route exact path="/admin/orders" element={<AdminOrders/>} />
          <Route exact path="/admin/products" element={<AdminProducts/>} />
          <Route exact path="/payment" element={<Payment/>} />
          <Route exact path="/cart" element={<Cart/>} />
          <Route exact path="/orders" element={<Orders/>} />
          <Route exact path="/thanks" element={<Thanks/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/signin" element={<SignIn/>} />
        </Routes>
      </main>
    </Router>
      </Section>
    </div>
  );
}

export default App
