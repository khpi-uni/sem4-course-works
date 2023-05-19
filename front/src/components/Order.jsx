
import "./Order.css";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';


const Order = (props) =>{
  const data = props.json_array;
  return (
<div>
  
    {
      data.length?(
        data.map(el=>(

      <Card sx={{padding: "1em 0.5em"}}>
        <Box sx={{display:"flex",flexDirection:"row",flexGrow:"1"}}>
      <Box sx={{alignSelf:"start",flexGrow:"1"}}>
        {el.order_date}
      </Box>
      <Box sx={{justifySelf:"end",}}>
        {el.total}
      </Box>
      </Box>
        </Card>
        ))
      )
        :"loading"
  }

</div>
  )
}


export default Order; 
