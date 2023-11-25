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


    useEffect(() => {
      dispatch(getAllAlbumsArtist(album.state.data));

}, []);


    const handlerCard =(object,ind) =>{
       navigate("/player",{state:{id_artista:object.id_artista,id_album: object.id_album}});
    }


    const Headers = useMemo(()=> AllAlbumArtist.header?.map(header =>{
        var temp = {};
        temp = [];

        temp['nombre_artista'] = header.nombre_artista;
        temp['avatar'] = header.avatar;
        temp['banner'] = header.banner;
        temp['colorBanner'] = header.colorBanner;
        return (temp);
    }),[AllAlbumArtist.header])


    const Albumss =useMemo(()=> AllAlbumArtist.body?.map(art => {
      var temp = {}
       temp = [];
      temp['id_album'] = art.id_album;
      temp['nombre_album'] = art.nombre_album;
      temp['id_artista'] = art.id_artista;
      temp['imagen_album'] = art.imagen_album;
      return (temp)
    }),[AllAlbumArtist.body]);


 // average('img/Brol.jpg', { format: 'hex' }).then(color =>console.log('COLORES ',color) );
  //console.log('header ',header);

  const GetAlbums = () =>{

    if( AllAlbumArtist.body != null){

    return(
      <>
      {
         Albumss.map((al,ind)=>{
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


  const GetHeader = () =>{
   if (AllAlbumArtist.body != null){
     // colorBanner = Headers[0].colorBanner;
    return(<>
    {<>

          <div
      style={{backgroundColor: Headers[0].colorBanner}}
    className="profileRight">
    <div className="profileRightTop">
    <div

    className="profileCover">
      <img
      id='banner'
       className="profileCoverImg"
       src={Headers[0].banner} alt="" />
      <img
      style={{border: `3px solid #fff`}}
      className="profileUserImg"
      src={Headers[0].avatar} alt="" />
    </div>
          <div className="profileInfo">
                    <h4 className="profileInfoName">{Headers[0].nombre}</h4>
                    <span className="profileInfoDesc">{'ALBUMS'}</span>
            </div>
    </div>
    </div>
    <div style={{background: `linear-gradient(${Headers[0].colorBanner},black)`}} className='lienzoAlbum'>

<div className='centrar' >
 <GetAlbums />
 </div>
 </div>


    </>
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

   <GetHeader />


   </div>

  )
}

export default Albums;
