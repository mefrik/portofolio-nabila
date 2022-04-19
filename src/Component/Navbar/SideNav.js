import React, { useState } from 'react';
import './SideNav.css';
import { signOut } from '@firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router';

const SideNav = (props) => {
    const[toogleNav,setToogleNav] = useState(true);
    let navigate = useNavigate();

    const handleLogOut = async () => {
        await signOut(auth);
        navigate('/');
    };

    const handleToogleNav = () => {
        setToogleNav(!toogleNav)
        if (toogleNav){
            document.getElementById("Dashboard-Main").style.width = "100%";
            document.getElementById("Dashboard-Main").style.marginLeft = "-10%";
            document.getElementById("Dashboard-Main").style.transition = "0.5s";
        } else{
            document.getElementById("Dashboard-Main").style.marginLeft = "0%";
            document.getElementById("Dashboard-Main").style.transition = "0.5s";
        }
    }

    const handleIsClicked = (event) => {
        if(event.target.id === "Intro"){
            props.setIsIntroClicked(true);
            props.setIsAboutMeClicked(false);
            props.setIsMyProjectClicked(false);
            props.setIsGalleryClicked(false);
        } else if(event.target.id === "About Me"){
            props.setIsIntroClicked(false);
            props.setIsAboutMeClicked(true);
            props.setIsMyProjectClicked(false);
            props.setIsGalleryClicked(false);
        } else if(event.target.id === "My Project"){
            props.setIsIntroClicked(false);
            props.setIsAboutMeClicked(false);
            props.setIsMyProjectClicked(true);
            props.setIsGalleryClicked(false);
            props.setIsAddProjectClicked(false);
        } else if(event.target.id === "Gallery"){
            props.setIsIntroClicked(false);
            props.setIsAboutMeClicked(false);
            props.setIsMyProjectClicked(false);
            props.setIsGalleryClicked(true);
        }
    }

    return (
        <>
            <div className={toogleNav ? 'sidenav-container-active' : 'sidenav-container-hide'}>
                <div className='sidenav-logo'>
                    <p className='sidenav-image'>Hallo</p>
                </div>
                <div className='sidenav-list-container'>
                    <div className='sidenav-list-menu-top'>
                        <button 
                            id='Intro' 
                            className='sidenav-list' 
                            onClick={handleIsClicked} 
                        >
                        <i id='Intro' className={toogleNav ? "icon-active fab fa-ioxhost fa-2x" : "icon-hide fab fa-ioxhost fa-2x" }/>
                        <p id='Intro' className={toogleNav ? 'sidenav-list-text-active' : 'sidenav-list-text-hide' }> Intro </p>
                        </button>
                        <button 
                            id='About Me' 
                            className='sidenav-list'
                            onClick={handleIsClicked} 
                        >
                        <i id='About Me' className={toogleNav ? "icon-active fas fa-address-card fa-2x" : "icon-hide fas fa-address-card fa-2x" }/>
                        <p id='About Me' className={toogleNav ? 'sidenav-list-text-active' : 'sidenav-list-text-hide' } > About Me </p>
                        </button>
                        <button 
                            id='My Project' 
                            className='sidenav-list'
                            onClick={handleIsClicked} 
                        >
                        <i id='My Project' className={toogleNav ? "icon-active fab fa-unity fa-2x" : "icon-hide fab fa-unity fa-2x" }/>
                        <p id='My Project' className={toogleNav ? 'sidenav-list-text-active' : 'sidenav-list-text-hide' } > My Project </p>
                        </button>
                        <button 
                            id='Gallery' 
                            className='sidenav-list'
                            onClick={handleIsClicked} 
                        >
                        <i id='Gallery' className={toogleNav ? "icon-active fas fa-images fa-2x" : "icon-hide fas fa-images fa-2x"}/>
                        <p id='Gallery' className={toogleNav ? 'sidenav-list-text-active' : 'sidenav-list-text-hide' } > Gallery </p>
                        </button>
                    </div>
                    <div className='sidenav-list-menu-bottom'>
                        <button 
                            id='logout'
                            className='sidenav-list'
                            onClick={handleLogOut}
                        >
                        <i id='logout' className={toogleNav ? "icon-active fas fa-sign-out-alt fa-2x" : "icon-hide fas fa-sign-out-alt fa-2x" }/>
                        <p id='logout' className={toogleNav ? 'sidenav-list-text-active' : 'sidenav-list-text-hide' } > Log Out </p>
                        </button>
                        <div 
                            id='back'
                            className='sidenav-back'
                            onClick={handleToogleNav}
                        >
                        <i className={toogleNav ? "fas fa-arrow-circle-left fa-2x" : "fas fa-arrow-circle-right fa-2x"}></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideNav
