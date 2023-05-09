import React,{useRef} from 'react';
import Navbar from '../../components/navbar/Navbar';
import { useSelector,useDispatch } from 'react-redux';
import {registerNewArtist} from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import './register.css';


const Register = () => {
    const nombre_artista = useRef();
    const imagen_artista = useRef();
    const {Message} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const registrar = async() => {
        console.log('nombre artista ',nombre_artista.current.value);
        console.log('imagen artista ',imagen_artista.current.value);
        dispatch(registerNewArtist(nombre_artista.current.value,imagen_artista.current.value));
        navigate('/');
    }

    console.log('message ',Message);

  return (
    <div>
      <Navbar />
       <div className='lienzo'>
            <div className='formulario'>
            <h3>Ingresar Artista</h3>
            Nombre artista<br />
            <input
            type='text'
            name="nombre_artista"
            ref={nombre_artista}
            placeholder='nombre artista' />
             <br />
            Imagen artista<br />
            <input
            type='text'
            name="imagen_artista"
            ref={imagen_artista}
            placeholder='imagen artista'
            />
            <br/>
            <div className='button'>
            <button onClick={registrar}  value='registrar' >Registrar</button>
            </div>
            </div>

       </div>
    </div>
  )
}

export default Register;
