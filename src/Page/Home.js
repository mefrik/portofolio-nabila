import React from 'react';
import Intro from './Intro';
import Project from './Project';
import MyaArts from './MyArts';
import AboutMe from './AboutMe';
import MyEquipments from './MyEquipments';
import NavbarHome from './NavbarHome';
import FooterNav from './FooterNav';
import Contact from './Contact';
import { Box, Grid } from '@mui/material';


const Home = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid item xs={12} container='fixed'>
                    <NavbarHome />
                    <Intro />
                    <AboutMe />
                    <Project />
                    <MyaArts />
                    <MyEquipments />
                    <Contact />
                    <FooterNav />
                </Grid>
            </Box>
        </>
    )
}

export default Home;
