
import React, { useState, useEffect } from 'react';
import "./Orders.css";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


import Container from '@mui/material/Container';

import Order from './Order'

async function parseJson(){
  const data = await fetch("../../tmp_json/orders.json").then((response)=>response.json());

  return data.orders;
}


const Orders = () =>{

   const [data, setData] = useState(0);


   useEffect(()=>{
      fetchData();
   },[]);

  const fetchData = async () => {
        const response = await parseJson();
        setData(response);
   };

  return (
    <Container maxWidth="sm">
    <Order json_array={data} />
    </Container>
  );
    //    {data.length?data.map(el=><p>el</p>):<p>loading...</p>}
}

export default Orders; 
