import { useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'

import SignUp from './screens/SignUp'
import SignIn from './screens/SignIn'
import Thanks from './screens/Thanks'
import Account from './screens/Account'
import Orders from './components/Orders'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="root">
      
    <Router>
      <main className="app">
        <Routes>
          <Route exact path="/account" element={<Account/>} />
          <Route exact path="/orders" element={<Orders/>} />
          <Route exact path="/thanks" element={<Thanks/>} />
          <Route exact path="/" element={<SignUp/>} />
          <Route exact path="/signin" element={<SignIn/>} />
        </Routes>
      </main>
    </Router>
    </div>
  )
}

export default App
