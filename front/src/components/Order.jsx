
import "./Order.css";
import Box from '@mui/material/Box';


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
  const [expanded, setExpanded] = React.useState(0);

  const handleExpandClick = (i) => {
    console.log(i);
    console.log(expanded);
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
          <Typography>lots of content</Typography>
        </CardContent>
      </Collapse>

        </Card>
        ))
      )
        :"loading"
  }

</div>
  )
}


export default Order; 
