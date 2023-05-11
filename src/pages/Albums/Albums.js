import React,{useEffect,useState,useRef} from 'react';
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
import { average } from 'color.js'
import './albums.css';




const Albums = () => {
    const album = useLocation();
    const {AllAlbumArtist} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let avatar = "";
    let nombre = "";
    let banner = "";


    const [image, setImage] = useState('');
    const [colors, setColors] = useState();
    const [averageColor, setAverageColor] = useState('#fff');



    useEffect(() => {
           dispatch(getAllAlbumsArtist(album.state.data));
    }, [])

    const handlerCard =(object,ind) =>{


       navigate("/player",{state:{id_artista:object.id_artista,id_album: object.id_album}});
    }


    AllAlbumArtist.map((element,ind)=>{

      var object = JSON.parse(element);

        avatar = object.avatar;
        nombre = object.nombre_artista;
        banner = object.banner;

    });
    console.log('banner ',banner);

   // const ima = banner;
    average(banner).then(color => console.log(color));



  return (
    <div className='album' >
    <Navbar />
    <div className="profileRight">
    <div className="profileRightTop">
    <div className="profileCover">
      <img id='banner' className="profileCoverImg" src={banner} alt="" />
      <img className="profileUserImg" src={avatar} alt="" />
    </div>
          <div className="profileInfo">
                    <h4 className="profileInfoName">{nombre}</h4>
                    <span className="profileInfoDesc">{'ALBUMS'}</span>
            </div>
    </div>
    </div>

    <div className='lienzoAlbum'>

      <div className='centrar' >


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
   </div>
  )
}

export default Albums;
