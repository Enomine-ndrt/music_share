import React,{useEffect,useState} from 'react';
import './artists.css';
import { useSelector,useDispatch } from 'react-redux';
import {getAllArtist,getArtistFromGenere} from "../../redux/actions";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {useLocation} from 'react-router-dom';
import { CardActionArea } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Artist = () => {
    const {Artist,ArtistGeneres} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const artist = useLocation();

    useEffect(()=>{
       // dispatch(getAllArtist());
       dispatch(getArtistFromGenere(artist.state.data));
    },[]);

   const handlerCard = (object,ind) =>{


      navigate("/albums",{state:{data: object.id_artista}});
      //console.log('index ',object.nombre_artista);
   }



  return (
    <div className='artistas' >
     <Navbar />
     <div className='lienzo'>
    {

      ArtistGeneres.map((element,ind)=>{

        var object = JSON.parse(element);

        return(
    <div className='tarjeta'>
    <Card  sx={{ maxWidth: 345 }} >
      <CardActionArea  onClick={(e)=>{handlerCard(object,ind)}}>
        <CardMedia
          component="img"
          height="300"
          image={object.imagen_artista}
          alt="green iguana"
        />
        <CardContent>

          <Typography gutterBottom variant="h5" component="div">
          <div className='nombre'>
            {object.nombre_artista}
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
  );
}

export default Artist;
