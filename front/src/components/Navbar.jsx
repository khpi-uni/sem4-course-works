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
import {Link} from "react-router-dom";
import {Badge} from "@mui/material";
import {useContext} from "react";
import {CartContext} from "../App.jsx";

const Navbar = () => {
    const cartContext = useContext(CartContext);

    return (

        <Box>
            <AppBar position="sticky">
                <Toolbar variant="dense">
                    <Container maxWidth="xl">
                        <Box
                            sx={{justifyContent: "space-between", display: "flex"}}
                        >
                                <IconButton color="inherit" aria-label="menu" component={Link} to={'/'}
                                            sx={{textDecoration: 'none', mr: 2}}>
                                    <SpaIcon
                                        sx={{display: {xs: 'none', sm: 'block'}}}/>
                                </IconButton>
                            <Box>

                                <Typography variant="h6" color="inherit" component={Link} to="/"

                                            sx={{textDecoration: 'none',}}
                                >
                                    Products
                                </Typography>


                                <Link to={'/signup'}><Button variant="contained"
                                                             sx={{textDecoration: 'none', margin: "1em"}}>Sign
                                    up</Button></Link>
                                <Link to={'/signin'}><Button variant="contained"
                                                             sx={{textDecoration: 'none', margin: "1em"}}>Sign
                                    in</Button></Link>

                                <Badge badgeContent={cartContext.getNumberOfItems()}>
                                    <Button variant="contained"
                                            component={Link} to="/cart"
                                            sx={{textDecoration: 'none'}}

                                    >Cart<CartIcon sx={{margin: "0 2px"}} fontSize="small"/></Button>
                                </Badge>
                            </Box>
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar; 
