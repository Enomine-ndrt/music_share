
import React,{useState} from 'react';
import {IoCaretForwardCircle}  from 'react-icons/io5';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const Lista = ({lista,currentTack, setTrackIndex}) => {

var actual = '';

    if(currentTack != null){
        const object = JSON.parse(currentTack);
          actual = object.nombre_cancion;
      }

      const Handle = (e,i) => {
        console.log('message ',i);
        setTrackIndex(i-1);
      }

  return (
    <div className='table'>
    <TableContainer  component={Paper}>
    <Table  sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <StyledTableCell>#</StyledTableCell>
          <StyledTableCell align="left">Track</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {lista.map((row) => {
           const object = JSON.parse(row)
            return(
              actual == object.nombre_cancion ?(
          <TableRow  sx={{backgroundColor: '#BFC9CA' }} >
            <TableCell sx={{color:'#fff'}} component="th" scope="row">
              {object.numero_track}
            </TableCell>
            <TableCell sx={{color:'#fff'}} align="left">{object.nombre_cancion}</TableCell>
          </TableRow>
              ):(
                <TableRow
                className='ROWS'
                onClick={(e)=>{Handle(e,object.numero_track)}}
                sx={{backgroundColor: '#839192 ', cursor: 'pointer'}}
                >
                <TableCell sx={{color:'#fff'}}  component="th" scope="row">
                  {object.numero_track}
                </TableCell>
                <TableCell sx={{color:'#fff'}}  align="left">{object.nombre_cancion}</TableCell>
              </TableRow>
              )
            )
          })
        }
      </TableBody>
    </Table>
  </TableContainer>
  </div>
  )
}

export default Lista;
