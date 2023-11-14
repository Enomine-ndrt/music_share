
import React, { useState,useEffect,useRef,useMemo} from 'react';
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import { useSelector,useDispatch } from 'react-redux';
import {getSingleAlbumFromArtist} from "../redux/actions";
import {useLocation} from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Lista from './Lista';

import Lista_albums from './Lista_albums';



const AudioPlayer = () => {

  const {Album} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const audioRef = useRef();
  const progressBarRef = useRef();
  const [timeProgress,setTimeProgress] = useState(0);
  const [duration,setDuration] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [ocultar,setOcultar] = useState(false);
  const location = useLocation();

  var imagen = "";
  var artista = "";
 var nombre_album = "";



  useEffect(()=>{
    dispatch(getSingleAlbumFromArtist(location.state.id_artista,location.state.id_album));
  },[]);

  let colorA = '';


  const Songs =useMemo(()=> Album.body?.map(art => {
    var temp = {}

    temp['id_cancion'] = art.id_cancion;
    temp['nombre_cancion'] = art.nombre_cancion;
    temp['url'] = art.url;
    temp['numero_cd'] = art.numero_cd;
    temp['numero_track'] = art.numero_track;

    return (temp)
  }),[Album.body])


if(Album.body != null){
  Album.header.map((color)=> {

     colorA = color.colorAlbum;
     artista = color.nombre_artista;
     nombre_album = color.nombre_artista;

  });

}


  const handleNext = () => {

    if(trackIndex >= Album.body.length -1){
      setTrackIndex(0);
      console.log('trackIndex');

    }else{
      setTrackIndex((prev) => prev + 1);
    }

  };

  return (
      <>
      <Navbar />
    <div className='audio-player'>


        <div style={{background: `linear-gradient(${colorA},black)`}} className='inner'>
            {
              Album.header ?
              <DisplayTrack
              header={Album.header[0]}
              currentTack={Songs[trackIndex]}
              audioRef={audioRef}
              setDuration={setDuration}
              progressBarRef={progressBarRef}
              handleNext={handleNext}
              setOcultar={setOcultar}
              ocultar={ocultar}
              />: null
            }
    </div>
    {

      ocultar ?
      <Lista_albums
      colorAlbum={colorA}/>
      : null


    }

    {
     Songs ?
      (<Lista
      lista={Songs}
      currentTack={Songs[trackIndex]}
      setTrackIndex={setTrackIndex}
      />):null
    }


{
  Album.body ?
  <Controls
          audioRef={audioRef}
          progressBarRef={progressBarRef}
          duration={duration}
          setTimeProgress={setTimeProgress}
          setTrackIndex={setTrackIndex}
          trackIndex={trackIndex}
          handleNext={handleNext}
          />:null
}

          <ProgressBar
          progressBarRef={progressBarRef}
           audioRef={audioRef}
           timeProgress={timeProgress}
           duration={duration}
           />
        </div>
    </>
  );
}

export default AudioPlayer;
