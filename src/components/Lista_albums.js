
import React, { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAlbumsArtist } from "../redux/actions";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getSingleAlbumFromArtist } from "../redux/actions";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import './css/carousel.css';
import { Troubleshoot } from '@mui/icons-material';
import AlbumsCarousel from './AlbumsCarousel';



const Lista_albums = ({ colorAlbum }) => {

  const album = useLocation();
  const { AllAlbumArtist } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAlbumsArtist(album.state.id_artista));
  }, []);

  return (
    <div className='album' >
      <div style={{ background: `linear-gradient(${colorAlbum},black)` }} className='lienzoAlbum1'>
        <div className='centrar' >
          {/*<GetAlbums />*/
            <AlbumsCarousel
              AllAlbumArtist={AllAlbumArtist}
              dispatch={dispatch}
              getSingleAlbumFromArtist={getSingleAlbumFromArtist}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default Lista_albums;
