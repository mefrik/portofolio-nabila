import { Grid } from '@mui/material'
import React from 'react'
import './ArtsNFT.css'

const ArtsNFT = () => {
  return (
    <Grid item xs={12} container='fixed' sx={{ height: '100vh'}}>
      <iframe 
          src='https://opensea.io/collection/oragenah?embed=true'
          frameborder='0'
          allowFullScreen
          className='ArtsNFT-frame'
      />
    </Grid>
  )
}

export default ArtsNFT