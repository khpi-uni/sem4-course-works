import "./Account.css";
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Orders from '../components/Orders';


  import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useEffect, useState} from "react";
import {API_HOST} from "../api.js";



const Forms = ()=>{
  const [value, setValue] = React.useState('1');
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // check if we have token
    (async () => {
      const response = await fetch(`${API_HOST}/user/me`, {headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }})

      setUserInfo(await response.json())
    })()
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {userInfo && <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Account info" value="1" />
              <Tab label="My Orders" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">

            <Typography mt="1em" >{"Your email is: "+ userInfo.email}</Typography>

            <Typography  mt="1em" >{"Your billing address: "+ userInfo.billing_address}</Typography>

            <Typography  mt="1em" >{"Your shipping address: "+ userInfo.shipping_address}</Typography>

          </TabPanel>
          <TabPanel value="2">
            <Orders/>
          </TabPanel>
        </TabContext>
      </Box>}
    </>
  );
}


const Account = () => {
  return (

    <div>
      
    <Navbar/>
    <Container maxWidth="md" className="mainContainer">
    <Typography variant="h3">
    Hello user!
    </Typography>
    <Forms/>

    </Container>
    <Footer/>
    </div>

      

  );
};

export default Account; 
