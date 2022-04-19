import React, { Component } from 'react';
import './ContentIntro.css';
import CardContentIntro from './CardContentIntro';
import { db, storage } from '../../../firebase/firebase';
import { collection, getDocs, setDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import UploadImage from '../../Upload/UploadImage';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { styled } from '@mui/styles';
import { Button, Grid, Paper, Typography } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'red',
    // padding: theme.spacing(1),
    textAlign: 'center',
    color: 'black',
  }));

class ContentIntro extends Component{
    constructor (props) {
        super(props);
        this.state = {
            imageFile: "",
            progress: 0,
            dataExpertise: [],
            dataDescIntro: "",
            details: "",
            dataProfileImage:"",
            urlProfileImage:"",
            urlBackgroundImage:"",
            newExpertise:{
                title: '',
            },
            expertiseCollectionRef: collection(db, "expertise"),
            descIntroCollectionRef: collection(db, "descintro")
        }
    }


    handleResetForm = () => {
        this.setState({
            newExpertise:""
        })
    }
    handleGetData = async () =>{
        const getDataExpertise = await getDocs(this.state.expertiseCollectionRef);
        const getDataDescIntro = await getDocs(this.state.descIntroCollectionRef);
        
        this.setState({
            dataExpertise: getDataExpertise.docs.map((doc) => ({ 
            ...doc.data(), id: doc.id
            })),
            dataDescIntro: getDataDescIntro.docs.map((doc) => ({ 
            ...doc.data(), id: doc.id
            }))
        })
        
        this.setState({
            details: this.state.dataDescIntro[1].description,
            urlProfileImage: this.state.dataDescIntro[2],
            urlBackgroundImage: this.state.dataDescIntro[0]
        })
    }
    

    //EXPERTISE
    handleFormChangeExpertise = (event) => {
        let tempData = this.state.newExpertise;
        tempData["title"] = event.target.value;
        this.setState({
            newExpertise: tempData
        })
    }
    handleAddExpertise = async () =>{
        await setDoc(doc(db, "expertise", this.state.newExpertise.title), this.state.newExpertise );
        this.handleResetForm();
        this.handleGetData();
    }
    handleDeleteExpertise = async (id) =>{
        let expertiseId = doc(db, "expertise", id)
        await deleteDoc(expertiseId)
        this.handleGetData();
    }


    //DESCRIPTION INTRO
    handleFormChangeDescIntro = (event) =>{
        this.setState({
            details: event.target.value
        })
    }
    handleSaveDescIntro = async () =>{
        let descIntroDoc = doc(db, "descintro", "details")
        let newDesc = {description: this.state.details}
        await updateDoc(descIntroDoc, newDesc)
    }


    //PROFILE_IMAGE
    handleGetImage = (file) =>{
        console.log(file)
        if(file === '' || file === 'photo-intro' || file === 'background-intro' ) {
            console.error(`not an image, the image file is a ${typeof(file)}`)
            if(file === 'photo-intro'){
                this.setState({
                    urlProfileImage: ""
                })
            } else if(file === 'background-intro'){
                this.setState({
                    urlBackgroundImage: ""
                })
            }
            this.handleRemove(file);
        } else if(!!file){
            this.setState({
                dataProfileImage: file
            })
        }
    }
    handleUpload = (id) =>{
        return new Promise(resolve => {
            const storageRef = ref(storage,`/Intro/${id}`);
            const uploadTask = uploadBytesResumable(storageRef, this.state.dataProfileImage);

            uploadTask.on('state_changed', (snapshot) =>{
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    this.setState({
                        progress: prog
                    })
                },
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        this.setState({
                            dataProfileImage:{
                                url: url
                            }
                        })
                        resolve("Upload Selesai")
                    })
                }
            );
        })
    }


    //Push | Upload
    handlePushUpload = async (event) =>{
        await this.handleUpload(event.target.id)
        let descPushImage = doc(db, "descintro", event.target.id)
        let newUrl = {url: this.state.dataProfileImage.url}
        await updateDoc(descPushImage, newUrl)
        this.handleGetData();
    }
    handleRemove = async (event) =>{
        console.log(event)
        let descPushImage = doc(db, "descintro", event)
        let newUrl = {url: ""}
        await updateDoc(descPushImage, newUrl)
    }
    componentDidMount(){
        this.handleGetData()
    }

    render(){
        return (
            <> 
                <Grid 
                    item xs={12} 
                    container='fixed' 
                    id='contentintro' 
                    // className='contentintro-container'
                    spacing={2}
                >
                    <Grid 
                        item xs={6}
                        height='auto'
                    >
                        <Paper  variant="outlined" square sx={{display: 'flex', flexDirection: 'column',height:'40vh'}}>
                            <Typography id='contentintro-text-legend' className='contentintro-legend'>Photo Intro</Typography>
                            <UploadImage 
                                id='photo-intro'
                                handleGetImage={this.handleGetImage}
                                edit={this.state.urlProfileImage}
                                progress={this.state.progress}
                            />
                            <Button 
                                className='contentintro-btn'
                                variant="contained"
                                size="small"
                                onClick={(event) => this.handlePushUpload(event)}
                            >
                                Upload
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid 
                        item xs={6}
                        height='auto'
                    >
                        <Paper  variant="outlined" square sx={{display: 'flex', flexDirection: 'column',height:'40vh'}}>
                            <Typography id='contentintro-text-legend' className='contentintro-legend'>Image Background</Typography>
                            <UploadImage 
                                id='background-intro'
                                handleGetImage={this.handleGetImage}
                                edit={this.state.urlBackgroundImage}
                                progress={this.state.progress}
                            />
                            <Button 
                                className='contentintro-btn'
                                variant="contained"
                                size="small"
                                onClick={(event) => this.handlePushUpload(event)}
                            >
                                Upload
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid 
                        item xs={4}
                        height='auto'
                    >
                        <Paper  variant="outlined" sx={{display: 'flex', flexDirection: 'column',height:'40vh', justifyContent: 'space-between'}}>
                            <Typography id='contentintro-text-legend' className='contentintro-legend'>Expertise</Typography>
                            <div className='contentintro-list-expertise'>
                                {
                                    this.state.dataExpertise.map(dataExpertise => {
                                        return <CardContentIntro key={dataExpertise.id} data={dataExpertise} remove={this.handleDeleteExpertise}/>
                                    })
                                }
                            </div>
                            <div className='contentintro-add-box'>
                                <input 
                                    id='expertise'
                                    className='contentintro-input-expertise' 
                                    value={this.state.newExpertise.title} 
                                    onChange={this.handleFormChangeExpertise} 
                                    placeholder='your expertise'
                                ></input>
                                <Button 
                                    className='contentintro-btn'
                                    variant="contained"
                                    size="small" 
                                    onClick={this.handleAddExpertise}
                                >
                                    Add
                                </Button>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid 
                        item xs={8}
                        height='auto'
                    >
                        <Paper  variant="outlined" square sx={{display: 'flex', flexDirection: 'column',height:'40vh'}}>
                            <Typography id='contentintro-text-legend' className='contentintro-legend'>Description</Typography>
                            <textarea 
                                id='descintro'
                                className='contentintro-textarea' 
                                defaultValue={this.state.details}
                                onChange={this.handleFormChangeDescIntro}
                            ></textarea>
                            <Button 
                                    className='contentintro-btn'
                                    variant="contained"
                                    size="small" 
                                    onClick={this.handleSaveDescIntro}
                            >
                                Save
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default ContentIntro
