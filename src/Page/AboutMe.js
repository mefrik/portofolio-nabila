import React, { useEffect, useState } from 'react';
import './AboutMe.css';
import AboutMeImage from '../Image/card-image.png';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

const AboutMe = () => {
    //Parallax
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => setOffsetY(window.pageYOffset); 

    const [aboutMeData,setAboutMeData] = useState();
    const [dataemailC, setDataEmailC] = useState(false);
    const [dataFacebookC, setDataFacebookC] = useState(false);
    const [dataInstagramC, setDataInstagramC] = useState(false);
    const [dataYoutubeC, setDataYoutubeC] = useState(false);
    const [dataPinterestC, setDataPinterestC] = useState(false);

    const handleGetData = async () =>{
        const dataAboutme = await collection(db, "aboutme")   
        const getDataAboutMe = await getDocs(dataAboutme);
        getDataAboutMe.docs.forEach((doc) => {
            setAboutMeData(doc.data())
            setDataEmailC(doc.data().emailC)
            setDataFacebookC(doc.data().facebookC)
            setDataInstagramC(doc.data().youtubeC)
            setDataYoutubeC(doc.data().youtubeC)
            setDataPinterestC(doc.data().pinterestC)
        })
    }

    useEffect(() => {
        async function fetchData() {
            await handleGetData()
        }
        fetchData()
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    },[])

    return (
        <>
            <Grid item xs={12} id='page-aboutme' sx={{ height: '100vh' }}>
                <Grid 
                    xs={12}
                    sx={{ height: '10vh'}}
                    justifyContent="center"
                    alignItems='center'
                    display='flex'
                >
                    <Typography variant='h3' paddingTop='20px'>
                        About Me
                    </Typography>
                </Grid>
                <Grid xs={12} container='fixed' >
                    <Grid xs={6} sx={{ height: 'auto' }}>
                        <div className='aboutme-desc'>
                            <div className='aboutme-desc-top'>
                                <div className='aboutme-desc-column'>
                                    <p className='aboutme-desc-text-top'>Name</p>
                                    <p className='aboutme-desc-text-top'>State</p>
                                </div>
                                <div className='aboutme-desc-column'>
                                    <p className='aboutme-desc-text-top'>: {!!aboutMeData? aboutMeData.name: ""}</p>
                                    <p className='aboutme-desc-text-top'>: {!!aboutMeData? aboutMeData.state: ""}</p>
                                </div>
                            </div>
                            <div className='aboutme-desc-column'>
                                <p className='aboutme-desc-text-mid'>{!!aboutMeData? aboutMeData.descaboutme : ""}</p>
                            </div>
                        </div>
                    </Grid>
                    <Grid 
                        xs={6}
                        sx={{ height: 'auto' }}
                        justifyContent="center"
                        alignItems='center'
                        display='flex'
                    >
                        <p className='aboutme-image-siluet' 
                            style={{ transform: `translateX(${offsetY * -0.01}px)` }}>
                        </p>
                        <img 
                            src={!!aboutMeData? aboutMeData.url : AboutMeImage} 
                            alt="Italian Trulli"
                            className='aboutme-image'
                            style={{ transform: `translateX(${offsetY * -0.02}px)` }}
                        />
                    </Grid>
                </Grid>
                <Grid 
                    container spacing={0}
                    columns={{ xs: 0, sm: 0, md: 0 }}
                    sx={{ height: 'auto' }}
                    className='aboutme-desc-bottom'
                    justifyContent="space-around"
                    alignItems="center"
                >
                    {dataemailC && 
                        <div className='aboutme-medsos email medsos-transition'>
                            <i className="far fa-envelope fa-2x"></i>
                            <a href="https://www.w3schools.com" className='aboutme-desc-column'>Email</a>
                        </div>
                    }
                    {dataFacebookC && 
                        <div className='aboutme-medsos facebook medsos-transition'>
                            <i className="fab fa-facebook fa-2x"></i>
                            <a href="https://www.w3schools.com" className='aboutme-desc-column'>Facebook</a>
                        </div>
                    }
                    {dataInstagramC &&
                        <div className='aboutme-medsos instagram medsos-transition'>
                            <i className="fab fa-instagram fa-2x"></i>
                            <a href="https://www.w3schools.com" className='aboutme-desc-column'>Instagram</a>
                        </div>
                    }
                    {dataYoutubeC &&
                        <div className='aboutme-medsos youtube medsos-transition'>
                            <i className="fab fa-youtube fa-2x"></i>
                            <a href="https://www.w3schools.com" className='aboutme-desc-column'>Youtube</a>
                        </div>
                    }
                    {dataPinterestC &&
                        <div className='aboutme-medsos pinterest medsos-transition'>
                            <i className="fab fa-pinterest fa-2x"></i>
                            <a href="https://www.w3schools.com" className='aboutme-desc-column'>Pinterest</a>
                        </div>
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default AboutMe
