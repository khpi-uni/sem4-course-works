import "./Thanks.css"
import {API_HOST} from "../api.js";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import * as React from 'react';
import {useEffect, useState} from "react";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {DataGrid} from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


const columns = [
    {
        field: "id",
        headerName: "ID",
    },
    {
        field: "email",
        headerName: "Email",
        width: 250
    },
    {
        field: "shipping_address",
        headerName: "Shipping Address",
        width: 150,
        editable: true,
    },
    {
        field: "billing_address",
        headerName: "Billing Address",
        width: 150,
        editable: true
    },
    {
        field: "role",
        headerName: "Role",
        editable: true
    },
    {
        headerName: "Delete",
        renderCell: renderDeleteButton,
    }
]

function renderDeleteButton() {
    return (
        <Button variant="contained" color="error">Delete</Button>
    );
}


function DataGridDemo() {


    const [usersInfo, setUsersInfo] = useState([]);

    useEffect(() => {
        // check if we have token

        (async () => {
            const response = await fetch(`${API_HOST}/user/get-all`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            const data = await response.json();

            setUsersInfo(data.users);
        })()
    }, [])

    return (
        usersInfo.length > 0     ?
            <Box sx={{width: '100%'}}>
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
                    processRowUpdate={(newRow) => {
                        console.log(newRow)
                    }}
                    onProcessRowUpdateError={(e) => {
                        console.log(e)
                        console.log('ERROR')
                    }}
                />
            </Box>
            : <p>No userinfo</p>
    );
}

const Admin = () => {

    return (
        <div>
            <Navbar/>
            <Container sx={{margin: "25px auto"}}>
                <Typography variant={"h4"} mb={1.5}>Users</Typography>
                <DataGridDemo />
            </Container>
            <Footer/>
        </div>
    );
}


export default Admin; 
