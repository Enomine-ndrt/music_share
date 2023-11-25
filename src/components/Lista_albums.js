
import React,{useEffect} from 'react';

import {useLocation} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {getAllAlbumsArtist} from "../redux/actions";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {getSingleAlbumFromArtist} from "../redux/actions";
//import { average } from 'color.js';
//import '../pages/Albums/albums.css';

const Lista_albums = ({
  colorAlbum
}) => {
    const album = useLocation();
    const {AllAlbumArtist} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
   // const navigate = useNavigate();



    useEffect(() => {
      dispatch(getAllAlbumsArtist(album.state.id_artista));
}, []);


    const handlerCard =(object,ind) =>{
      dispatch(getSingleAlbumFromArtist(object.id_artista,object.id_album));

    }


  //average(banner, { format: 'hex' }).then(color =>console.log('COLORES ',color) );

  const GetAlbums = () =>{

    if( AllAlbumArtist.body != null){

    return(
      <>
      {
         AllAlbumArtist.body.map((al,ind)=>{
          return(
      <div className='tarjeta1'>
      <Card sx={{ maxWidth: 250 }} >
        <CardActionArea  onClick={(e)=>{handlerCard(al,ind)}}>
          <CardMedia
            component="img"
            height="100"

            image={al.imagen_album}
            alt="album"
          />
          <CardContent>
            <Typography gutterBottom variant="h7" component="div">
            <div className='nombre'>
              {al.nombre_album}
              </div>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </div>
          )

    })
      }
    </>
    );
    }else{
      return(<h1>No albums</h1>)
    }

  };


  return (
    <div className='album' >



    <div style={{background: `linear-gradient(${colorAlbum},black)`}} className='lienzoAlbum1'>

      <div className='centrar' >
  { <GetAlbums /> }
   </div>
   </div>
   </div>
  )
}

export default  Lista_albums;
