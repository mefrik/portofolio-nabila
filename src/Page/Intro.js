import React, { useState, useEffect } from 'react';
import './Intro.css';
import { db } from '../firebase/firebase';
import { collection, getDocs, getDoc, doc } from '@firebase/firestore';
import { Parallax } from 'react-parallax';
import { Grid } from '@mui/material';

const Intro = () => {
    //Parallax
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => setOffsetY(window.pageYOffset);

    const [dataExpertise, setdataExpertise] = useState([]);
    // const [dataProfileImage, setDataProfileImage] = useState("");
    const [dataDesctiptionIntro, setDataDescriptionIntro] = useState("");
    const [dataBackgroundImage, setDataBackgroundImage] = useState("");
    const expertiseCollectionRef = collection(db, "expertise");
    const descIntroDetailsRef = doc(db, "descintro", "details");
    // const descIntroProfileImage = doc(db, "descintro", "photo-intro");
    const descIntroBackgroundImage = doc(db, "descintro", "background-intro");

    const handleGetData = async () =>{
        const getDataExpertise = await getDocs(expertiseCollectionRef);
        const getDataDescIntroDetails = await getDoc(descIntroDetailsRef);
        // const getDataDescIntroProfileImage = await getDoc(descIntroProfileImage);
        const getDataDescIntroBackgroundImage = await getDoc(descIntroBackgroundImage);
        setdataExpertise(getDataExpertise.docs.map((doc) => ({ 
            ...doc.data(), id: doc.id
        })))
        setDataDescriptionIntro(getDataDescIntroDetails.data().description)
        // setDataProfileImage(getDataDescIntroProfileImage.data().url)
        setDataBackgroundImage(getDataDescIntroBackgroundImage.data().url)
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
            <Grid item xs={12}>
                <div id='page-myintro'>
                    <Parallax 
                        blur={{ min: -15, max: 15 }} 
                        // bgImage={dataBackgroundImage}
                        strength={-200}
                    >
                        <div 
                            className='intro-container'
                            style={{ transform: `translateY(${offsetY * 0.5}px)` }}    
                        >
                        <video 
                            className='intro-bg' 
                            src={dataBackgroundImage} 
                            alt='intro-bg'
                            autoPlay loop muted
                        />
                            <div className='intro-left'>
                                <div className='intro-text'>
                                    <div className='intro-name-wrapper'>
                                        <h1 className='intro-name'>Hi, I'm</h1>
                                        <h1 className="intro-nickname"> Nabila </h1>
                                    </div>
                                    <div className='intro-desc-wrapper'>
                                        <div className='intro-wrapper'>
                                            <div>
                                                {dataExpertise.map((dataExpertise) =>
                                                <div 
                                                    className='intro-desc-wrapper-item' 
                                                    key={dataExpertise.id}
                                                >
                                                    {dataExpertise.title}
                                                </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <h4 id='descIntro' className='intro-desc'>{dataDesctiptionIntro}</h4>
                                </div>
                            </div>
                            <div className='intro-right'>
                                {/* <img className='intro-bg' src={IntroImage} alt='intro-bg' />
                                <p className='intro-bg-2nd'/>
                                    <Image
                                        className='intro-image'
                                        height={670}
                                        preview={false}
                                        src={ImageProfile}
                                    /> */}
                                {/* <img
                                    className='intro-image'
                                    alt='intro'
                                    height={670}
                                    preview={false}
                                    loop= 'infinite'
                                    src={dataProfileImage}
                                /> */}
                            </div>
                        </div>
                    </Parallax>
                </div>
            </Grid>
        </>
    )
}

export default Intro
