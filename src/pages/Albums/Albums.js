import React,{useEffect,useState} from 'react';
import Navbar from '../../components/navbar/Navbar';
import {useLocation} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {getAllAlbumsArtist} from "../../redux/actions";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './albums.css';

const Albums = () => {
    const album = useLocation();
    const {AllAlbumArtist} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
           dispatch(getAllAlbumsArtist(album.state.data));
    }, [])

    const handlerCard =(object,ind) =>{
        console.log('id_artista ',object.id_artista);
        console.log('id_album ',object.id_album);

       navigate("/player",{state:{id_artista:object.id_artista,id_album: object.id_album}});
    }


  return (
    <div className='album' >
    <Navbar />
    <div className='lienzoAlbum'>
   {
     AllAlbumArtist.map((element,ind)=>{

       var object = JSON.parse(element);

       return(
   <div className='tarjeta'>
   <Card sx={{ maxWidth: 350 }} >
     <CardActionArea onClick={(e)=>{handlerCard(object,ind)}}>
       <CardMedia
         component="img"
         height="200"
         image={object.imagen_album}
         alt="album"
       />
       <CardContent>
         <Typography gutterBottom variant="h7" component="div">
         <div className='nombre'>
           {object.nombre_album}
           </div>
         </Typography>
       </CardContent>
     </CardActionArea>
   </Card>
   </div>
       )
     })
   }
   </div>
   </div>
  )
}

export default Albums;
