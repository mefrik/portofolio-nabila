import { Chip, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import { Image } from 'antd';
import 'antd/dist/antd.css';
import './DetailProject.css'

const marginImamge = '40px';
const minWImgThumbnail = '100px';
const maxWImgThumbnail = '200px';
const minWImgOthers = '5px';
const maxWImgOthers = '5px';
const marginText = '20px';

const DetailProject = () => {
  const [data, setData] = useState([]);
  
  let { id } = useParams();

  const handleGetData = async () => {
    const docRef = doc(db, "project", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setData(docSnap.data());
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  useEffect(() => {
    handleGetData();
  }, [])
  


  return (
    <>
      <Grid 
        item xs={12} 
        container='sm'
        sx={{
          display: 'flex',
          height: '100vh',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        className='detailproject-container'
        fullWidth
      >
        <Grid item xs={12}>
          <Typography variant="h2" component="div" gutterBottom>{data.title}</Typography>
          <Typography>Company : {data.company}</Typography>
          <Stack justifyContent='left' width='100px' mt={marginText}>
            <Chip label={data.category} color="success"/>
          </Stack>
        </Grid>
        <Grid 
          item xs={12} 
          sx={{
            display: 'flex', 
            justifyContent: 'center'
            }}
          mt={marginImamge}
        >
          <Image
            className='detailproject-image thumbnail'
            src={data.urlThumbnail}
          />
        </Grid>
        <Typography 
          mt={marginText}
          variant="subtitle1" 
          component="div"
        >
          {data.description}
        </Typography>
        <Grid 
          item xs={12} 
          sx={{
            display: 'flex', 
            justifyContent: 'space-evenly'
            }}
          mt={marginImamge}
        >
          <Image
            className='detailproject-image images'
            src={data.urlImageFirst}
          />
          <Image
            className='detailproject-image images'
            src={data.urlImageSecond}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default DetailProject