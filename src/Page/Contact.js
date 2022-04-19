import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { collection, setDoc, doc} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import './Contact.css'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '0px solid #FFFFF',
    boxShadow: 24,
    p: 4,
    zIndex: 2,
  };

const Contact = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userMessage, setUserMessage] = useState("");
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setUserName('')
        setUserEmail('')
        setUserMessage('')
    }

    const handleYourName = (event) => {
        setUserName(event.target.value)
    }
    const handleYourEmail = (event) => {
        setUserEmail(event.target.value)
    }
    const handleYourMessage = (event) => {
        setUserMessage(event.target.value)
    }


    const handleContactSubmit = async () => {
        let contactData = 
            {
                userName: userName,
                userEmail: userEmail,
                userMessage: userMessage,
            }
        await setDoc(doc(db, "contact", contactData.userName), contactData).then(() => {
            handleOpen()
        }).catch((error) => {
            console.log("Ada error saat push data ke firebase errornya adalah : ", error)
        })
    }

  return (
    <>
        <Grid 
            item xs={12} 
            // container='fixed'
            id='page-contact'
            sx={{ bgcolor: '#F6E5F5', height: '92vh', width: '100%'}}
            justifyContent='center'
            alignItems='center'
            display='flex'
        >
            <Box 
                display='flex'
                flexDirection='column'
                variant='elevation'
                className='contact-box'
                sx={{
                    bgcolor: 'white', 
                    zIndex:'1', 
                    height:'auto', 
                    padding:'3%',
                    borderRadius: '4px',
                    boxShadow: '0px 0px 10px 3px #ECE2E1'
                }}
            >
                <Box
                    display='flex'
                    justifyContent='left'
                    flexDirection='column'
                >
                    <Typography variant='h3'>
                        Contact
                    </Typography>
                    <Box
                    display='flex'
                    justifyContent='left'
                    // flexDirection='column'
                    >
                        <Typography variant='h3'>
                            Me
                        </Typography>
                    </Box>
                </Box>
                <TextField 
                    id="standard-basic" 
                    margin="normal" 
                    component="h1" 
                    label="Your name" 
                    variant="standard"
                    onChange={handleYourName}
                    value={userName}
                />
                <TextField 
                    id="standard-basic" 
                    margin="normal"  
                    component="h1" 
                    label="Your email" 
                    variant="standard" 
                    onChange={handleYourEmail}
                    value={userEmail}
                />
                <TextField 
                    id="standard-basic" 
                    label="Your message here.." 
                    margin="normal"
                    component="h1"
                    variant="standard" 
                    onChange={handleYourMessage}
                    multiline
                    rows={4}
                    value={userMessage}
                />
                <Button 
                    variant='contained'
                    onClick={handleContactSubmit}
                >
                    Submit
                </Button>
            </Box>
        </Grid>

        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Fade in={open}>
            <Box sx={style}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    Thank You
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    Terima kasih, akan segera saya hubungi :)
                </Typography>
            </Box>
            </Fade>
        </Modal>
    </>
  )
}

export default Contact