import {useState, useEffect, createContext} from 'react'
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

export const CartContext = createContext({});

function App() {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    const addToCart = (id) => {
        const newCart = [...cart, {id, amount: 1}];
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    }

    const removeFromCart = (id) => {
        const newCart = cart.filter((el) => el.id !== id);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    }

    const increaseAmount = (id) => {
        const itemIndex = cart.findIndex((el) => el.id === id);
        const newAmount = cart[itemIndex].amount + 1;
        if (newAmount >= 999) return;
        setCart([...cart.slice(0, itemIndex), {id, amount: newAmount}, ...cart.slice(itemIndex + 1)]);
    }

    const decreaseAmount = (id) => {
        const itemIndex = cart.findIndex((el) => el.id === id);
        const newAmount = cart[itemIndex].amount - 1;
        if(newAmount <= 0) {
            removeFromCart(id);
            return;
        };
        setCart([...cart.slice(0, itemIndex), {id, amount: newAmount}, ...cart.slice(itemIndex + 1)]);
    }

    const getIds = () => {
        return cart.map((el) => el.id);
    }

    const getAmount = (id) => {
        return cart.find((el) => el.id === id)?.amount;
    }

    const getNumberOfItems = () => {
        return cart.reduce((acc, el) => acc + el.amount, 0);
    }

    const emptyCart = () => {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, increaseAmount, decreaseAmount, getIds, getAmount, getNumberOfItems, emptyCart}}>
            <div id="root">
                <Section auth={1}>
                    <Router>
                        <main className="app">
                            <Routes>
                                <Route exact path="/" element={<Index/>}/>
                                <Route exact path="/account" element={<Account/>}/>
                                <Route exact path="/admin/users" element={<AdminUser/>}/>
                                <Route exact path="/admin/orders" element={<AdminOrders/>}/>
                                <Route exact path="/admin/products" element={<AdminProducts/>}/>
                                <Route exact path="/payment" element={<Payment/>}/>
                                <Route exact path="/cart" element={<Cart/>}/>
                                <Route exact path="/orders" element={<Orders/>}/>
                                <Route exact path="/thanks" element={<Thanks/>}/>
                                <Route exact path="/signup" element={<SignUp/>}/>
                                <Route exact path="/signin" element={<SignIn/>}/>
                            </Routes>
                        </main>
                    </Router>
                </Section>
            </div>
        </CartContext.Provider>
    );
}

export default App
