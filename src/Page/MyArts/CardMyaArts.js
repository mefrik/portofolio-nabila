import React from 'react'
import './CardMyArts.css'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { NavLink } from 'react-router-dom';

const CardMyArts = (props) => {
  return (
    <>
      <NavLink to={props.link} key={props.name0}>
        <Card 
          sx={{ 
            margin: '20px',
            backgroundColor: props.color,
          }}
          className='card-myarts-container'
        >
          <CardActionArea
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 'auto',
              zIndex: 1,
            }}
          >
            <CardMedia
              component="img"
              height='auto'
              image={props.image}
              alt={props.name}
            />
          </CardActionArea>
        </Card>
      </NavLink>
    </>
  )
}

export default CardMyArts