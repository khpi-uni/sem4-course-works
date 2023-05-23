import SignIn from "../screens/SignIn.jsx"

import * as React from 'react';
import { useContext } from 'react';
import {AuthContext} from '../AuthContext.js'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState, useEffect } from 'react';



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



async function parseJson(){
  const data = await fetch("../../tmp_json/orders.json").then((response)=>response.json());

  return data.orders;
}

const OrdersForPayment = (props) =>{
  const [data,setData] = useState(0);

  useEffect(()=>{
    setData(props.json_array[0]);
    console.log(data);
  })

  const [expanded, setExpanded] = React.useState(0);

  const auth = useContext(AuthContext);

  const handlePlusClick = (j)=>{
    console.log(data.items)

   data.items[j].amount = parseInt(data.items[j].amount)+1;
    setData(JSON.parse(JSON.stringify(data)));
  }

  const handleMinusClick = (j)=>{

    
   data.items[j].amount = parseInt(data.items[j].amount)-1;
    setData(JSON.parse(JSON.stringify(data)));
  }

  const handleCrossClick = (i)=>{
    data.splice(i,1);
  }

  const handleExpandClick = (i) => {
    setExpanded(i);
  };
  return (
<div>
  
    {
      data?(

      <Card sx={{padding: "1em 0.5em"}}>
        <Box sx={{display:"flex",flexDirection:"row",flexGrow:"1"}}>
      <Typography sx={{alignSelf:"start",flexGrow:"1"}}>
        {data.order_date}
      </Typography>
      <Typography sx={{justifySelf:"end",}}>
        {data.total}
      </Typography>
      </Box>

                  <List>
          {
           data.items.map((el,j)=>(
          <ListItem sx={{padding:"0em"}} key={j}>
            <ListItemButton sx={{height:"10em",display:"flex",justifyContent:"space-between"}}>
             <Box sx={{height:"5em",width:"5em",display:"flex",alignItems:"center"}}>
              <img src={el.image} alt="smth" style={{maxWidth: "100%"}}/>
             </Box> 
              <Box sx={{display:"flex",flexDirection:"column",justifySelf:"end"}}>
                
             <Typography  >{el.product_title}</Typography>

             <Box sx={{alignSelf:"end",display:"flex",flexDirection:"row"}}>

             <Box  variant="subtitle2">{el.price + " ✖️ " } </Box>

             <Box sx={{padding:"0 1em ",display:"flex"}}>
             <IconButton sx={{padding:"0"}}onClick={()=>handleMinusClick(j)}>
                <RemoveIcon sx={{fontSize:14,color:"secondary.light"}}/>
             </IconButton>
             <Box  variant="subtitle2">{ el.amount} </Box>
             <IconButton sx={{padding:"0"}} onClick={()=>handlePlusClick(j)}>
                <AddIcon sx={{fontSize:14,color:"secondary.light"}}/>
             </IconButton>
             </Box>


             <Box>{  " 🟰 " + el.amount*el.price}</Box></Box>
              </Box>
            </ListItemButton>
          </ListItem>

           )

           )
        }

        auth?(
          <SignIn/>
          
        ):(<div>
          
        </div>)
          

          
            </List>


    <div>
      <Typography>{"Order Total:"+data.items.reduce((sum,current)=> sum+parseInt(current.price)*current.amount,0) }</Typography>
    </div>

    <Button variant="contained"
    component="a" href=""
    sx={{margin:"1em"  }}
    >Pay</Button>
        </Card>
        )
      
        :
      <Container maxWidth="sm"> 

      <Card sx={{padding:"9em 1em",textAlign:"center"}}> 
        <Typography variant="h5">There are currently no orders!</Typography>
      </Card>
      </Container>
  }
  
</div>
  )
}

export default OrdersForPayment;
