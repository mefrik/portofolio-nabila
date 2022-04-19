import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarHome.css';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import CollectionsIcon from '@mui/icons-material/Collections';
import { Grid, Tooltip } from '@mui/material';
import Zoom from '@mui/material/Zoom';

const NavbarHome = () => {
    // const handleIntro = () =>{
    //     window.scrollTo(0, 0)
    // }
    // const handleAboutMe = () =>{
    //     window.scrollTo(0, 682)
    // }
    // const handleMyProject = () =>{
    //     window.scrollTo(0, 1362)
    // }

    return (
        <>
            <Grid item xs={12} container>
                <div className='navbarhome-container'>
                    <div className='navbarhome-box'>
                        <Link to='/login' >
                            <Tooltip title="Login" placement='left' TransitionComponent={Zoom}>
                                <p className='navbarhome-text'><LoginOutlinedIcon fontSize='large'/></p>
                            </Tooltip>
                        </Link>
                        <Tooltip title="Introduction" placement='left' TransitionComponent={Zoom}>
                            <a className='navbarhome-text' href='#page-myintro'><AddReactionOutlinedIcon fontSize='large'/></a>
                        </Tooltip>
                        <Tooltip title="About Me" placement='left' TransitionComponent={Zoom}>
                            <a className='navbarhome-text' href='#page-aboutme'><AssignmentIndOutlinedIcon fontSize='large'/></a>
                        </Tooltip>
                        <Tooltip title="My Projects" placement='left' TransitionComponent={Zoom}>
                            <a className='navbarhome-text' href='#page-myproject'><LibraryBooksOutlinedIcon fontSize='large'/></a>
                        </Tooltip>
                        <Tooltip title="My Arts" placement='left' TransitionComponent={Zoom}>
                            <a className='navbarhome-text' href='#page-myarts'><CollectionsIcon fontSize='large'/></a>
                        </Tooltip>
                        <Tooltip title="My Tools" placement='left' TransitionComponent={Zoom}>
                            <a className='navbarhome-text' href='#page-mytools'><ArchitectureIcon fontSize='large'/></a>
                        </Tooltip>
                        <Tooltip title="Hire me" placement='left' TransitionComponent={Zoom}>
                            <a className='navbarhome-text' href='#page-contact'><CallOutlinedIcon fontSize='large'/></a>
                        </Tooltip>
                    </div>
                </div>
            </Grid>
        </>
    )
}

export default NavbarHome
