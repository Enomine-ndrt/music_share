
import React,{useState} from 'react';
import {IoCaretForwardCircle}  from 'react-icons/io5';


const Lista = ({lista,currentTack, setTrackIndex}) => {


var actual = '';

    if(currentTack != null){
        const object = JSON.parse(currentTack);
          actual = object.nombre_cancion;
      }

      const Handle = (e,i) => {
        console.log('message ',i);
        setTrackIndex(i-1);
      }


  return (

    <div className='Lista'>

      {
         lista.map((song,ind)=>{
            const object = JSON.parse(song)

           return(<>
                {

            actual == object.nombre_cancion ?(

            <div className='text2'>
                {object.numero_track}
                <IoCaretForwardCircle />
                { object.nombre_cancion}
                </div>
            ):(

                <div onClick={(e)=>{Handle(e,object.numero_track)}} className='text3'>
                {object.numero_track+'  ' }
                { object.nombre_cancion}
                </div>
            )

                }</>)
        })
      }
    </div>
  )
}

export default Lista;
