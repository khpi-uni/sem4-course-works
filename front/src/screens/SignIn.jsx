import "./SignUp.css"


import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import * as React from 'react';
import {useState} from "react";
import {API_HOST, saveToken} from "../api.js";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("password", password);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
        };

        const response = await fetch(`${API_HOST}/auth/login`, requestOptions);

        const data = await response.json();

        if(data.token) {
            saveToken(data.token);
        }

        // redirect to homepage
    }

    return (
        <div>

            <Navbar/>

            <Container maxWidth="xs" className="mainContainer" sx={{
                display: "flex",
                alignItems: "center",
                height: "80vh",
                flexDirection: "column"
            }}>
                <Typography mt="1em">{"Sign up"}</Typography>
                <TextField id="outlined-basic" label="Email" variant="outlined" sx={{display: "block", margin: "2em 0"}}
                           size="medium" fullWidth="true" value={email} onInput={(e) => setEmail(e.target.value)}/>
                <TextField id="outlined-basic" label="Password" variant="outlined"
                           sx={{display: "block", margin: "2em 0"}} fullWidth="true" value={password} onInput={(e) => setPassword(e.target.value)}/>
                <Button variant="contained"
                        sx={{margin: "1em"}} onClick={signIn}
                >Sign up</Button>
                <Typography mt="1em" component="a" href="signup"
                            sx={{textDecoration: "none", color: "grey"}}>{"Don't have an account? Sign up"}</Typography>
            </Container>


            <Footer/>
        </div>
    );
}


export default SignIn; 
