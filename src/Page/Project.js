import React, { Component } from 'react';
import CardProject from '../Page/Project/CardProject';
import './Project.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Grid from '@mui/material/Grid';
import { Box, Typography } from '@mui/material';


class Project extends Component{
    constructor (props) {
        super(props);
        this.state = {
            DataProject: [],
            listProjectCollectionRef: collection(db, "project"),
            activeStep: 0
        }
    }

    handleGetData = async () =>{
        const getDataListProject = await getDocs(this.state.listProjectCollectionRef);
        this.setState({
            DataProject: getDataListProject.docs.map((doc) => ({ 
            ...doc.data(), id: doc.id}))
        })
    }

    componentDidMount(){
        this.handleGetData()
    }

    render(){
        return (
            <>
                <Grid item xs={12} id='page-myproject'>
                    <Box sx={{ minHeight: '100vh', height:'auto', width: '100%' }}>
                        <Grid xs={12}>
                            <Box 
                                sx={{ height: '10vh'}}
                                justifyContent="center"
                                alignItems='center'
                                display='flex'
                            >
                                <Typography 
                                    variant='h3' 
                                    className='project-text' 
                                    paddingTop='20px'
                                >
                                    My Projects
                                </Typography>
                                {/* <img 
                                    src={BackgroundImageText} 
                                    alt="My Project"
                                    className='project-title-image'
                                /> */}
                            </Box>
                        </Grid>
                        <Grid
                            item xs={12}
                            container
                            columns={{ sm: 4, md: 3 }}
                            justifyContent="center"
                            alignItems="center"
                            display='flex'
                            mt='60px'
                            mb='20px'
                        >
                            {
                                this.state.DataProject.map(DataProject => {
                                    return <CardProject 
                                                id={DataProject.id} 
                                                title={DataProject.title}
                                                company={DataProject.company}
                                                category={DataProject.category}
                                                description={DataProject.description}
                                                number={DataProject.number}
                                                urlThumbnail={DataProject.urlThumbnail}
                                                urlImageFirst={DataProject.urlImageFirst}
                                                urlImageSecond={DataProject.urlImageSecond}
                                                startDate={DataProject.startDate}
                                                endDate={DataProject.endDate}
                                            />
                                })
                            }
                        </Grid>
                    </Box>
                </Grid>
            </>
            
        )
    }
}

export default Project
