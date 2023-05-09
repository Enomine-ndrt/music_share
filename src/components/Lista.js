
import React,{useState} from 'react';
import {IoCaretForwardCircle}  from 'react-icons/io5';


const Lista = ({lista,currentTack}) => {


var actual = '';

    if(currentTack != null){
        const object = JSON.parse(currentTack);
          actual = object.nombre_cancion;
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
                <IoCaretForwardCircle />
                { object.nombre_cancion}
                </div>
            ):(
                <div className='text3'>
                {object.nombre_cancion}
                </div>
            )

                }</>)
        })
      }
    </div>
  )
}

export default Lista;
