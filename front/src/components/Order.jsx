
import "./Order.css";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


import * as React from 'react';
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



import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';



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


const Order = (props) =>{
  const data = props.json_array;
  console.log(data);
  const [expanded, setExpanded] = React.useState(0);

  const handleExpandClick = (i) => {
    setExpanded(i);
  };
  return (
<div>
  
    {
      data.length?(
        data.map((el,i)=>(

      <Card sx={{padding: "1em 0.5em"}}>
        <Box sx={{display:"flex",flexDirection:"row",flexGrow:"1"}}>
      <Typography sx={{alignSelf:"start",flexGrow:"1"}}>
        {el.order_date}
      </Typography>
      <Typography sx={{justifySelf:"end",}}>
        {el.total}
      </Typography>
      </Box>

  <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={(expanded==i)}
          onClick={()=>handleExpandClick(i)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded==i} timeout="auto" unmountOnExit>
        <CardContent>
                  <List>
          {
           el.items.map((el,j)=>(
          <ListItem key={el}>
            <ListItemButton sx={{padding:"2em"}}>
             <Typography sx={{fontsize:"0.75em"}}>{el.product_title}</Typography>
             <ListItemText primary={el.price} />
            </ListItemButton>
          </ListItem>

           )) 
          
          }
            </List>

        </CardContent>
      </Collapse>

        </Card>
        ))
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


export default Order; 
