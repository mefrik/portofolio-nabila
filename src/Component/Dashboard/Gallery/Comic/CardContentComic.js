import React from 'react';
import './CardContentComic.css';

const CardContentComic = (props) => {
    let NoFoundImage = "https://firebasestorage.googleapis.com/v0/b/portofolio-nabila.appspot.com/o/project%2FNoImageFound.png?alt=media&token=b02d7a75-7fce-4c1f-8b26-53af6dadbf77";

    return (
        <div className='gallerycomic-cardcomic-container'>
            <div className='cardcomic-container'>
                <img className='cardcomic-image' src={props.url ? props.url : NoFoundImage} alt='cardcomic'/>
                {/* <div className='cardcomic-desc-container'>
                    <p className='cardcomic-title'>{props.title}</p>
                    <p className='cardcomic-desc'>{props.description}</p>
                </div> */}
            </div>
        </div>
    )
}

export default CardContentComic
