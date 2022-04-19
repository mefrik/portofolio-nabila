import { Button, Grid, Paper, Typography } from '@mui/material';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { Component } from 'react'
import { db, storage } from '../../../firebase/firebase';
import UploadImage from '../../Upload/UploadImage';
import './ContentAboutMe.css'


class ContentAboutMe extends Component{
    constructor (props) {
        super(props);
        this.state = {
            progress: 0,
            aboutMeData:{
                name: "",
                state: "",
                email: "",
                emailC: false,
                facebook: "",
                facebookC: false,
                instagram: "",
                instagramC: false,
                youtube: "",
                youtubeC: false,
                pinterest: "",
                pinterestC: false,
                descaboutme: "",
                url:""
            },
            aboutMeImg: "",
            urlProfileImage: "",
            dataAboutme: collection(db, "aboutme")
        }
    }

    handleGetData = async () =>{
        const getDataAboutMe = await getDocs(this.state.dataAboutme);
        getDataAboutMe.docs.forEach((doc) => {
            this.setState({
                aboutMeData: doc.data()
            })
        })
    }

    //PROFILE_IMAGE
    handleGetImage = (file) =>{
        console.log("Here",file)
        if(file === '' || file === 'photo-aboutme') {
            console.error(`not an image, the image file is a ${typeof(file)}`)
            this.setState({
                aboutMeImg: ""
            })
            this.handleRemove(file);
        } else if(!!file){
            this.setState({
                aboutMeImg: file
            })
        }
    }
    handleUpload = (id) =>{
        return new Promise(resolve => {
            const storageRef = ref(storage,`/AboutMe/${id}`);
            const uploadTask = uploadBytesResumable(storageRef, this.state.aboutMeImg);

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
                        let tempData = this.state.aboutMeData;
                        tempData['url'] = url;
                        this.setState({
                            aboutMeImg: tempData
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
        let tempLocation = doc(db, "aboutme", "aboutmeimg")
        let newDesc = this.state.aboutMeData
        await updateDoc(tempLocation, newDesc)
        this.handleGetData();
    }
    handleRemove = async (event) =>{
        let descPushImage = doc(db, "aboutme", "aboutmeimg")
        let newUrl = {url: ""}
        await updateDoc(descPushImage, newUrl)
    }


    //Form Change
    handleFormChangeName = (event) => {
        let tempData = this.state.aboutMeData;
        tempData["name"] = event.target.value;
        this.setState({
            aboutMeData: tempData
        })
        console.log(this.state.aboutMeData)
    }
    handleFormChangeState = (event) => {
        let tempData = this.state.aboutMeData;
        tempData["state"] = event.target.value;
        this.setState({
            aboutMeData: tempData
        })
        console.log(this.state.aboutMeData)
    }
    handleChecklistChange = (event) => {
        if (event.target.id === "email"){
            let tempData = this.state.aboutMeData;
            tempData["emailC"] = !this.state.aboutMeData.emailC;
            this.setState({
                aboutMeData: tempData
            })
        } else if (event.target.id === "facebook"){
            let tempData = this.state.aboutMeData;
            tempData["facebookC"] = !this.state.aboutMeData.facebookC;
            this.setState({
                aboutMeData: tempData
            })
        } else if (event.target.id === "instagram"){
            let tempData = this.state.aboutMeData;
            tempData["instagramC"] = !this.state.aboutMeData.instagramC;
            this.setState({
                aboutMeData: tempData
            })
        } else if (event.target.id === "youtube"){
            let tempData = this.state.aboutMeData;
            tempData["youtubeC"] = !this.state.aboutMeData.youtubeC;
            this.setState({
                aboutMeData: tempData
            })
        } else if (event.target.id === "pinterest"){
            let tempData = this.state.aboutMeData;
            tempData["pinterestC"] = !this.state.aboutMeData.pinterestC;
            this.setState({
                aboutMeData: tempData
            })
        }
        this.handleSave()
    }
    handleFormChangeEmail = (event) => {
        let tempData = this.state.aboutMeData;
        tempData["email"] = event.target.value;
        this.setState({
            aboutMeData: tempData
        })
        console.log(this.state.aboutMeData)
    }
    handleFormChangeFacebook = (event) => {
        let tempData = this.state.aboutMeData;
        tempData["facebook"] = event.target.value;
        this.setState({
            aboutMeData: tempData
        })
        console.log(this.state.aboutMeData)
    }
    handleFormChangeInstagram = (event) => {
        let tempData = this.state.aboutMeData;
        tempData["instagram"] = event.target.value;
        this.setState({
            aboutMeData: tempData
        })
        console.log(this.state.aboutMeData)
    }
    handleFormChangeYoutube = (event) => {
        let tempData = this.state.aboutMeData;
        tempData["youtube"] = event.target.value;
        this.setState({
            aboutMeData: tempData
        })
        console.log(this.state.aboutMeData)
    }
    handleFormChangePinterest = (event) => {
        let tempData = this.state.aboutMeData;
        tempData["pinterest"] = event.target.value;
        this.setState({
            aboutMeData: tempData
        })
        console.log(this.state.aboutMeData)
    }
    handleFormChangeDescAboutMe = (event) => {
        let tempData = this.state.aboutMeData;
        tempData["descaboutme"] = event.target.value;
        this.setState({
            aboutMeData: tempData
        })
        console.log(this.state.aboutMeData)
    }
    
    
    handleSave = async () =>{
        let tempLocation = doc(db, "aboutme", "aboutmeimg")
        let newDesc = this.state.aboutMeData
        await updateDoc(tempLocation, newDesc)
    }


    componentDidMount(){
        this.handleGetData()
    }

    render(){
        return (
            <>
            <Grid item xs={12} container spacing={2}>
                <Grid item xs={12} container sx={{justifyContent:'flex-end'}}>
                    <Button 
                        variant="contained"
                        size="small"
                        className='contentaboutme-field-save-btn'
                        onClick={this.handleSave}
                    >
                        Save
                    </Button>  
                </Grid>
                <Grid item xs={12} container='fixed' id='contentaboutme' spacing={2}>
                    <Grid item xs={4}>
                            <Paper variant="outlined" sx={{display: 'flex', flexDirection: 'column',height:'35vh', justifyContent: 'space-between'}}>
                                <Typography id='contentaboutme-text-legend'>Upload Image</Typography>
                                <UploadImage 
                                    id='photo-aboutme'
                                    handleGetImage={this.handleGetImage}
                                    edit={this.state.aboutMeData}
                                    progress={this.state.progress}
                                />
                                <Button 
                                    variant="contained"
                                    size="small"
                                    className='contentaboutme-btn'
                                    onClick={(event)=> this.handlePushUpload(event)}
                                >
                                    Upload
                                </Button>
                            </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper variant="outlined" sx={{display: 'flex', flexDirection: 'column',height:'35vh', justifyContent: 'space-between'}}>
                            <Typography id='contentaboutme-text-legend'>About Description</Typography>
                            <textarea 
                                className='contentaboutme-textarea'
                                onChange={this.handleFormChangeDescAboutMe}
                                defaultValue={this.state.aboutMeData.descaboutme}
                            ></textarea>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} container='fixed'>
                        <Paper variant="outlined" sx={{display: 'flex', flexDirection: 'row',height:'35vh', width:'100%', justifyContent: 'space-between'}}>
                            <Typography id='contentaboutme-text-legend'>About Profile</Typography>
                            <Grid item xs={4}>
                                    <div className='contentaboutme-field-name'>
                                        <p className='contentaboutname-field-name-text'>Name</p>
                                        <input 
                                            className='contentaboutme-field-name-input'
                                            onChange={this.handleFormChangeName}
                                            value={this.state.aboutMeData.name}
                                        />
                                    </div>
                                    <div className='contentaboutme-field-state'>
                                        <p className='contentaboutname-field-state-text'>state</p>
                                        <input 
                                            className='contentaboutme-field-state-input'
                                            onChange={this.handleFormChangeState}
                                            value={this.state.aboutMeData.state}
                                        />
                                    </div>  
                            </Grid>
                            <Grid item xs={8} className='contentaboutme-field'>
                                <div className='contentaboutme-field-medsos-top'>
                                    <div className='contentaboutme-field-state'>
                                        {!!this.state.aboutMeData.emailC?
                                            <input 
                                                className="contentaboutme-checkbox" 
                                                type="checkbox" 
                                                id="email"
                                                checked
                                                onChange={this.handleChecklistChange}
                                            />
                                            :
                                            <input 
                                                className="contentaboutme-checkbox" 
                                                type="checkbox" 
                                                id="email"
                                                onChange={this.handleChecklistChange}
                                            />
                                        }
                                        
                                        <p className='contentaboutname-field-state-text'>Email</p>
                                        <input 
                                            className='contentboutme-field-state-input'
                                            onChange={this.handleFormChangeEmail}
                                            value={this.state.aboutMeData.email}
                                        />
                                    </div>
                                    <div className='contentaboutme-field-state'>
                                        {!!this.state.aboutMeData.facebookC?
                                            <input 
                                                className="contentaboutme-checkbox" 
                                                type="checkbox" 
                                                id="facebook"
                                                checked
                                                onChange={this.handleChecklistChange}
                                            />
                                            :
                                            <input 
                                                className="contentaboutme-checkbox" 
                                                type="checkbox" 
                                                id="facebook"
                                                onChange={this.handleChecklistChange}
                                            />
                                        }
                                        <p className='contentaboutname-field-state-text'>Facebook</p>
                                        <input 
                                            className='contentboutme-field-state-input'
                                            onChange={this.handleFormChangeFacebook}
                                            value={this.state.aboutMeData.facebook}
                                        />
                                    </div>
                                </div>
                                <div className='contentaboutme-field-medsos-btm'>
                                    <div className='contentaboutme-field-state'>
                                        {!!this.state.aboutMeData.intagramC?
                                            <input 
                                                className="contentaboutme-checkbox" 
                                                type="checkbox" 
                                                id="instagram"
                                                onChange={this.handleChecklistChange}
                                            />
                                            :
                                            <input 
                                                className="contentaboutme-checkbox" 
                                                type="checkbox" 
                                                id="instagram"
                                                checked
                                                onChange={this.handleChecklistChange}
                                            />
                                        }
                                        <p className='contentaboutname-field-state-text'>Instagram</p>
                                        <input 
                                            className='contentboutme-field-state-input'
                                            onChange={this.handleFormChangeInstagram}
                                            value={this.state.aboutMeData.instagram}
                                        />
                                    </div>
                                    <div className='contentaboutme-field-state'>
                                        {!!this.state.aboutMeData.youtubeC?
                                            <input 
                                                className="contentaboutme-checkbox" 
                                                type="checkbox" 
                                                id="youtube"
                                                checked
                                                onChange={this.handleChecklistChange}
                                            />
                                            :
                                            <input 
                                                className="contentaboutme-checkbox" 
                                                type="checkbox" 
                                                id="youtube"
                                                onChange={this.handleChecklistChange}
                                            />
                                        }
                                        <p className='contentaboutname-field-state-text'>Youtube</p>
                                        <input 
                                            className='contentboutme-field-state-input'
                                            onChange={this.handleFormChangeYoutube}
                                            value={this.state.aboutMeData.youtube}
                                        />
                                    </div>
                                    <div className='contentaboutme-field-state'>
                                        {!!this.state.aboutMeData.pinterestC?
                                            <input 
                                                className="contentaboutme-checkbox" 
                                                type="checkbox" 
                                                id="pinterest"
                                                checked
                                                onChange={this.handleChecklistChange}
                                            />
                                            :
                                            <input 
                                                className="contentaboutme-checkbox" 
                                                type="checkbox" 
                                                id="pinterest"
                                                onChange={this.handleChecklistChange}
                                            />
                                        }
                                        <p className='contentaboutname-field-state-text'>Pinterest</p>
                                        <input 
                                            className='contentboutme-field-state-input'
                                            onChange={this.handleFormChangePinterest}
                                            value={this.state.aboutMeData.pinterest}
                                        />
                                    </div>
                                </div>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            </>
        )
    }
    
}

export default ContentAboutMe
