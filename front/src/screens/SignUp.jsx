import "./SignUp.css" 


import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Navbar from '../components/Navbar';


import * as React from 'react';

const SignUp = ()=>{
  
  return (

    <div>
      
    <Navbar/>

    <Container maxWidth="xs" className="mainContainer" sx={{
    display: "flex",
    alignItems: "center",
    height:"80vh",
      flexDirection:"column"
  }}>
    <Typography mt="1em" >{"Sign up"}</Typography>
      <TextField id="outlined-basic" label="Email" variant="outlined" sx={{display:"block", margin: "2em 0"}} size="medium" fullWidth="true"  />
          <TextField id="outlined-basic" label="Password" variant="outlined" sx={{display:"block", margin: "2em 0"}} fullWidth="true"/>
    <Button variant="contained"
    sx={{margin:"1em"  }}
    >Sign up</Button>
    </Container>
    </div>
  );
}


export default SignUp; 
