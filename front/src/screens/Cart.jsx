import "./Cart.css"

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OrderForCart from "../components/OrdersForCart";

import Container from '@mui/material/Container';

const Cart = () => {
    return (
        <div>
            <Navbar/>
            <Container maxWidth="lg" className="mainContainer"
                       sx={{
                           display: "flex",
                           alignItems: "center",
                           flexDirection: "column",
                           paddingTop: 4,
                           paddingBottom: 4
                       }}>
                <OrderForCart/>
            </Container>
            <Footer/>
        </div>
    );
}
export default Cart;
