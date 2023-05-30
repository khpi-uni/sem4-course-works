import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as React from "react";
import {useContext, useState} from "react";
import {CartContext} from "../App.jsx";

export const ProductCard = ({id, title, price, description, imageURL}) => {
    const [inCart, setInCart] = useState(false);
    const cartContext = useContext(CartContext);

    if(cartContext.getIds().includes(id) && !inCart) {
        setInCart(true);
    }

    const handleAddToCart = () => {
        if (inCart) {
            setInCart(false);
            cartContext.removeFromCart(id);
            return;
        }

        setInCart(true)
        cartContext.addToCart(id);
    }

    return (
        <Card xs={8} sx={{padding: "0.5em", margin: 1}}
              variant="outlined" className="prod-card">
            <Box sx={{
                height: "32em",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}>
                <Box sx={{height: "20em", display: "flex", alignItems: "center"}}>
                    <img src={imageURL} alt="smth"
                         style={{height: "20em", width: "20em"}}
                    />
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            margin: 1
                        }}>
                        <Typography variant="h5">{title}</Typography>
                        <Typography>{parseInt(price * 100) / 100.0}</Typography>
                    </Box>
                    <Typography>{description}</Typography>
                </Box>
                <Box sx={{textAlign: "end"}} onClick={handleAddToCart}>
                    <Button variant="contained">{inCart ? "Remove from cart" : "Add to cart"}</Button>
                </Box>

            </Box>
        </Card>
    )
}