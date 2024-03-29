import "./SignIn.scss";
import "./forms.scss";
import "../assets/form-center.scss";

import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import {Link, useNavigate} from "react-router-dom";

import * as React from 'react';
import {useState} from 'react';
import {API_HOST, saveToken} from "../api.js";
import Box from "@mui/material/Box";
import Alert from '@mui/material/Alert';
import {isEmail} from "../utils/validation.js";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('')
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!isEmail(email)) {
      setEmailError('Email is invalid');
      return;
    }

    setEmailError('');

    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    setPasswordError('');

    const myHeaders = new Headers();

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);

    const requestOptions = {
      method: 'POST', headers: myHeaders, body: urlencoded,
    };

    const response = await fetch(`${API_HOST}/auth/signup`, requestOptions);

    const data = await response.json();

    if (data.error) {
      setFormError(data.error)
      return;
    }

    if (data.token) {
      saveToken(data.token);
      navigate('/account');
    } else {
      setFormError('Unknown error occurred')
    }
  }

  return (<>
    <Navbar/>
    <Container maxWidth="xs" className={'form-container'}>
      <div>
        {formError.length > 0 && <Alert severity="error">{formError}</Alert>}
        <Typography mt="1em">Sign up</Typography>
        <Box component={"form"} onSubmit={signUp}>
          <TextField error={emailError.length > 0} helperText={emailError} label="Email" variant="outlined"
                     margin={"normal"}
                     fullWidth={true} value={email} onInput={(e) => setEmail(e.target.value)}/>
          <TextField error={passwordError.length > 0} helperText={passwordError} label="Password"
                     margin={"normal"}
                     type={"password"}
                     variant="outlined" fullWidth={true} value={password}
                     onInput={(e) => setPassword(e.target.value)}/>
          <Button type={"submit"} variant="contained" margin={"normal"}>Sign up</Button>
        </Box>
        <Typography mt="20px" component="p">Already have an account? <Link to={'/signup'}>Sign in</Link></Typography>
      </div>
    </Container>
    <Footer/>
  </>);
}


export default SignUp;
