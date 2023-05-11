
import React, { useState,useEffect,useRef} from 'react';
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';

import { useSelector,useDispatch } from 'react-redux';
import {getSingleAlbumFromArtist} from "../redux/actions";
import {useLocation} from 'react-router-dom';
import Navbar from './navbar/Navbar';


const AudioPlayer = () => {

  const {Album} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const audioRef = useRef();
  const progressBarRef = useRef();
  const [timeProgress,setTimeProgress] = useState(0);
  const [duration,setDuration] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const location = useLocation();

  useEffect(()=>{
    dispatch(getSingleAlbumFromArtist(location.state.id_artista,location.state.id_album));
  },[]);


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

        <div className='inner'>
              <DisplayTrack
              currentTack={Album[trackIndex]}
              audioRef={audioRef}
              setDuration={setDuration}
              progressBarRef={progressBarRef}
              handleNext={handleNext}
              setTrackIndex={setTrackIndex}
              lista={Album}
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



    </div>

    </>
  );
}

export default AudioPlayer;
