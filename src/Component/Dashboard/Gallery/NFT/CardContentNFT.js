import React, { useState, useEffect } from 'react';
import './CardContentNFT.css';

const CardContentNFT = (props) => {
    let NoFoundImage = "https://firebasestorage.googleapis.com/v0/b/portofolio-nabila.appspot.com/o/project%2FNoImageFound.png?alt=media&token=b02d7a75-7fce-4c1f-8b26-53af6dadbf77";
    const [hasImage, setHasImage] = useState(NoFoundImage);
    useEffect(() => {
        if(props.url){
            setHasImage(props.url)
        }
      }, [])

    return (
        <div className='gallerynft-cardnft-container'>
            <div className='cardnft-container'>
                <img className='cardnft-image' src={hasImage} alt='cardnft'/>
                <div className='cardnft-desc-container'>
                    <p className='cardnft-title'>{props.title}</p>
                    {/* <p className='cardnft-desc'>{props.description}</p> */}
                </div>
            </div>
        </div>
    )
}

export default CardContentNFT
