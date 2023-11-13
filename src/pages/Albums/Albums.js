import React,{useEffect,useState,useRef,useMemo} from 'react';
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
import { average } from 'color.js';
import './albums.css';




const Albums = () => {
    const album = useLocation();
    const {AllAlbumArtist} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let avatar = "";
    let nombre = "";
    let banner = "";
    let colorBanner = "";

    useEffect(() => {
      dispatch(getAllAlbumsArtist(album.state.data));

}, []);


    const handlerCard =(object,ind) =>{
       navigate("/player",{state:{id_artista:object.id_artista,id_album: object.id_album}});
    }


    if(  AllAlbumArtist.header != null){
      nombre = AllAlbumArtist.header[0].nombre_artista;
      avatar = AllAlbumArtist.header[0].avatar;
      banner  = AllAlbumArtist.header[0].banner;
      colorBanner = AllAlbumArtist.header[0].colorBanner;
    }

 // average('img/Brol.jpg', { format: 'hex' }).then(color =>console.log('COLORES ',color) );
  //console.log('header ',header);

  const GetAlbums = () =>{

    if( AllAlbumArtist.body != null){

    return(
      <>
      {
         AllAlbumArtist.body.map((al,ind)=>{
          return(
      <div className='tarjeta'>
      <Card sx={{ maxWidth: 250 }} >
        <CardActionArea  onClick={(e)=>{handlerCard(al,ind)}}>
          <CardMedia
            component="img"
            height="200"
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
    <Navbar />
    <div
      style={{backgroundColor: colorBanner}}
    className="profileRight">
    <div className="profileRightTop">
    <div

    className="profileCover">
      <img
      id='banner'
       className="profileCoverImg"
       src={banner} alt="" />
      <img
      style={{border: `3px solid #fff`}}
      className="profileUserImg"
      src={avatar} alt="" />
    </div>
          <div className="profileInfo">
                    <h4 className="profileInfoName">{nombre}</h4>
                    <span className="profileInfoDesc">{'ALBUMS'}</span>
            </div>
    </div>
    </div>

    <div style={{background: `linear-gradient(${colorBanner},black)`}} className='lienzoAlbum'>

      <div className='centrar' >
  { <GetAlbums /> }
   </div>
   </div>
   </div>
  )
}

export default Albums;
