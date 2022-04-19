import React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import CardMyArts from './MyArts/CardMyaArts';

const MyaArts = () => {

    const listArts = [
        {
            key : 1,
            name : 'Comic',
            link : '/comic',
            bgColor : '#FBF46D',
            image: 'https://firebasestorage.googleapis.com/v0/b/portofolio-nabila.appspot.com/o/MyArts%2FComic.png?alt=media&token=2bd13ba0-6b3a-4ebb-a2c2-a495e29233f4',
        },
        {
            key : 2,
            name : 'NFT',
            link : '/nft',
            bgColor : '#B4FE98',
            image: 'https://firebasestorage.googleapis.com/v0/b/portofolio-nabila.appspot.com/o/MyArts%2FNFT.png?alt=media&token=ca8601f8-2ae6-4fcb-8e42-ffe0b2ad9c03',
        },
        {
            key : 3,
            name : '3D',
            link : '/3d',
            bgColor : '#77E4D4',
            image: 'https://firebasestorage.googleapis.com/v0/b/portofolio-nabila.appspot.com/o/MyArts%2F3D.png?alt=media&token=1cc002ae-9f3a-4768-889a-e08adf0518b2',
        },
    ]


    return (
        <>
            <Grid item xs={12} id='page-myarts' sx={{minHeight: '100vh', height:'auto'}}>
                <Grid 
                    item xs={12}
                    sx={{ height: '10vh'}}
                    justifyContent="center"
                    alignItems='center'
                    display='flex'
                >
                    <Typography variant='h3' paddingTop='20px'>
                        My Arts
                    </Typography>
                </Grid>
                <Grid 
                    item xs={12} 
                    container='fixed'
                    sx={{
                        display: 'flex', 
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '90vh',
                        height: 'auto',
                    }}
                    mt='30px'
                    mb='30px'
                >
                    {listArts.map((text, index) => (
                        <CardMyArts
                            name={text.name}
                            link={text.link}
                            color={text.bgColor}
                            image={text.image}
                        />
                    ))}
                </Grid>
            </Grid>
        </>
    )
}

export default MyaArts;