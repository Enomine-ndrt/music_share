import React, { useEffect, useMemo } from 'react';
import './artists.css';
import { useSelector, useDispatch } from 'react-redux';
import { getArtistFromGenere } from "../../redux/actions";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import { CardActionArea } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Artist = () => {
  const { ArtistGeneres } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const artist = useLocation();


  useEffect(() => {
    dispatch(getArtistFromGenere(artist.state.data));
  }, []);



  const Artists = useMemo(() => ArtistGeneres.body?.map(art => {
    var temp = {}
    temp = [];
    temp['id_genero'] = art.id_genero;
    temp['id_artista'] = art.id_artista;
    temp['nombre_artista'] = art.nombre_artista;
    temp['imagen_artista'] = art.imagen_artista;
    return (temp)
  }), [ArtistGeneres.body]);


  const handlerCard = (object, ind) => {

    navigate("/albums", { state: { data: object.id_artista } });
  }


  const GetArtists = () => {

    if (ArtistGeneres.body != null) {
      return (<>
        {
          Artists.map((element, ind) => {
            return (
              <div className='tarjeta'>
                <Card sx={{ maxWidth: 345 }} >
                  <CardActionArea onClick={(e) => { handlerCard(element, ind) }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={element.imagen_artista}
                      alt="imagen artista"
                    />
                    <CardContent>

                      <Typography gutterBottom variant="h5" component="div">
                        <div className='nombre'>
                          {element.nombre_artista}
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
    } else {
      return (<h1>No Artists</h1>)
    }


  };


  return (
    <div className='artistas' >
      <Navbar />
      <div style={{ background: `${artist.state?.color}` }} className='titl'>
        <label>{artist.state?.nombreGenero}</label>
      </div>
      <div style={{ background: `linear-gradient(${artist.state?.color},black)` }} className='lienzo'>

        {
          <GetArtists />
        }
      </div>
    </div>
  );
}

export default Artist;
