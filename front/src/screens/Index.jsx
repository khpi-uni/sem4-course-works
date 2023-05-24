
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import * as React from 'react';
import {useState,useEffect} from "react";
import {API_HOST, saveToken} from "../api.js";

const Index = () => {
  const [products, setProducts] = useState(null);


  useEffect(() => {
    // check if we have token
    (async () => {
      const response = await fetch(`${API_HOST}/product/get-all`
      )
      console.log(response);


      setProducts(await response.json())
    })()
  }, [])
  return (
<div>
  <Navbar/> 
    <Typography variant="h4" sx={{textAlign:"center",margin:"1em 0"}}>
      Welcome to the shop!
    </Typography> 
    {
      products?(
        <div>
          <Container maxWidth="lg">
            {
              products.map((el,i)=>
                <Card sx={{padding:"0em"}} className="prod-card" key={i}>

                  <ListItemButton sx={{height:"10em",display:"flex",justifyContent:"space-between"}}>
                      <Box sx={{height:"5em",width:"5em",display:"flex",alignItems:"center"}}>
                        <img src={el.image} alt="smth" style={{maxWidth: "100%"}}/>
                     </Box> 
                      <Box sx={{display:"flex",flexDirection:"column",justifySelf:"end"}}>

                        <Typography  >{el.product_title}</Typography>

                      <Box sx={{alignSelf:"end",display:"flex",flexDirection:"row"}}>

                     <Box  variant="subtitle2">{el.price + " ✖️ " } </Box>

                      <Box sx={{padding:"0 1em ",display:"flex"}}>
                        <Box  variant="subtitle2">{ el.amount} </Box>
                      </Box>


                      <Box>{  " 🟰 " + el.amount*el.price}</Box>
                      </Box>
                    </Box>
                  </ListItemButton>
                </Card> 
              )
            }
        </Container>
        </div>
      ):(
        <Container maxWidth="sm"> 

        <Card sx={{padding:"9em 1em",textAlign:"center"}}> 
        <Typography variant="h5">There are currently no orders!</Typography>
        </Card>
        </Container>
      )
    }
    <Footer/>
    </div>
  )

}
export default Index; 

