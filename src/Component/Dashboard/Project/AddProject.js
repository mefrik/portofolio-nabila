import { Button, Grid, LinearProgress, linearProgressClasses, Stack, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { Component } from 'react';
import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import UploadThumbnail from '../../Upload/UploadThumbnail';
import { setDoc, doc, updateDoc} from 'firebase/firestore';
import { db, storage } from '../../../firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import UploadImageFirst from '../../Upload/UploadImageFirst';
import UploadImageSecond from '../../Upload/UploadImageSecond';
import { getStorage , deleteObject } from "firebase/storage";
import { styled } from '@material-ui/styles';


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#EEEEEE',
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: 'blue',
    },
  }));


class AddProject extends Component {
    constructor (props) {
        super(props);
        this.state = {
            listProject:[],
            imageFileThumbnail: "",
            imageFileImageFirst: "",
            imageFileImageSecond: "",
            progressThumbnail: 0,
            progressImageFirst: 0,
            progressImageSecond: 0,
            DataProject:{
                title: '',
                description:'',
                company:'',
                category:'',
                startDate:null,
                endDate:null,
                urlThumbnail:'',
                urlImageFirst:'',
                urlImageSecond:'',
            },
            year: null,
            month: null,
            isEdit: false,
            hasImageThumbnail: false,
            hasImageFirst: false,
            hasImageSecond: false,
            delImageThumbnail: false,
            delImageFirst: false,
            delImageSecond: false,
            loading: false,
            cek: getStorage(),
        }
    }


    //FORM =========================
    handleFormChangeTitle = (event) => {
        let tempData = this.state.DataProject
        tempData['title'] = event.target.value
        this.setState({
            DataProject: tempData
        })
    }
    handleFormChangeCompany = (event) => {
        let tempData = this.state.DataProject
        tempData['company'] = event.target.value
        this.setState({
            DataProject: tempData
        })
    }
    handleFormChangeDescription = (event) => {
        let tempData = this.state.DataProject
        tempData['description'] = event.target.value
        this.setState({
            DataProject: tempData
        })
    }
    handleFormChangeCategory = (event) => {
        let tempData = this.state.DataProject
        tempData['category'] = event.target.value
        this.setState({
            DataProject: tempData
        })
    }
    handleFormChangeStartDate = (event) => {
        let tempData = this.state.DataProject
        tempData['startDate'] = event
        this.setState({
            DataProject: tempData
        })
    }
    handleFormChangeEndDate = (event) => {
        let tempData = this.state.DataProject
        tempData['endDate'] = event
        this.setState({
            DataProject: tempData
        })
    }


    //GET IMAGE =======================
    handleGetImageThumbnail = (file) =>{
        console.log(file === 'Delete')
        if(file.length === 0) {
            console.error(`not an image, the image file is a ${typeof(file)}`)
            this.setState({
                hasImageThumbnail: false,
                imageFileThumbnail: "",
            })
        } else if(file === "Delete") {   
            let tempData = this.state.DataProject
            tempData['urlThumbnail'] = ''
            this.setState({
                delImageThumbnail: true,
                DataProject: tempData,
            })
        } else {
            this.setState({
                delImageThumbnail: false,
                hasImageThumbnail: true,
                imageFileThumbnail: file,
            })
        }
    }
    handleGetImageFirst = (file) =>{
        console.log(file === 'Delete')
        if(file.length === 0) {
            console.error(`not an image, the image file is a ${typeof(file)}`)
            this.setState({
                hasImageFirst: false,
                imageFileImageFirst: "",
            })
        } else if(file === "Delete") {   
            let tempData = this.state.DataProject
            tempData['urlImageFirst'] = ''
            this.setState({
                delImageFirst: true,
                DataProject: tempData,
            })
        } else {
            this.setState({
                delImageFirst: false,
                hasImageFirst: true,
                imageFileImageFirst: file,
            })
        }
    }
    handleGetImageSecond = (file) =>{
        console.log(file === 'Delete')
        if(file.length === 0) {
            console.error(`not an image, the image file is a ${typeof(file)}`)
            this.setState({
                hasImageSecond: false,
                imageFileImageSecond: "",
            })
        } else if(file === "Delete") {   
            let tempData = this.state.DataProject
            tempData['urlImageSecond'] = ''
            this.setState({
                delImageSecond: true,
                DataProject: tempData,
            })
        } else {
            this.setState({
                delImageSecond: false,
                hasImageSecond: true,
                imageFileImageSecond: file,
            })
        }
    }

    

    //UPLOAD IMAGE =================
    handleUploadThumbnail = (id) =>{
        return new Promise(resolve => {
            const storageRef = ref(storage,`/MyProject/${this.state.DataProject.title}/Thumbnail.jpeg`);
            if(this.state.hasImageThumbnail){
                const uploadTask = uploadBytesResumable(storageRef, this.state.imageFileThumbnail);

                uploadTask.on('state_changed', (snapshot) =>{
                    const prog = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        this.setState({
                            progressThumbnail: prog
                        })
                    },
                    (err) => console.log(err),
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            let tempData = this.state.DataProject
                            tempData['urlThumbnail'] = url
                            this.setState({
                                DataProject: tempData,
                                hasImage: true
                            })
                            resolve("Upload Thumbnail Selesai")
                        })
                    }
                );
            } else {
                resolve("Upload Thumbnail Selesai")
            }
        })
    }
    handleUploadImageFirst = (id) =>{
        return new Promise(resolve => {
            const storageRef = ref(storage,`/MyProject/${this.state.DataProject.title}/ImageFirst.jpeg`);
            if(this.state.hasImageFirst){
                const uploadTask = uploadBytesResumable(storageRef, this.state.imageFileImageFirst);

                uploadTask.on('state_changed', (snapshot) =>{
                    const prog = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        this.setState({
                            progressImageFirst: prog
                        })
                    },
                    (err) => console.log(err),
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            let tempData = this.state.DataProject
                            tempData['urlImageFirst'] = url
                            this.setState({
                                DataProject: tempData,
                                hasImage: true
                            })
                            resolve("Upload Image 1 Selesai")
                        })
                    }
                );
            } else { 
                resolve("Upload Image First Selesai")
            }
        })
    }
    handleUploadImageSecond = (id) =>{
        return new Promise(resolve => {
            const storageRef = ref(storage,`/MyProject/${this.state.DataProject.title}/ImageSecond.jpeg`);
            if(this.state.hasImageSecond){
                const uploadTask = uploadBytesResumable(storageRef, this.state.imageFileImageSecond);

                uploadTask.on('state_changed', (snapshot) =>{
                    const prog = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        this.setState({
                            progressImageSecond: prog
                        })
                    },
                    (err) => console.log(err),
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            let tempData = this.state.DataProject
                            tempData['urlImageSecond'] = url
                            this.setState({
                                DataProject: tempData,
                                hasImage: true
                            })
                            resolve("Upload Image 2 Selesai")
                        })
                    }
                );
            } else {
                resolve("Upload Image Second Selesai")
            }
        })
    }


    //DELETE IMAGE
    handleDelImageThumbnail = () => {
        if(this.state.delImageThumbnail){
            const storageRef = ref(storage,`/MyProject/${this.state.DataProject.title}/Thumbnail.jpeg`);
            // Create a reference to the file to delete
            const desertRef = ref(storage, storageRef);
    
            // Delete the file
            deleteObject(desertRef).then(() => {
            // File deleted successfully
            }).catch((error) => {
            // Uh-oh, an error occurred!
            });
            console.log("berhasil di hapus")
        }
    }
    handleDelImageFirst = () => {
        if(this.state.delImageFirst){
            const storageRef = ref(storage,`/MyProject/${this.state.DataProject.title}/ImageFirst.jpeg`);
            // Create a reference to the file to delete
            const desertRef = ref(storage, storageRef);
    
            // Delete the file
            deleteObject(desertRef).then(() => {
            // File deleted successfully
            }).catch((error) => {
            // Uh-oh, an error occurred!
            });
            console.log("berhasil di hapus")
        }
    }
    handleDelImageSecond = () => {
        if(this.state.delImageSecond){
            const storageRef = ref(storage,`/MyProject/${this.state.DataProject.title}/ImageSecond.jpeg`);
            // Create a reference to the file to delete
            const desertRef = ref(storage, storageRef);
    
            // Delete the file
            deleteObject(desertRef).then(() => {
            // File deleted successfully
            }).catch((error) => {
            // Uh-oh, an error occurred!
            });
            console.log("berhasil di hapus")
        }
    }

    //PUBLISH ======================
    handlePublishProject = async (event) =>{
        this.setState({
            loading: true,
        })
        
        await this.handleUploadThumbnail(event.target.id)
        await this.handleUploadImageFirst(event.target.id)
        await this.handleUploadImageSecond(event.target.id)
        await setDoc(doc(db, "project", this.state.DataProject.title), this.state.DataProject);

        this.props.handleClose()
    }
    handleSaveProject = async (event) =>{
        await this.handleUploadThumbnail()
        await this.handleUploadImageFirst()
        await this.handleUploadImageSecond()

        await this.handleDelImageThumbnail()
        await this.handleDelImageFirst()
        await this.handleDelImageSecond()
        let addProjectDoc = doc(db, "project", this.state.DataProject.id)
        let newProjectDoc = this.state.DataProject
        await updateDoc(addProjectDoc, newProjectDoc)
        this.props.handleClose()
    }

    componentDidMount (){
        // console.log("OKE EDIT", !!this.props.editProject)
        if(!!this.props.editProject){
            this.setState({
                DataProject: this.props.editProject,
                isEdit: true,
            })
        }
    }

    render(){
        return (
            <>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid item xs={12} container spacing={2} height="auto">
                        <Grid item xs={8} container spacing={2} height="100%">
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Title"
                                    multiline
                                    maxRows={1}
                                    style={{width:"100%"}}
                                    value={this.state.DataProject.title}
                                    onChange={this.handleFormChangeTitle}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Description"
                                    multiline
                                    rows={6}
                                    fullWidth
                                    value={this.state.DataProject.description}
                                    onChange={this.handleFormChangeDescription}
                                />
                            </Grid>
                            <Grid item xs={12} container spacing={2}>
                                <Grid item xs={4}>
                                    <UploadThumbnail 
                                                id={this.state.DataProject.title}
                                                handleGetImageThumbnail={this.handleGetImageThumbnail}
                                                url={!!this.props.editProject? this.props.editProject.urlThumbnail : ''}
                                                loading={this.state.loading}
                                                // set={this.handleSetImageThumbnail}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <UploadImageFirst 
                                                id={this.state.DataProject.title}
                                                handleGetImageFirst={this.handleGetImageFirst}
                                                url={!!this.props.editProject? this.props.editProject.urlImageFirst : ''}
                                                loading={this.state.loading}
                                                // set={this.handleSetImageFirst}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <UploadImageSecond 
                                                id={this.state.DataProject.title}
                                                handleGetImageSecond={this.handleGetImageSecond}
                                                url={!!this.props.editProject? this.props.editProject.urlImageSecond : ''}
                                                loading={this.state.loading}
                                                // set={this.handleSetImageSecond}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4} container spacing={2} height="100%">
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Company"
                                    multiline
                                    maxRows={1}
                                    style={{width:"100%"}}
                                    value={this.state.DataProject.company}
                                    onChange={this.handleFormChangeCompany}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <fieldset style={{borderRadius: "6px", border:"2px solid #DFDFDE", margin: 0}}>
                                    <legend >Date</legend>
                                    <Stack spacing={2}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                views={['year', 'month']}
                                                label="From"
                                                minDate={new Date('2019-01-01')}
                                                maxDate={new Date('2030-12-31')}
                                                value={this.state.DataProject.startDate}
                                                onChange={this.handleFormChangeStartDate}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                            <DatePicker
                                                views={['year', 'month']}
                                                label="To"
                                                minDate={new Date('2019-01-01')}
                                                maxDate={new Date('2030-12-31')}
                                                value={this.state.DataProject.endDate}
                                                onChange={this.handleFormChangeEndDate}
                                                renderInput={(params) => <TextField {...params} helperText={null} />}
                                            />
                                        </LocalizationProvider>
                                    </Stack>
                                </fieldset>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ width: "auto" }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.DataProject.category}
                                        label="Category"
                                        onChange={this.handleFormChangeCategory}
                                        >
                                            <MenuItem value="Contract">Contract</MenuItem>
                                            <MenuItem value="Freelance">Freelance</MenuItem>
                                            <MenuItem value="Training">Training</MenuItem>
                                            <MenuItem value="Workshop">Workshop</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid 
                                item
                                xs={12}
                                width="100%"
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                {this.state.isEdit ?
                                    <Button 
                                        variant="contained"
                                        color="primary"
                                        style={{ width: "100%", minWidth:"50%", height:"auto", borderRadius: 0}}
                                        onClick={this.handleSaveProject}
                                    >
                                        Save
                                    </Button>
                                    :
                                    <Button 
                                        variant="contained"
                                        color="primary"
                                        style={{ width: "100%", minWidth:"50%", height:"auto", borderRadius: 0}}
                                        onClick={this.handlePublishProject}
                                        disabled={this.state.loading}
                                    >
                                        Publish
                                    </Button>
                                }                                
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box sx={{ flexGrow: 1 }}>
                            <BorderLinearProgress 
                                sx={{marginTop: '20px'}}
                                variant="determinate" 
                                value={
                                    (this.state.progressThumbnail + 
                                    this.state.progressImageFirst + 
                                    this.state.progressImageSecond)} 
                            />
                    </Box>
                </Box>
            </>
        )
    }
}

export default AddProject