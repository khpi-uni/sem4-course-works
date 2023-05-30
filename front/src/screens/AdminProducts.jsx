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
import {AddProduct} from "../components/admin/products/AddProduct.jsx";

function DataGridDemo() {
    const [productsInfo, setProductsInfo] = useState([]);

    useEffect(() => {
        // check if we have token
        (async () => {
            const response = await fetch(`${API_HOST}/product/get-all`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            const data = await response.json();

            setProductsInfo(data.products);
        })()
    }, [])

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 30
        },
        {
            field: "title",
            headerName: "Title",
            editable: true
        },
        {
            field: "price",
            headerName: "Price",
            editable: true

        },
        {
            field: "description",
            headerName: "Description",
            editable: true
        },
        {
            field: "in_stock",
            headerName: "In Stock",
            width: 70,
            editable: true,
            renderCell: (data) => {
                const inStock = data.formattedValue; // 0 || 1
                return (
                    <Checkbox defaultChecked={!!inStock}
                              onChange={(e) => sendEditRequest({in_stock: e.target.checked, id: data.row.id})}/>
                )
            }
        },
        {
            field: "thumbnail_url",
            headerName: "Thumbnail Url",
            editable: true
        },
        {
            field: "created_at",
            headerName: "Created At",
            width: 200
        },
        {
            field: "updated_at",
            headerName: "Updated At",
            width: 200
        },
        {
            headerName: "Delete",
            renderCell: (data) => renderDeleteButton(data),
        }
    ]

    function renderDeleteButton(data) {
        return (
            <Button variant="contained" color="error"
                    onClick={sendDeleteRequest.bind(null, data.row.i)}>Delete</Button>
        );
    }

    async function sendEditRequest(newData) {
        const myHeaders = new Headers();

        myHeaders.append('Authorization', `Bearer ${getToken()}`)

        const urlencoded = new URLSearchParams();
        urlencoded.append("id", newData.id);
        if (newData.title) {
            urlencoded.append("title", newData.title);
        }
        if (newData.description) {
            urlencoded.append("description", newData.description);
        }
        if (newData.price) {
            urlencoded.append("price", newData.price);
        }
        if (newData.in_stock) {
            urlencoded.append("inStock", newData.in_stock);
        }
        if (newData.thumbnail_url) {
            urlencoded.append("thumbnailUrl", newData.thumbnail_url);
        }

        const requestOptions = {
            method: 'PATCH', headers: myHeaders, body: urlencoded,
        };

        const response = await fetch(`${API_HOST}/product`, requestOptions);

        const data = await response.json();

        if (data.error) {
            alert(data.error);
        }
    }

    async function sendDeleteRequest(productId) {
        const myHeaders = new Headers();

        myHeaders.append('Authorization', `Bearer ${getToken()}`)
        const urlencoded = new URLSearchParams();
        urlencoded.append("id", productId);

        const response = await fetch(`${API_HOST}/product`, {
            method: "DELETE",
            headers: myHeaders,
            body: urlencoded
        });

        // If deletion is successful, remove the deleted user from the state
        if (response.ok) {
            setProductsInfo(prevState => prevState.filter(order => order.id !== productId));
        } else {
            // Handle error here, alert or similar
            console.error('Failed to delete order');
        }
    }

    return (
        productsInfo.length > 0 ?
            <Box sx={{width: '100%'}}>
                <DataGrid
                    rows={productsInfo}
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
                    processRowUpdate={(newData) => {
                        sendEditRequest(newData);
                    }}
                    onProcessRowUpdateError={(e) => {
                        console.log(e)
                        console.log('ERROR')
                    }}
                />
            </Box>
            : <p>No products</p>
    );
}

const AdminProducts = () => {

    return (
        <div>
            <Navbar/>
            <Container sx={{margin: "25px auto"}}>
                <Typography variant={"h4"} mb={1.5}>Products</Typography>
                <AddProduct />
                <DataGridDemo/>
            </Container>
            <Footer/>
        </div>
    );
}

export default AdminProducts;
