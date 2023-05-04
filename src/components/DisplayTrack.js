
import React,{useState} from 'react';
import { BsMusicNoteBeamed } from 'react-icons/bs';



const DisplayTrack = ({
  currentTack,audioRef,setDuration,progressBarRef,handleNext
}) => {
//const [url, seturl] = useState();
var url;
var imagen;
var artista;
var nombre_cancion;
var nombre_album;
var numero_track;

const onLoadedMetadata = () => {
 // console.log(audioRef.current.duration);
 const seconds = audioRef.current.duration;
 setDuration(seconds);
 progressBarRef.current.max = seconds;
}



  if(currentTack != null){
    const object = JSON.parse(currentTack);
    //console.log('imagem ',object.imagen_album);

      url = object.url;
      imagen = object.imagen_album;
      artista = object.nombre_artista;
      nombre_cancion = object.nombre_cancion;
      nombre_album = object.nombre_album;
      numero_track = object.numero_track;

  }

  return (
    <div>
      <audio
      src={url}
      ref={audioRef}
      onLoadedMetadata={onLoadedMetadata}
      onEnded={handleNext}
      />
      <div className='audio-info'>
          <div className='audio-image'>
              {
                imagen ?(
                   <img src={imagen} alt="audio avatar" />
                ):(
                  <div className="icon-wrapper">
              <span className="audio-icon">
              <BsMusicNoteBeamed />
              </span>
            </div>
          )}
          </div>
          <div className='text'>
                <p className='title'>{nombre_cancion}</p>
                <p>Artista: {artista}</p>
                <p>Album: {nombre_album}</p>
                <p>Track: {numero_track}</p>
          </div>
      </div>

    </div>
  )
}

export default DisplayTrack;
