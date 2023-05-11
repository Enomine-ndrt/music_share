
import React,{useState,useEffect,useRef,useCallback} from 'react';

import{
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
  IoVolumeLowSharp

} from 'react-icons/io5';


const Controls = ({
  audioRef,progressBarRef,duration,setTimeProgress,Album,setTrackIndex,trackIndex,handleNext
}) => {
  const [isPlaying,setIsPlaying] = useState(false);
  const playAnimationRef = useRef();
  const [volume,setVolume] = useState(60);

  const repeat = useCallback(() =>{
    console.log('run');
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      '--range-progress',
      `${(progressBarRef.current.value / duration) * 100}%`
    );
    playAnimationRef.current = requestAnimationFrame(repeat);
  },[audioRef,duration,progressBarRef,setTimeProgress]);


  useEffect(() => {
      if(isPlaying){
        audioRef.current.play();
      }else{
        audioRef.current.pause();
      }
      playAnimationRef.current = requestAnimationFrame(repeat);

  }, [isPlaying,audioRef,repeat]);

  useEffect(()=>{
    if(audioRef){
      audioRef.current.volume = volume / 100;
    }
  },[volume,audioRef]);

  const tooglePlayPause = () =>{
    setIsPlaying((prev)=> !prev);
  }

  const skipForward = () => {
    audioRef.current.currentTime += 15;
  };

  const skipBackward = () =>{
    audioRef.current.currentTime -= 15;
  };

  const handlePrevius = () => {
    console.log('handleNext ',Album);
    if(trackIndex == 0){
      setTrackIndex(0);
      //Album[0];
    }else{
      setTrackIndex((prev) => prev - 1);
    }

  };


  return (
    <div className='controls-wrapper'>
        <div className='controls'>
            <button  className='button-next' onClick={handlePrevius}>
                <IoPlaySkipBackSharp />
            </button>
            <button onClick={skipBackward}>
              <IoPlayBackSharp />
            </button>
            <button className='button-play' onClick={tooglePlayPause}>
                {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
            </button>
            <button  onClick={skipForward}>
               <IoPlayForwardSharp />
            </button>
            <button className='button-next' onClick={handleNext}>
              <IoPlaySkipForwardSharp />
            </button>
        </div>

        <div className='volume'>
          <button><IoVolumeLowSharp /></button>
          <input type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e)=>setVolume(e.target.value)}
          style={{
            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
          }}
          />

        </div>

    </div>
  );
};

export default Controls;
;
