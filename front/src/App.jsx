import {useEffect, useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

/*
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import SignIn from './screens/SignIn'
import CheckoutScreen from './screens/CheckoutScreen' 
*/
//admin screens
//
import SignUp from './screens/SignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="root">
      
    <Router>
      <main className="app">
        <Routes>
          <Route exact path="/" element={<SignUp/>} />
        </Routes>
      </main>
    </Router>
    </div>
  )
}

export default App
