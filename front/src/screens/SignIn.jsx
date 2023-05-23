import "./SignIn.scss";

import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import * as React from 'react';
import {useState} from 'react';
import {API_HOST, saveToken} from "../api.js";
import Box from "@mui/material/Box";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const signIn = async (e) => {
        e.preventDefault();

        if(!email) {
            setEmailError('Email is required');
            return;
        }

        if(!password) {
            setPasswordError('Password is required');
            return;
        }

        const myHeaders = new Headers();

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

        if (data.token) {
            saveToken(data.token);
        }

        // redirect to homepage
    }

    return (
        <div>

            <Navbar/>
            <Container maxWidth="xs">
                <Typography mt="1em">Sign up</Typography>
                <Box component={"form"} onSubmit={signIn}>
                    <TextField error={passwordError}  id="outlined-basic" label="Email" variant="outlined"
                               sx={{display: "block", margin: "2em 0"}}
                               size="medium" fullWidth="true" value={email} onInput={(e) => setEmail(e.target.value)}/>
                    <TextField id="outlined-basic" label="Password" variant="outlined"
                               sx={{display: "block", margin: "2em 0"}} fullWidth="true" value={password}
                               onInput={(e) => setPassword(e.target.value)}/>
                    <Button type={"submit"} variant="contained"
                            sx={{margin: "1em"}}
                    >Sign up</Button>
                </Box>
                <Typography mt="1em" component="a" href="signup">{"Don't have an account? Sign up"}</Typography>
            </Container>
            <Footer/>
        </div>
    );
}


export default SignIn; 
