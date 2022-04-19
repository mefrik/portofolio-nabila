import React, { Component } from 'react';
import './ContentAddProject.css';
import UploadImage from './UploadImage';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db, storage } from '../firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

class ContentAddProject extends Component{
    constructor (props) {
        super(props);
        this.state = {
            listProject:[],
            projectCollectionRef: collection(db, "project"),
            imageFile: "",
            progress: 0,
            DataProject:{
                id: '',
                number:"",
                title: '',
                description:"",
                company:"",
                url:"",
            },
            isEdit: false,
            hasImage: true
        }
    }

    handleToogle =() =>{
        this.props.setIsMyProjectClicked(true);
        this.props.setIsAddProjectClicked(false);
    }
    


    handleGetImage = (file) =>{
        if(file === '' || file === this.state.DataProject.title) {
            console.error(`not an image, the image file is a ${typeof(file)}`)
            let tempData = this.state.DataProject
            tempData['url'] = ""
            this.setState({
                DataProject: tempData,
                hasImage: false
            })
            this.handleRemove(file);
        } else if(!!file){
            let tempData = this.state.DataProject
            tempData['url'] = file
            this.setState({
                DataProject: tempData,
                hasImage: true
            })
        }
        this.setState({
            imageFile: file
        })
    }
    handleGetData = async () =>{
        const getDataProject = await getDocs(this.state.projectCollectionRef);
        this.setState({
            listProject: getDataProject.docs.map((doc) => ({ 
            ...doc.data(), id: doc.id}))
        })
    }
    handleGetNumber = () =>{
        let tempData = this.state.DataProject
        tempData['number'] = this.state.listProject.length + 1
        this.setState({
            DataProject: tempData
        })
    }



    handleFormChangeTitle = (event) => {
        let tempData = this.state.DataProject
        tempData['title'] = event.target.value
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
    handleFormChangeCompany = (event) => {
        let tempData = this.state.DataProject
        tempData['company'] = event.target.value
        this.setState({
            DataProject: tempData
        })
    }
    handleUpload = (id) =>{
        return new Promise(resolve => {
            const storageRef = ref(storage,`/MyProject/${this.state.DataProject.title}`);
            const uploadTask = uploadBytesResumable(storageRef, this.state.imageFile);

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
                        let tempData = this.state.DataProject
                        tempData['url'] = url
                        this.setState({
                            DataProject: tempData,
                            hasImage: true
                        })
                        resolve("Upload Selesai")
                    })
                }
            );
        })
    }


    handlePublishProject = async (event) =>{
        this.handleGetNumber()
        await this.handleUpload(event.target.id)
        await addDoc(this.state.projectCollectionRef, this.state.DataProject )
        this.handleGetData();
        this.handleToogle();
    }
    handleSaveProject = async (event) =>{
        if(this.state.hasImage){
            await this.handleUpload(event.target.id)
        }
        let addProjectDoc = doc(db, "project", this.props.editProject.id)
        let newProjectDoc = this.state.DataProject
        await updateDoc(addProjectDoc, newProjectDoc)
        this.handleGetData();
        this.handleCancel();
    }
    handleRemove = async () =>{
        let descPushImage = doc(db, "project", this.props.editProject.id)
        let newUrl = {url: ""}
        await updateDoc(descPushImage, newUrl)
    }



    handleCancel = () =>{
        this.setState({
            isEdit: false
        })
        this.props.setEditProject("")
        this.handleToogle();
    }

    componentDidMount(){
        this.handleGetData()
        if(!!this.props.editProject){
            this.setState({
                isEdit: true,
                DataProject: this.props.editProject
            })
        }
    }

    render(){
        return (
            <>
                <div className='contentaddproject-container'>
                    <div className='contentaddproject-subcontainer'>
                        <fieldset className='contentaddproject-container-addproject'>
                            <legend id='contentaddproject-text-legend'>Add Project</legend>
                            <div className='conctentaddproject-left'>
                                <div className='contentaddproject-title'>
                                    <h3 >Title</h3>
                                    <input 
                                        id='inputtitle' 
                                        className='contentaddproject-input-title'
                                        placeholder='Input title here..'
                                        onChange={this.handleFormChangeTitle}
                                        value={this.props.editProject.title}
                                    />
                                </div>
                                <div className='contentaddproject-description'>
                                    <textarea 
                                        id='inputdesc' 
                                        className='contentaddproject-input-desc' 
                                        placeholder='Tell me..'
                                        onChange={this.handleFormChangeDescription}
                                        value={this.props.editProject.description}
                                    />
                                </div>
                            </div>
                            <div className='conctentaddproject-right'>
                                <div className='contentaddproject-publish'>
                                    {this.state.isEdit ? (
                                        <button 
                                            className='contentaddproject-btn-publish'
                                            onClick={this.handleSaveProject}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button 
                                            className='contentaddproject-btn-publish'
                                            onClick={this.handlePublishProject}
                                        >
                                            Publish
                                        </button>
                                    )
                                    }
                                    <button 
                                        className='contentaddproject-btn-publish'
                                        onClick={this.handleCancel}
                                        >
                                            Cancel
                                    </button>
                                </div>
                                <div className='contentaddproject-company'>
                                    <h3>Company</h3>
                                    <input 
                                        id='inputcompany' 
                                        className='contentaddproject-input'
                                        placeholder='The company?'
                                        onChange={this.handleFormChangeCompany}
                                        value={this.props.editProject.company}
                                    />
                                </div>
                                <div className='contentaddproject-thumbnail'>
                                    <h3>Thumbnail</h3>
                                    <UploadImage 
                                        id={this.state.DataProject.title}
                                        handleGetImage={this.handleGetImage}
                                        edit={this.props.editProject}
                                        progress={this.state.progress}
                                    />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </>
        )
    }
}

export default ContentAddProject
