
import React, { useState,useEffect,useRef} from 'react';
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


 const handleAlbum = () =>{

 }


  useEffect(()=>{
    dispatch(getSingleAlbumFromArtist(location.state.id_artista,location.state.id_album));
  },[]);

  let colorA = '';



if(Album.body != null){
  Album.header.map((color)=> {
    //var object = JSON.parse(color);
   // colorA = object.colorAlbum;
     //imagen = color.imagen_album;
     colorA = color.colorAlbum;
     artista = color.nombre_artista;
     nombre_album = color.nombre_artista;
    //console.log('color album ',object);
  });

}


 //console.log('Albumssssssssss ', Album);

  const handleNext = () => {
   // console.log('handleNext ',Album);

    if(trackIndex >= Album.body.length -1){
      setTrackIndex(0);
      console.log('trackIndex');
      //var inss = location.state.id_album+1;
     // dispatch(getSingleAlbumFromArtist(location.state.id_artista,inss));
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
              currentTack={Album.body[trackIndex]}
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
     Album.body ?
      (<Lista
      lista={Album.body}
      currentTack={Album.body[trackIndex]}
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
