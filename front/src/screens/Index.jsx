
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CartIcon from '@mui/icons-material/ShoppingCart';

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
      const json_resp = await response.json();
      console.log(await json_resp);


      setProducts(await json_resp.products)
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
        <Box sx={{margin:"2em"}}>
          <Container maxWidth="xl">
            <Grid container spacing={1}>
            {
              products.map((el,i)=>
                <Card xs={8} sx={{maxWidth:"29%", padding:"0.5em", margin: 1}} variant="outlined" className="prod-card" key={i}>

                  <Box sx={{height:"32em",display:"flex", flexDirection:"column", justifyContent:"space-between"}} >
                      <Box sx={{height:"20em",display:"flex",alignItems:"center"}}>
                        <img src={el.thumbnail_url} alt="smth" 
                style={{height: "20em", width:"20em"}}
                />
                     </Box> 
                      <Box sx={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>

                      <Box 
                  sx={{display:"flex",flexDirection:"row",justifyContent:"space-between",margin:1
                  }} >
                        <Typography  variant="h5">{el.title}</Typography>
                        <Typography>{ parseInt(el.price*100)/100.0}</Typography>
                      </Box>




                      <Typography>{ el.description}</Typography>
                    </Box>
                <Box  sx={{textAlign:"end"}}>
    <Button variant="contained"
    sx={{textDecoration:'none',margin:"1em",minWidth:"32px",maxWidth:"32px",borderRadius:"50%"  }}
    
    ><CartIcon sx={{}} fontSize="small"/></Button>
                </Box>
                  
                  </Box>
                </Card> 
              )
            }
          </Grid>
        </Container>
        </Box>
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

