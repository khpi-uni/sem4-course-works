import "./Thanks.css"
import {API_HOST, getToken} from "../api.js";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import * as React from 'react';
import {useEffect, useState} from "react";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {DataGrid} from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Checkbox} from "@mui/material";

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
            field: "is_blacklisted",
            headerName: "Blacklisted",
            renderCell: (data) => {
                const isBlacklisted = data.formattedValue; // 0 || 1
                return (
                    <Checkbox defaultChecked={!!isBlacklisted}
                              onChange={(e) => sendEditRequest({is_blacklisted: e.target.checked, email: data.row.email})}/>
                )
            }
        },
        {
            headerName: "Delete",
            renderCell: (data) => renderDeleteButton(data),
        }
    ]

    function renderDeleteButton(data) {
        return (
            <Button variant="contained" color="error" onClick={sendDeleteUserRequest.bind(null, data.row.email)}>Delete</Button>
        );
    }

    async function sendEditRequest(newData) {
        const myHeaders = new Headers();

        myHeaders.append('Authorization', `Bearer ${getToken()}`)

        const urlencoded = new URLSearchParams();
        urlencoded.append("email", newData?.email);
        urlencoded.append("shippingAddress", newData?.shipping_address);
        urlencoded.append("billingAddress", newData?.billing_address);
        urlencoded.append("blacklistStatus", newData?.is_blacklisted);
        urlencoded.append("role", newData?.role);

        const requestOptions = {
            method: 'PATCH', headers: myHeaders, body: urlencoded,
        };

        const response = await fetch(`${API_HOST}/user/edit`, requestOptions);

        const data = await response.json();

        if (data.error) {
            alert(data.error);
        }
    }

    async function sendDeleteUserRequest(email) {
        const myHeaders = new Headers();

        myHeaders.append('Authorization', `Bearer ${getToken()}`)
        const urlencoded = new URLSearchParams();
        urlencoded.append("email", email);

        const response = await fetch(`${API_HOST}/user/delete`, {
            method: "DELETE",
            headers: myHeaders,
            body: urlencoded
        });

        // If deletion is successful, remove the deleted user from the state
        if (response.ok) {
            setUsersInfo(prevState => prevState.filter(user => user.email !== email));
        } else {
            // Handle error here, alert or similar
            console.error('Failed to delete user');
        }
    }

    return (
        usersInfo.length > 0 ?
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
                    disableRowSelectionOnClick
                    processRowUpdate={(newData) => sendEditRequest(newData)}
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
                <DataGridDemo/>
            </Container>
            <Footer/>
        </div>
    );
}


export default Admin; 
