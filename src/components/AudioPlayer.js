
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

  useEffect(()=>{
    dispatch(getSingleAlbumFromArtist(location.state.id_artista,location.state.id_album));
  },[location]);

  let colorA = '';
  Album.map((color)=> {
    var object = JSON.parse(color);
    colorA = object.colorAlbum;
    //console.log('color album ',object);
  });

 // console.log('Album ', Album);

  const handleNext = () => {
   // console.log('handleNext ',Album);

    if(trackIndex >= Album.length -1){
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
              <DisplayTrack
              currentTack={Album[trackIndex]}
              audioRef={audioRef}
              setDuration={setDuration}
              progressBarRef={progressBarRef}
              handleNext={handleNext}
              setTrackIndex={setTrackIndex}
              lista={Album}
              setOcultar={setOcultar}
              ocultar={ocultar}
              />
    </div>
    {

      ocultar ?
      <Lista_albums
      colorAlbum={colorA}/>
      : null


    }

    <Lista
          lista={Album}
          currentTack={Album[trackIndex]}
          setTrackIndex={setTrackIndex}
        />


    <Controls
          audioRef={audioRef}
          progressBarRef={progressBarRef}
          duration={duration}
          setTimeProgress={setTimeProgress}
          Album={Album}
          setTrackIndex={setTrackIndex}
          trackIndex={trackIndex}
          handleNext={handleNext}
          />
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
