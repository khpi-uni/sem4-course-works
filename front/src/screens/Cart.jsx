import "./Cart.css" 

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OrderForCart from "../components/OrdersForCart";

import { useState,useEffect} from 'react'

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import {  useParams } from 'react-router-dom'


async function parseJson(){


  const { json_cart } = useParams();
  console.log(json_cart);
  return json_cart;
}



const Cart = ()=>{

  const [data, setData] = useState(0);


   useEffect(()=>{
      fetchData();
   },[]);

  const fetchData = async () => {
        const response = await parseJson();
        setData(response);
   };
return (    <div>
      
    <Navbar/>

    <Container maxWidth="lg" className="mainContainer"
sx={{
    display: "flex",
    alignItems: "center",
    height:"80vh",
      flexDirection:"column"
  }}>


    <OrderForCart json_array={data}/>
    </Container>


    <Footer/>
    </div>);
}
export default Cart;
