import "./Navbar.css";

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import SpaIcon from '@mui/icons-material/Spa';
import CartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () =>{
  return (

    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
    <Toolbar variant="dense">
    <Container maxWidth="xl"> 

    <Box
    sx={{justifyContent:"space-between",display:"flex"}}
    >
    <IconButton  color="inherit" aria-label="menu" 
    component="a" href="/"
    sx={{textDecoration:'none',mr:2  }}>
    <SpaIcon 
    sx={{  display: { xs: 'none', sm: 'block' } }} />
    </IconButton>

    <Box>
    <Typography variant="h6" color="inherit" component="a" href="/"

    sx={{textDecoration:'none',  }}
    >
    Products
    </Typography>

    <Typography variant="h6" color="inherit" 

    component="a" href="about"
    sx={{textDecoration:'none',margin:"1em"  }}
    >About us
    </Typography>

    <Button variant="contained"
    component="a" href="signup"
    sx={{textDecoration:'none',margin:"1em"  }}
    >Sign up</Button>
    <Button variant="contained"
    component="a" href="signin"
    sx={{textDecoration:'none',margin:"1em"  }}
    >Log in</Button>

    <Button variant="contained"
    component="a" href="cart"
    sx={{textDecoration:'none',margin:"1em"  }}
    
    >Cart<CartIcon sx={{margin:"0 2px"}} fontSize="small"/></Button>
    </Box>
    </Box>
    </Container>
    </Toolbar>
    </AppBar>
    </Box>
  ) 
}

export default Navbar; 
