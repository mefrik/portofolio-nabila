import React from 'react';
import './CardProject.css'
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Chip } from '@mui/material';
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
  if(props.number % 2 == 1){
    return (
      <>
        <div
            className='card-container-odd' 
            key={props.id}
        >
          <CardMedia
            open={false}
            className='card-image-odd'
            component="img"
            image={props.urlThumbnail}
            // alt="Paella dish"
          />
          <div className='card-desc-odd'>
            <CardHeader
              title={props.title}
              subheader={Date(props.startDate)}
              className='card-header-odd'
            />
            <div className='card-footer-odd'>
              <CardContent>
                  <Chip label={props.category} color="success" />
              </CardContent>
              <CardActions>
                  <Button 
                    size="medium" 
                    sx={{fontWeight: 'bolder', zIndex: '1'}}
                    onClick={handleClick}
                  >
                    Read More
                  </Button>
              </CardActions>
            </div>
          </div>
          <div className='card-index-odd'>
            <p className='number-index-odd'>{props.number}</p>
          </div>
        </div>
      </>
    );
  }else {
    return (
      <>
        <div
            className='card-container-even' 
            key={props.id}
        >
          <div className='card-index-even'>
            <p className='number-index-even'>{props.number}</p>
          </div>
          <div className='card-desc-even'>
            <CardHeader
              title={props.title}
              subheader={Date(props.startDate)}
              sx={{
                display: 'flex',
                textAlign: 'right'
              }}
            />
            <div className='card-footer-even'>
              <CardActions>
                  <Button 
                    size="medium" 
                    sx={{fontWeight: 'bolder', zIndex: '1'}}
                    onClick={handleClick}
                  >
                    Read More
                  </Button>
              </CardActions>
              <CardContent>
                  <Chip label={props.category} color="success" />
              </CardContent>
            </div>
          </div>
          <CardMedia
            open={false}
            className='card-image-even'
            component="img"
            image={props.urlThumbnail}
            // alt="Paella dish"
          />
        </div>
      </>
    );
  }
  
}
