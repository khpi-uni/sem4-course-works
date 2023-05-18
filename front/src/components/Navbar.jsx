import "./Navbar.css";

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import SpaIcon from '@mui/icons-material/Spa';
import CartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () =>{
  return (

    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
    <Toolbar variant="dense">
    <IconButton  color="inherit" aria-label="menu" sx={{ mr: 2 , position: "fixed", left:"10%"}}>
    <SpaIcon  sx={{  display: { xs: 'none', sm: 'block' } }} />
    </IconButton>
    <Box
     sx={{ position:"fixed" ,right: {xs:"3em",m:"8em",xl:"20em"},  }}
    >

    <Typography variant="h6" color="inherit" component="a" href=""

    sx={{textDecoration:'none',  }}
    >
    Products
    </Typography>

    <Typography variant="h6" color="inherit" component="a" href=""

    sx={{textDecoration:'none',margin:"1em"  }}
    >About us
    </Typography>

    <Button variant="contained"
    sx={{margin:"1em"  }}
    >Sign up</Button>
    <Button variant="contained"
    sx={{margin:"1em"  }}
    >Log in</Button>
    <Button variant="contained"
    sx={{margin:"1em"  }}
    
    >Cart<CartIcon fontSize="small"/></Button>
    </Box>
    </Toolbar>
    </AppBar>
    </Box>
  ) 
}

export default Navbar; 
