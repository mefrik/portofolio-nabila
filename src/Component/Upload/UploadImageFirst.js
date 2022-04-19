import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Grid, IconButton, ImageListItemBar, ImageListItem } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ImageList from '@mui/material/ImageList';


const Input = styled('input')({
    display: 'none',
  });

const UploadImageFirst = (props) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isHasImage, setIsHasImage] = useState(true);

    const handleAddImage = (event) =>{
        let tempData = event.target.files[0]
        setSelectedImage(tempData);
        props.handleGetImageFirst(tempData)
        setIsHasImage(false)
     }

     const handleRemoveImage = (event) =>{
        let tempData = 'Delete'
        props.handleGetImageFirst(tempData)
        setSelectedImage(null);
        setIsHasImage(false)
     }

    const handleShowImage = () => {
        setSelectedImage(props.url)
    }

    useEffect(() => {
        if(props.url !== ''){
            handleShowImage()
        }
    }, [])
  return (
    <>
        <fieldset style={{borderRadius: "6px", border:"2px solid #DFDFDE", margin: 0, height:"100%"}}>
            <legend >Image 1</legend>
            <Grid item xs={12} container spacing={2}>
                <Grid item xs={3}>
                    <label htmlFor="contained-button-image1">
                        <Input accept="image/*" id="contained-button-image1" multiple type="file" onChange={handleAddImage}/>
                        <Button variant="contained" component="span" disabled={props.loading}>
                            Upload
                        </Button>
                    </label>
                </Grid>
                {selectedImage? 
                        <Grid item xs={'auto'}>
                            <ImageList sx={{ maxWidth: 250, maxHeight: 200, overflow:"hidden" }}>
                                <ImageListItem>
                                    <img 
                                        className='uploadimage-view-image-image1'
                                        alt="not found" 
                                        src={isHasImage ? selectedImage : URL.createObjectURL(selectedImage)}
                                    />
                                    <ImageListItemBar
                                        // title={item.title}
                                        // subtitle={item.author}
                                        actionIcon={
                                            <IconButton
                                                sx={{ color: 'red'}}
                                                // aria-label={`info about ${item.title}`}
                                                onClick={handleRemoveImage}
                                            >
                                                <DeleteForeverIcon />
                                            </IconButton>
                                        }
                                    />
                                </ImageListItem>
                            </ImageList>
                        </Grid>
                    :
                    ""
                }
            </Grid>
        </fieldset>
    </>
  )
}

export default UploadImageFirst