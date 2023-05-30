import "./Order.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import {CartContext} from "../App.jsx";
import {API_HOST, getToken} from "../api.js";
import {Link, redirect, useNavigate} from "react-router-dom";

const Order = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const cartContext = useContext(CartContext);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${API_HOST}/product/get-by-ids?ids=${cartContext.getIds().join(',')}`);
            const data = await response.json();
            setData(data.products);
        })();
    }, [cartContext.cart])

    const placeOrder = async () => {
        const myHeaders = new Headers();

        myHeaders.append('Authorization', `Bearer ${getToken()}`)
        const urlencoded = new URLSearchParams();
        urlencoded.append("orderInfo", JSON.stringify(cartContext.cart));

        const response = await fetch(`${API_HOST}/order`, {
            method: "POST",
            headers: myHeaders,
            body: urlencoded
        });

        if (response.ok) {
            navigate('/thanks');
            cartContext.emptyCart();
        } else {
            alert('error')
            console.log(response);
        }
    }

    return (
        <div>
            {
                data ? (
                        <Card sx={{padding: "1em 0.5em"}}>
                            <div>
                                <Typography>{"Order Total:" + data.reduce((sum, current) => sum + parseInt(current.price) * cartContext.getAmount(current.id), 0)}</Typography>
                            </div>
                            <Button variant="contained"
                                    component={Link} to="/payment"
                                    sx={{marginTop: 1, marginBottom: 1}}
                                    onClick={placeOrder}
                            >Place the order!</Button>
                            <Box sx={{display: "flex", flexDirection: "row", flexGrow: "1"}}>
                                <Typography sx={{justifySelf: "end",}}>
                                    {data.total}
                                </Typography>
                            </Box>
                            <List>
                                {
                                    data.map((el, j) => (
                                        <ListItem sx={{padding: "0em"}} key={el.id}>
                                            <ListItemButton
                                                sx={{height: "10em", display: "flex", justifyContent: "space-between"}}>
                                                <Box sx={{
                                                    height: "5em",
                                                    width: "5em",
                                                    display: "flex",
                                                    alignItems: "center"
                                                }}>
                                                    <img src={el.thumbnail_url} alt="smth" style={{maxWidth: "100%"}}/>
                                                </Box>
                                                <Box sx={{display: "flex", flexDirection: "column", justifySelf: "end"}}>

                                                    <Typography>{el.title}</Typography>

                                                    <Box sx={{alignSelf: "end", display: "flex", flexDirection: "row"}}>

                                                        <Box variant="subtitle2">{el.price + " ✖️ "} </Box>

                                                        <Box sx={{padding: "0 1em ", display: "flex"}}>
                                                            <Box variant="subtitle2">{cartContext.getAmount(el.id)} </Box>
                                                        </Box>
                                                        <Box>{" 🟰 " + cartContext.getAmount(el.id) * el.price}</Box></Box>
                                                </Box>
                                            </ListItemButton>
                                        </ListItem>

                                    ))

                                }
                            </List>
                        </Card>
                    )
                    :
                    <Container maxWidth="sm">

                        <Card sx={{padding: "9em 1em", textAlign: "center"}}>
                            <Typography variant="h5">There are currently no items in your cart!</Typography>
                        </Card>
                    </Container>
            }
        </div>
    )
}


export default Order;
