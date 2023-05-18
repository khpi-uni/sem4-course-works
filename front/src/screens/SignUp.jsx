import "./SignUp.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Navbar from '../components/Navbar';

const SignUp = () => {
  return (<div>
   <p></p> 
    <Navbar/>
    <Button>Hello world!</Button>
    <TextField id="outlined-basic" label="Outlined" variant="outlined"/>
  </div>  );
};

export default SignUp; 
