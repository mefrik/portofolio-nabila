import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { signin } from '../firebase/authentication';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState('success')
    const navigate = useNavigate();
    let loginEmail = "nabilaramadani@design.com";
    const[loginPassword,setLoginPassword] = useState("");

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    const handleLogin = async () => {
        try{
            await signin(loginEmail, loginPassword)
            setCode('success');
            setOpen(true);
            navigate('/dashboard/intro')
        } catch(error){
            setCode('error');
            setOpen(true);
        }
    }
    
    return (
        <>
            <div className='login-container'>
                {/* <p className='login-welcome'>Hi.. I'm Lina, do you need help?</p> */}
                <div className='login-box'>
                    <div className='login-border'>
                        <Link to='/'>
                            <i className="fas fa-arrow-left fa-2x"></i>
                        </Link >
                        <p className='login-title'>Login</p>
                    </div>
                    <div className='login-input'>
                        <input 
                            className='login-input-key' 
                            placeholder='secret key..'
                            text='password'
                            onChange={(event) => {
                                setLoginPassword(event.target.value)
                            }}
                        />
                        <i className="fas fa-eye-slash"></i>
                    </div>
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <button className='login-btn' onClick={handleLogin}><span>Go</span></button>
                        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity={code} sx={{ width: '100%' }}>
                             Secret key incorrect ...
                            </Alert>
                        </Snackbar>
                    </Stack>
                </div>
            </div>
        </>
    )
}

export default Login
