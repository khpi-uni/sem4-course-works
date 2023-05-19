
import "./Orders.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

async function parseJson(){
//  const data = await fetch("../../tmp_json/orders.json").then((response)=>response.json());
  const data = fs.readFileSync("../../tmp_json/orders.json",{flag:'r'},(err,data)=>data.json());

  console.log(data.orders);
  return data.orders;
}

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

function ResponsiveGrid() {
  const order_array = parseJson();
  console.log(order_array);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(order_array.map((index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item>
          {index}
          </Item>
          </Grid>
        )))}
      </Grid>
    </Box>
  );
}

const Orders = () =>{
  return (
    <ResponsiveGrid/>
  );


   
}

export default Orders; 
