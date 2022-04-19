import React, { useState, useEffect } from "react";
import './UploadImage.css';

const UploadImage = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isHasImage, setIsHasImage] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleAddImage = (event) =>{
    let tempData = event.target.files[0]
    setSelectedImage(tempData);
    props.handleGetImage(tempData)
    setIsHasImage(false)
  }

  const handleRemoveImage = (event) =>{
    setSelectedImage(null);
    props.handleGetImage(event.target.id)
    setIsHasImage(false)
  }

  const handleSet = () =>{
    if(!props.edit){
      // console.log('New')
        setIsEdit(false)
        if(!props.edit.url){
          // console.log('No image')
            setIsHasImage(false)
        } else{
          // console.log('Has image')
          setIsHasImage(true)
          setSelectedImage(props.edit.url)
        }
    } else{
      // console.log('Edit')
      setIsEdit(true)
      if(!props.edit.url){
        // console.log('No image')
          setIsHasImage(false)
      } else{
        // console.log('Has image')
        setIsHasImage(true)
        setSelectedImage(props.edit.url)
      }
    }
  }

  useEffect(() => {
    if(!!props.edit || !!props.id){
      handleSet();
    }
  })
  
  return (
    <div className='uploadimage-container'>
      <input
        className='uploadimage-btn-add'
        type="file"
        name="myImage"
        onChange={handleAddImage}
      />
      {selectedImage && (
        console.log(selectedImage),
        <div className='uploadimage-view-container'>
            {isEdit && (
              <img 
              className='uploadimage-view-image'
              alt="not found" 
              src={isHasImage ? selectedImage : URL.createObjectURL(selectedImage) }
              />
            )}
            {!isEdit && (
              <img 
              className='uploadimage-view-image'
              alt="not found" 
              src={isHasImage ? selectedImage : URL.createObjectURL(selectedImage) }
              />
            )}
          <button
            id={props.id}
            className='uploadimage-view-btn-remove'
            onClick={(event) => handleRemoveImage(event)}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  )
}

export default UploadImage;