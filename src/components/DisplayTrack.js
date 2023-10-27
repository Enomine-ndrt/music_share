
import React,{useState} from 'react';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { average } from 'color.js';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const DisplayTrack = ({
  currentTack,audioRef,setDuration,progressBarRef,handleNext,lista, setTrackIndex,setOcultar,ocultar
}) => {
//const [url, seturl] = useState();
var url;
var imagen;
var artista;
var nombre_cancion;
var nombre_album;
var numero_track;
//var ocultar = false;

const onLoadedMetadata = () => {
 // console.log(audioRef.current.duration);
 const seconds = audioRef.current.duration;
 setDuration(seconds);
 progressBarRef.current.max = seconds;
}

const ocultarElemento = () =>{
  //console.log('hola elemento');
  setOcultar(!ocultar);
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

//average(imagen, { format: 'hex' }).then(color =>console.log('COLORES ALBUM ',color) );

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

                <p>Album</p>
                <p className='title'>{nombre_album}</p>
                <p className='info'>{artista}</p>
                <p className='info'>{nombre_cancion}</p>
                <p>Track: {numero_track}</p>

          </div>


      </div>
      {
        !ocultar ?
         <AddIcon onClick={ocultarElemento}   htmlColor="white"/>:
         <RemoveIcon onClick={ocultarElemento}  htmlColor="white"/>
      }

    </div>
  )
}

export default DisplayTrack;
