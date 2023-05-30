import Button from "@mui/material/Button";
import {useState} from "react";
import {Divider, FormControlLabel, Modal, Switch} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {API_HOST, getToken} from "../../../api.js";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const inputStyle = {
    display: 'block',
    marginTop: 2,
    marginBottom: 2
}


export const AddProduct = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [price, setPrice] = useState('');
    const [inStock, setInStock] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !price) {
            alert('price and title are required');
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${getToken()}`)

        const urlencoded = new URLSearchParams();
        urlencoded.append("title", title);
        urlencoded.append("description", description);
        urlencoded.append("thumbnailURL", imageURL);
        urlencoded.append("price", price);
        urlencoded.append("inStock", inStock);

        const response = await fetch(`${API_HOST}/product`, {
            method: "POST",
            headers: myHeaders,
            body: urlencoded
        });

        if (response.ok) {
            alert('product added');
        } else {
            alert('error');
        }
    }

    return (
        <>
            <Button onClick={handleOpen} sx={{marginBottom: 1}} variant={'contained'}>Add product</Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Add a product
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField label={'Title'} sx={inputStyle} onInput={(e) => setTitle(e.target.value)}
                                   value={title}/>
                        <TextField label={'Description'} sx={inputStyle} onInput={(e) => setDescription(e.target.value)}
                                   value={description}/>
                        <TextField label={'Image URL'} sx={inputStyle} onInput={(e) => setImageURL(e.target.value)}
                                   value={imageURL}/>
                        <Divider/>
                        <TextField label={'Price'} sx={inputStyle}
                                   inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                                   onInput={(e) => setPrice(e.target.value)} value={price}/>
                        <FormControlLabel control={<Switch defaultChecked/>} sx={inputStyle} label="In Stock"
                                          onInput={(e) => setInStock(e.target.checked)}/>
                        <Divider/>
                        <Button variant={'contained'} type={'submit'} sx={{display: 'block', marginTop: 2}}>Add
                            product</Button>
                    </form>
                </Box>
            </Modal>
        </>
    )
}