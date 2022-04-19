import React from 'react'
import './CardMyArts.css'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const CardMyArts = (props) => {
  return (
    <>
      <NavLink to={props.link} key={props.name0}>
        <Card 
          sx={{ 
            minWidth: 350, 
            minHeight: 350, 
            margin: '20px',
            backgroundColor: props.color,
          }}
        >
          <CardActionArea
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 350,
              zIndex: 1,
            }}
          >
            <CardMedia
              component="img"
              height={350}
              image={props.image}
              alt={props.name}
            />
            {/* <Typography variant="h4" display='flex'>
              {"<" + props.name + ">"}
            </Typography> */}
          </CardActionArea>
        </Card>
      </NavLink>
    </>
  )
}

export default CardMyArts