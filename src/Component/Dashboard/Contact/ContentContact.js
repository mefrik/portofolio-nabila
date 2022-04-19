import React, {useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';

//Table
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableFooter, TablePagination } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';



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
  // '&:nth-of-type(odd)': {
  //     backgroundColor: theme.palette.action.hover,
  // },
  // hide last border
  '&:last-child td, &:last-child th': {
      border: 0,
  },
}));

const columns = [
  {
      id: 1,
      title: 'No.',
      align: 'center',
      width: '1rem',
  },
  {
      id: 2,
      title: 'Name',
      align: 'left',
      width: '20rem',
  },
  {
      id: 3,
      title: 'Email',
      align: 'left',
      width: '20rem',
  },
  {
      id: 4,
      title: 'Message',
      align: 'left',
      width: '100rem',
  },
];


const ContentContact = () => {
  const [dataContact, setDataContact] = useState([]);

  const handleGetData = async () => {
    let data = await getDocs(collection(db, "contact"))
    setDataContact(data.docs.map((doc) => ({
      ...doc.data(), id: doc.id
    })))
  }

  useEffect(() => {
    handleGetData()
  }, [])
  

  return (
      <>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700}} aria-label="customized table">
                  <TableHead>
                  <TableRow>
                      {columns.map(col => (
                          <StyledTableCell
                              id={col.id}
                              align={col.align}
                              width={col.width}
                          >
                              {col.title}
                          </StyledTableCell>
                      ))}
                  </TableRow>
                  </TableHead>
                  <TableBody>
                      {dataContact.map((row, index)  => 
                          <StyledTableRow key={row.id}>
                              <StyledTableCell component="th" scope="row" align='center'>
                                  {index + 1}
                              </StyledTableCell>
                              <StyledTableCell align="left">{row.userName}</StyledTableCell>
                              <StyledTableCell align="left">{row.userEmail}</StyledTableCell>
                              <StyledTableCell align="left">{row.userMessage}</StyledTableCell>
                          </StyledTableRow>
                      )}
                  </TableBody>
                  <TableFooter>
                      <TablePagination rowsPerPageOptions={[10, 50]} />
                  </TableFooter>
              </Table>
          </TableContainer>
      </Grid>
    </>
  )
}

export default ContentContact