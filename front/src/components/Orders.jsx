
import React, { useState, useEffect } from 'react';
import "./Orders.css";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


async function parseJson(){
  const data = await fetch("../../tmp_json/orders.json").then((response)=>response.json());

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

   const [data, setData] = useState(0);


   useEffect(()=>{
      fetchData();
   },[]);

  const fetchData = async () => {
        const response = await parseJson();
        setData(response);
   };

  const [expanded,setExpanded] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={2} sm={4} md={4} >
      {JSON.stringify(data)}    
    {
      data.length?(
        data.map((el,i)=>(

      <Card>
        <Box sx={{display:"flex",flexDirection:"row",flexGrow:"1"}}>
      <Box sx={{alignSelf:"start",flexGrow:"1"}}>
        {el.order_date}
      </Box>
      <Box sx={{justifySelf:"end",}}>
        {el.total}
      </Box>
      </Box>

          <ExpandMore
          expand={i === expanded}
          onClick={()=>setExpanded(i)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>


        </Card>
        ))
      )
        :"loading"
    }
          </Grid>
        
      </Grid>
    </Box>
  );
    //    {data.length?data.map(el=><p>el</p>):<p>loading...</p>}
}

const Orders = () =>{
  return (
    <ResponsiveGrid/>
  );


   
}

export default Orders; 
