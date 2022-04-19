import React from 'react';
import './CardProject.css'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Chip, Stack } from '@mui/material';
import { useNavigate } from 'react-router';

export default function CardProject(props) {
  console.log(props.title)
  // const [params, setParams] = useState('');
  const navigate = useNavigate();

  const handleClick = (event) => {
    const params = `/project/${props.id}`
    // console.log(props)
    navigate(params)
  }

  return (
    <Card 
        Paper elevation={3} 
        sx={{ width: 250, height: 'auto', zIndex: 1 }} 
        className='card-container' 
        key={props.id}
    >
      <CardHeader
        title={props.title}
        subheader={Date(props.startDate)}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.urlThumbnail}
        // alt="Paella dish"
      />
      <Stack display='flex' flexDirection={'row'} justifyContent='space-between'>
        <CardContent>
            <Chip label={props.category} color="success" />
        </CardContent>
        <CardActions>
            <Button 
              size="large" 
              sx={{fontWeight: 'bold'}}
              onClick={handleClick}
            >
              Read More
            </Button>
        </CardActions>
      </Stack>
    </Card>
  );
}
