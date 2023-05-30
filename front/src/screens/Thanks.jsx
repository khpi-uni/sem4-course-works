import "./Thanks.css"
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import {Link} from "react-router-dom";

import * as React from 'react';

const Thanks = ()=>{
  
  return (

    <div>
      
    <Navbar/>

    <Container maxWidth="xs" className="mainContainer" sx={{
    display: "flex",
    alignItems: "center",
    height:"80vh",
      flexDirection:"column"
  }}>
    <Typography mt="1em" variant="h2" >{"Thank you!"}</Typography>

    <Button variant="contained"
    component={Link} to="/"
    sx={{margin:"1em"  }}
    >to homepage</Button>
    </Container>


    <Footer/>
    </div>
  );
}


export default Thanks; 
