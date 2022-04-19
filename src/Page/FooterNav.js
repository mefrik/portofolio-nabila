import { Grid } from '@mui/material';
import React from 'react';
import './FooterNav.css';

const FooterNav = () => {
    return (
        <Grid xs={12} >
            <div className='footernav-container'>
                {/* <h1>Footer Here...</h1> */}
                <div className='footernav-media-social'>
                    {/* <p className='fnav email'>Email</p>
                    <p className='fnav facebook'>Facebook</p>
                    <p className='fnav instagram'>Instagram</p>
                    <p className='fnav youtube'>Youtube</p>
                    <p className='fnav pinterest'>Pinterest</p> */}
                </div>
                <div className='footernav-search'>
                    {/* <p>Search</p> */}
                </div>
                <div className='footernav-copyright '>
                    <i className="far fa-copyright"></i>
                    <p className="footernav-copyright-year">2022</p>
                </div>
            </div>
        </Grid>
    )
}

export default FooterNav
