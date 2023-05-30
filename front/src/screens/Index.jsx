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
import {useState, useEffect} from "react";
import {API_HOST, saveToken} from "../api.js";
import {ProductCard} from "../components/ProductCard.jsx";

const Index = () => {
    const [products, setProducts] = useState(null);
    const [cartArray, setCartArray] = useState(null);

    const handleCartClick = (i) => {
        if (!cartArray.includes(i)) {
            cartArray.push(i);
            setCartArray(JSON.parse(JSON.stringify(cartArray)));
        }

        writeCartItems("../../tmp_json/orders.json", products.filter((el, i) => cartArray.includes(i)));
    }
    const writeCartItems = (file_name, json_obj) => {
    }

    useEffect(() => {
        // check if we have token
        (async () => {
            const response = await fetch(`${API_HOST}/product/get-all`
            )
            const json_resp = await response.json();

            setProducts(await json_resp.products)
        })()
    }, [])
    return (
        <div>
            <Navbar/>
            <Typography variant="h4" sx={{textAlign: "center", margin: "1em 0"}}>
                Welcome to the shop!
            </Typography>
            {
                products ? (
                    <Box sx={{margin: "2em"}}>
                        <Container maxWidth="xl">
                            <Grid container spacing={1}>
                                {
                                    products.map((el, i) =>
                                        <ProductCard id={el.id} title={el.title} price={el.price} description={el.description} imageURL={el.thumbnail_url} key={i} />
                                    )
                                }
                            </Grid>
                        </Container>
                    </Box>
                ) : (
                    <Container maxWidth="sm">

                        <Card sx={{padding: "9em 1em", textAlign: "center"}}>
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

