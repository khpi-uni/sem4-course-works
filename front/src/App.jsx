import { useState,useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'

import SignUp from './screens/SignUp'
import SignIn from './screens/SignIn'
import Thanks from './screens/Thanks'
import Account from './screens/Account'
import Cart from './screens/Cart'
import Orders from './components/Orders'
import Section from './Section'
import Payment from './screens/Payment'
import Index from './screens/Index'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="root">
        <Section auth={1}>
    <Router>
      <main className="app">
        <Routes>
          <Route exact path="/account" element={<Account/>} />
          <Route exact path="/" element={<Index/>} />
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
