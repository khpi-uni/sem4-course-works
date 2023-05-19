
import React, { useState, useEffect } from 'react';
import "./Orders.css";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

async function parseJson(){
  const data = await fetch("../../tmp_json/orders.json").then((response)=>response.json());

  console.log(data.orders);
  return data.orders;
}

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

function ResponsiveGrid() {

   const [data, setData] = useState(0);


   useEffect(()=>{
      fetchData();
   },[]);

  const fetchData = async () => {
        const response = await parseJson();
        setData(response);
   };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {JSON.stringify(data)}    
    {
      data.length?(
        data.map(el=>(

      <Card>
        <Box sx={{display:"flex",flexDirection:"row",flexGrow:"1"}}>
      <Box sx={{alignSelf:"start",flexGrow:"1"}}>
        {el.order_date}
      </Box>
      <Box sx={{justifySelf:"end",}}>
        {el.total}
      </Box>
      </Box>
        </Card>
        ))
      )
        :"loading"
    }
    </Box>
  );
    //    {data.length?data.map(el=><p>el</p>):<p>loading...</p>}
}

const Orders = () =>{
  return (
    <ResponsiveGrid/>
  );


   
}

export default Orders; 
