import "./Account.css";
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Navbar from '../components/Navbar';


  import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


let email = "baka@gmail.com";
let billing_address = "Lviv, Ukraine";
let shipping_address = "Kyiv, Ukraine";

const Forms = ()=>{
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Account info" value="1" />
            <Tab label="My Orders" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">

    <Typography mt="1em" >{"Your email is: "+email}</Typography>

    <Typography  mt="1em" >{"Your billing address: "+billing_address}</Typography>

    <Typography  mt="1em" >{"Your shipping address: "+shipping_address}</Typography>

    </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
      </TabContext>
    </Box>
  );
}


const Account = () => {
  return (

    <div>
      
    <Navbar/>
    <Container maxWidth="md" className="mainContainer">
    <h3 > Hello user!</h3>
    <Forms/>

    </Container>
    </div>

      

  );
};

export default Account; 
