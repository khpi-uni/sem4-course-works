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

function DataGridDemo() {
    const [ordersInfo, setOrdersInfo] = useState([]);

    useEffect(() => {
        // check if we have token
        (async () => {
            const response = await fetch(`${API_HOST}/order/get-all`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            const data = await response.json();

            setOrdersInfo(Object.values(data));
        })()
    }, [])

    const columns = [
        {
            field: "orderId",
            headerName: "ID",
        },
        {
            field: "userId",
            headerName: "User id",
        },
        {
            field: "status",
            headerName: "Status",
            editable: true,
            type: "singleSelect",
            valueOptions: ["new", "declined", "in progress", "completed (sale)"],
            width: 250,

        },
        {
            field: "total",
            headerName: "Total",
        },
        {
            field: "createdAt",
            headerName: "Created at",
            width: 200
        },
        {
            headerName: "Delete",
            renderCell: (data) => renderDeleteButton(data),
        }
    ]

    function renderDeleteButton(data) {
        return (
            <Button variant="contained" color="error" onClick={sendDeleteOrderRequest.bind(null, data.row.orderId)}>Delete</Button>
        );
    }

    async function sendStatusChangeRequest(id, status) {
        const myHeaders = new Headers();

        myHeaders.append('Authorization', `Bearer ${getToken()}`)
        const urlencoded = new URLSearchParams();
        urlencoded.append("id", id);
        urlencoded.append('status', status);

        console.log(id, status);

        const response = await fetch(`${API_HOST}/order/update-status`, {
            method: "POST",
            headers: myHeaders,
            body: urlencoded
        });

        console.log(await response.json());
    }

    async function sendDeleteOrderRequest(orderId) {
        const myHeaders = new Headers();

        myHeaders.append('Authorization', `Bearer ${getToken()}`)
        const urlencoded = new URLSearchParams();
        urlencoded.append("id", orderId);

        const response = await fetch(`${API_HOST}/order`, {
            method: "DELETE",
            headers: myHeaders,
            body: urlencoded
        });

        // If deletion is successful, remove the deleted user from the state
        if (response.ok) {
            setOrdersInfo(prevState => prevState.filter(order => order.orderId !== orderId));
        } else {
            // Handle error here, alert or similar
            console.error('Failed to delete order');
        }
    }

    return (
        ordersInfo.length > 0 ?
            <Box sx={{width: '100%'}}>
                <DataGrid
                    rows={ordersInfo}
                    columns={columns}
                    getRowId={(row) => row.orderId}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 8,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    processRowUpdate={(newData) => {
                        sendStatusChangeRequest(newData.orderId, newData.status);
                    }}
                    onProcessRowUpdateError={(e) => {
                        console.log(e)
                        console.log('ERROR')
                    }}
                />
            </Box>
            : <p>No orders</p>
    );
}

const AdminOrders = () => {

    return (
        <div>
            <Navbar/>
            <Container sx={{margin: "25px auto"}}>
                <Typography variant={"h4"} mb={1.5}>Orders</Typography>
                <DataGridDemo/>
            </Container>
            <Footer/>
        </div>
    );
}


export default AdminOrders;
