

import "./Thanks.css" 
import {API_HOST} from "../api.js";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import * as React from 'react';
import {useEffect, useState} from "react";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';





const columns= [
  {
    field:"id" 
  },
  {
    field:"created_by_id"
  },
  {
    field:"price" 
  },
  {
    field:"title"
  },
  {
    field:"description" 
  },
  {
    field: "in_stock"
  },
  {
    field: "thumbnail_id" 
  },
  {
    field: "created_at"
  },
  {
    field: "updated_at"
  },
]

 

 function DataGridDemo() {

    
  const [usersInfo, setUsersInfo] = useState(null);

  useEffect(() => {
    // check if we have token

    (async () => {
      const response = await fetch(`${API_HOST}/user/get-all`, {headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }})

      console.log(await response.json());
      setUsersInfo(await response.json())
    })()
  }, [])

  return (
    usersInfo?
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={usersInfo}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    :<p>No userinfo</p>
  );
}

const Admin = ()=>{
  
  return (

    <div>
      
    <Navbar/>

    
    <DataGridDemo/>


    <Footer/>
    </div>
  );
}


export default Admin; 
