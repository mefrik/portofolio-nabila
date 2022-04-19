import React from 'react';
import './MyEquipments.css';
import ImageTools1 from '../Image/logo-blender.png';
import ImageTools2 from '../Image/logo-csp.png';
import ImageTools3 from '../Image/logo-wacomintuos.png';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

const MyEquipments = () => {
    return (
        <>
            <Grid item xs={12} id='page-mytools'>
                <Box sx={{ bgcolor:'#F6E5F5', height: 'auto', width:'100%'}}>
                    <Grid xs={12}>
                        <Box 
                            sx={{ height: '10vh'}}
                            justifyContent="center"
                            alignItems='center'
                            display='flex'
                        >
                            <Typography variant='h3' paddingTop='20px'>
                                My Tools
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid 
                        container spacing={0} 
                        columns={{ xs: 0, sm: 0, md: 0 }}
                        justifyContent="space-around"
                        alignItems="center"
                        mt='20px'
                    >
                        <div className='mytools-image'>
                            <a href="https://www.blender.org">
                                <img 
                                    className='mytools-image-item' 
                                    src={ImageTools1} 
                                    alt='blender'
                                />
                            </a>
                            <a href="https://www.clipstudio.net/en/">
                                <img 
                                    className='mytools-image-item' 
                                    src={ImageTools2} 
                                    alt='clip studio paint'
                                />
                            </a>
                            <a href="https://www.wacom.com/en-us">
                                <img 
                                    className='mytools-image-item' 
                                    src={ImageTools3} 
                                    alt='wacom intuos'
                                />
                            </a>
                        </div>
                    </Grid>
                </Box>
            </Grid>
        </>
    )
}

export default MyEquipments
