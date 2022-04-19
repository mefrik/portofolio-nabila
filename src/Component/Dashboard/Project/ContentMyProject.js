import { Component } from 'react';
import * as React from 'react';
import './ContentMyProject.css';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../../firebase/firebase';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddProject from './AddProject';

//Table
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, TableFooter, TablePagination } from '@mui/material';
import { deleteObject, ref } from 'firebase/storage';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: 'auto',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    borderRadius: '4px',
    boxShadow: 24,
    p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#1976D2',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    // '&:last-child td, &:last-child th': {
    //     border: 0,
    // },
}));

const columns = [
    {
        id: 1,
        title: 'No.',
        align: 'center',
    },
    {
        id: 2,
        title: 'Title',
        align: 'left',
    },
    {
        id: 3,
        title: 'Company',
        align: 'left',
    },
    {
        id: 4,
        title: 'Category',
        align: 'left',
    },
    {
        id: 5,
        title: 'From',
        align: 'left',
    },
    {
        id: 6,
        title: 'Until',
        align: 'left',
    },
    {
        id: 7,
        title: 'Action',
        align: 'center',
    },
];
  


class ContentMyProject extends Component {
    constructor (props) {
        super(props);
        this.state = {
            listProject:[],
            editProject:null,
            listProjectCollectionRef: collection(db, "project"),
            open: false,
        }
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
    };
    handleClose = () => {
        this.setState({
            open: false,
            editProject: null,
        })
        this.handleGetData()
    }

    handleGetData = async () =>{
        const getDataListProject = await getDocs(this.state.listProjectCollectionRef);
        this.setState({
            listProject: getDataListProject.docs.map((doc) => ({    
            ...doc.data(), id: doc.id}))
        })
    }


    //Table Action
    handleEditProject = (event) => {
        this.setState({
            editProject: this.state.listProject[event.target.id]
        })
        this.handleOpen()
    }
    handleRemoveProject = (event) => {
        //Delete Database
        let projectID = doc(db, "project", this.state.listProject[event.target.id].id)
        deleteDoc(projectID)
        this.handleGetData()

        //Delete Image
        // Delete the file
        deleteObject(ref(storage, `/MyProject/${this.state.listProject[event.target.id].title}/Thumbnail.jpeg`))
        deleteObject(ref(storage, `/MyProject/${this.state.listProject[event.target.id].title}/ImageFirst.jpeg`))
        deleteObject(ref(storage, `/MyProject/${this.state.listProject[event.target.id].title}/ImageSecond.jpeg`))

    }

    componentDidMount (){
        this.handleGetData()
    }

    render(){
        return (
            <>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid 
                            item xs={12} 
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            <Button 
                                variant="contained"
                                color="primary"
                                onClick={this.handleOpen}
                            >
                                <i id='addProject' className="iconaddproject fas fa-plus"/>
                                Project
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700}} aria-label="customized table">
                                    <TableHead>
                                    <TableRow>
                                        {columns.map(col => (
                                            <StyledTableCell
                                                id={col.id}
                                                align={col.align}
                                            >
                                                {col.title}
                                            </StyledTableCell>
                                        ))}
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.listProject.map((row, index)  => 
                                            <StyledTableRow key={row.id}>
                                                <StyledTableCell component="th" scope="row" align='center'>
                                                    {index + 1}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">{row.title}</StyledTableCell>
                                                <StyledTableCell align="left">{row.company}</StyledTableCell>
                                                <StyledTableCell align="left">{row.category}</StyledTableCell>
                                                <StyledTableCell align="left">tanggal error</StyledTableCell>
                                                <StyledTableCell align="left">tanggal error</StyledTableCell>
                                                <StyledTableCell align="center" width="100px">
                                                    <Stack spacing={2} direction="row" justifyContent="center">
                                                        <Button 
                                                            id={index}
                                                            onClick={this.handleEditProject}
                                                            variant="outlined"
                                                            size="small" 
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button 
                                                            id={index}
                                                            onClick={this.handleRemoveProject}
                                                            variant="contained" 
                                                            color="error"
                                                            size="small"
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Stack>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        )}
                                    </TableBody>
                                    <TableFooter>
                                        <TablePagination rowsPerPageOptions={[10, 50]} />
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Box>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.open}>
                        <Box sx={style}>
                            <AddProject 
                                open={this.state.open}
                                editProject={this.state.editProject}
                                handleClose={this.handleClose}
                            />
                        </Box>
                    </Fade>
                </Modal>
            </>
        )
    }
}

export default ContentMyProject
